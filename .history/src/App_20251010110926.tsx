import { useState, useEffect } from 'react'
import './App.css'

// Types
type AppScreen = 'landing' | 'game-app'
type GameScreen = 'lobby' | 'game' | 'leaderboard' | 'results'
type Player = { id: number; name: string; avatar: string; score: number }
type ThemeMode = 'dark' | 'light'

type MultipleChoiceQuestion = {
  type: 'multiple-choice'
  text: string
  answers: { id: string; text: string; isCorrect: boolean }[]
}

type TextInputQuestion = {
  type: 'text-input'
  text: string
  correctAnswer: string
  placeholder: string
}

type MatchingQuestion = {
  type: 'matching'
  text: string
  leftColumn: { id: string; text: string }[]
  rightColumn: { id: string; text: string }[]
  correctPairs: { left: string; right: string }[]
}

type OrderingQuestion = {
  type: 'ordering'
  text: string
  items: { id: string; text: string; correctOrder: number }[]
}

type TrueFalseQuestion = {
  type: 'true-false'
  text: string
  correctAnswer: boolean
}

type Question = MultipleChoiceQuestion | TextInputQuestion | MatchingQuestion | OrderingQuestion | TrueFalseQuestion

function App() {
  const [appScreen, setAppScreen] = useState<AppScreen>('landing')
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [screen, setScreen] = useState<GameScreen>('lobby')
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Minh Anh', avatar: '🎯', score: 0 },
    { id: 2, name: 'Tuấn Kiệt', avatar: '🚀', score: 0 },
    { id: 3, name: 'Hương Giang', avatar: '⭐', score: 0 },
  ])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timer, setTimer] = useState(25)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [currentScore, setCurrentScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [textAnswer, setTextAnswer] = useState('')
  const [matchingPairs, setMatchingPairs] = useState<{ left: string; right: string }[]>([])
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [orderedItems, setOrderedItems] = useState<string[]>([])
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const roomCode = '4827'

  // Sample questions with different types
  const questions: Question[] = [
    // Trắc nghiệm
    {
      type: 'multiple-choice',
      text: '125 + 47 = ?',
      answers: [
        { id: 'A', text: '162', isCorrect: false },
        { id: 'B', text: '172', isCorrect: true },
        { id: 'C', text: '182', isCorrect: false },
        { id: 'D', text: '152', isCorrect: false },
      ],
    },
    // Tự luận
    {
      type: 'text-input',
      text: 'Nếu x + 15 = 42, thì x = ?',
      correctAnswer: '27',
      placeholder: 'Nhập đáp án của bạn...',
    },
    // Đúng/Sai
    {
      type: 'true-false',
      text: 'Tổng các góc trong tam giác luôn bằng 180 độ',
      correctAnswer: true,
    },
    // Ghép cột
    {
      type: 'matching',
      text: 'Ghép các phép tính với kết quả đúng',
      leftColumn: [
        { id: 'L1', text: '5 × 6' },
        { id: 'L2', text: '8 × 7' },
        { id: 'L3', text: '9 × 4' },
        { id: 'L4', text: '12 × 3' },
      ],
      rightColumn: [
        { id: 'R1', text: '36' },
        { id: 'R2', text: '56' },
        { id: 'R3', text: '30' },
        { id: 'R4', text: '48' },
      ],
      correctPairs: [
        { left: 'L1', right: 'R3' },
        { left: 'L2', right: 'R2' },
        { left: 'L3', right: 'R1' },
        { left: 'L4', right: 'R1' },
      ],
    },
    // Sắp xếp
    {
      type: 'ordering',
      text: 'Sắp xếp các số sau theo thứ tự tăng dần',
      items: [
        { id: 'O1', text: '125', correctOrder: 2 },
        { id: 'O2', text: '47', correctOrder: 0 },
        { id: 'O3', text: '89', correctOrder: 1 },
        { id: 'O4', text: '256', correctOrder: 3 },
      ],
    },
    // Trắc nghiệm 2
    {
      type: 'multiple-choice',
      text: 'Chu vi hình vuông cạnh 5cm là:',
      answers: [
        { id: 'A', text: '10 cm', isCorrect: false },
        { id: 'B', text: '15 cm', isCorrect: false },
        { id: 'C', text: '20 cm', isCorrect: true },
        { id: 'D', text: '25 cm', isCorrect: false },
      ],
    },
    // Tự luận 2
    {
      type: 'text-input',
      text: 'Tính diện tích hình chữ nhật có chiều dài 8m và chiều rộng 5m (đơn vị: m²)',
      correctAnswer: '40',
      placeholder: 'Nhập đáp án...',
    },
    // Đúng/Sai 2
    {
      type: 'true-false',
      text: 'Số 2025 là số nguyên tố',
      correctAnswer: false,
    },
    // Ghép cột 2
    {
      type: 'matching',
      text: 'Ghép các phân số với giá trị thập phân tương ứng',
      leftColumn: [
        { id: 'L1', text: '1/2' },
        { id: 'L2', text: '1/4' },
        { id: 'L3', text: '3/4' },
      ],
      rightColumn: [
        { id: 'R1', text: '0.5' },
        { id: 'R2', text: '0.75' },
        { id: 'R3', text: '0.25' },
      ],
      correctPairs: [
        { left: 'L1', right: 'R1' },
        { left: 'L2', right: 'R3' },
        { left: 'L3', right: 'R2' },
      ],
    },
    // Sắp xếp 2
    {
      type: 'ordering',
      text: 'Sắp xếp các bước giải phương trình x + 5 = 12',
      items: [
        { id: 'O1', text: 'x = 7', correctOrder: 2 },
        { id: 'O2', text: 'x + 5 = 12', correctOrder: 0 },
        { id: 'O3', text: 'x = 12 - 5', correctOrder: 1 },
      ],
    },
  const totalQuestions = questions.length
  const question = questions[currentQuestion]

  // Theme classes
  const bgClass = theme === 'dark' 
    ? 'bg-gradient-to-br from-[#0a0323] via-[#1a0d3e] to-[#0a0323]' 
    : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
  
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const cardBgClass = theme === 'dark' ? 'bg-white/5' : 'bg-white'
  const borderClass = theme === 'dark' ? 'border-white/10' : 'border-gray-200'
  const inputBgClass = theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'

  // Initialize question stateurrentQuestion]

  // Initialize question state
  useEffect(() => {
    if (screen === 'game' && question) {
      if (question.type === 'ordering') {
        setOrderedItems(question.items.map(item => item.id))
      }
    }
  }, [screen, currentQuestion, question])

  // Timer countdown
  useEffect(() => {
    if (screen === 'game' && timer > 0 && !showFeedback) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [screen, timer, showFeedback])

  // Simulate adding players
  useEffect(() => {
    if (screen === 'lobby') {
      const interval = setInterval(() => {
        const names = ['Thu Hà', 'Đức Anh', 'Mai Linh', 'Quang Huy', 'Phương Anh']
        const emojis = ['🎨', '🎮', '🎪', '🎭', '🎸', '🎺', '🎹']
        if (players.length < 8 && Math.random() > 0.6) {
          setPlayers((prev) => [
            ...prev,
            {
              id: Date.now(),
              name: names[Math.floor(Math.random() * names.length)],
              avatar: emojis[Math.floor(Math.random() * emojis.length)],
              score: 0,
            },
          ])
        }
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [screen, players.length])

  const handleAnswerSelect = (answerId: string, isCorrect: boolean) => {
    setSelectedAnswer(answerId)
    setShowFeedback(true)
    if (isCorrect) {
      setCurrentScore((prev) => prev + 100)
    }
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setScreen('leaderboard')
      } else {
        setShowConfetti(true)
        setScreen('results')
      }
    }, 2000)
  }

  const handleTextSubmit = () => {
    setShowFeedback(true)
    if (question.type === 'text-input') {
      const isCorrect = textAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
      if (isCorrect) {
        setCurrentScore((prev) => prev + 100)
      }
      setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setScreen('leaderboard')
        } else {
          setShowConfetti(true)
          setScreen('results')
        }
      }, 2000)
    }
  }

  const handleTrueFalseSelect = (answer: boolean) => {
    setShowFeedback(true)
    if (question.type === 'true-false') {
      const isCorrect = answer === question.correctAnswer
      setSelectedAnswer(answer ? 'true' : 'false')
      if (isCorrect) {
        setCurrentScore((prev) => prev + 100)
      }
      setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setScreen('leaderboard')
        } else {
          setShowConfetti(true)
          setScreen('results')
        }
      }, 2000)
    }
  }

  const handleMatchingSelect = (leftId: string, rightId: string) => {
    const existingPairIndex = matchingPairs.findIndex(p => p.left === leftId)
    if (existingPairIndex >= 0) {
      const newPairs = [...matchingPairs]
      newPairs[existingPairIndex] = { left: leftId, right: rightId }
      setMatchingPairs(newPairs)
    } else {
      setMatchingPairs([...matchingPairs, { left: leftId, right: rightId }])
    }
    setSelectedLeft(null)
  }

  const handleMatchingSubmit = () => {
    setShowFeedback(true)
    if (question.type === 'matching') {
      const correctCount = matchingPairs.filter(pair => 
        question.correctPairs.some(cp => cp.left === pair.left && cp.right === pair.right)
      ).length
      const isCorrect = correctCount === question.correctPairs.length
      if (isCorrect) {
        setCurrentScore((prev) => prev + 100)
      }
      setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setScreen('leaderboard')
        } else {
          setShowConfetti(true)
          setScreen('results')
        }
      }, 2000)
    }
  }

  const handleOrderingSubmit = () => {
    setShowFeedback(true)
    if (question.type === 'ordering') {
      const isCorrect = orderedItems.every((itemId, index) => {
        const item = question.items.find(i => i.id === itemId)
        return item && item.correctOrder === index
      })
      if (isCorrect) {
        setCurrentScore((prev) => prev + 100)
      }
      setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setScreen('leaderboard')
        } else {
          setShowConfetti(true)
          setScreen('results')
        }
      }, 2000)
    }
  }

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...orderedItems]
    const [movedItem] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, movedItem)
    setOrderedItems(newItems)
  }

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setTimer(25)
    setTextAnswer('')
    setMatchingPairs([])
    setSelectedLeft(null)
    setScreen('game')
  }

  const handlePlayAgain = () => {
    setScreen('lobby')
    setCurrentQuestion(0)
    setCurrentScore(0)
    setTimer(25)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setShowConfetti(false)
    setTextAnswer('')
    setMatchingPairs([])
    setSelectedLeft(null)
  }

  // Generate sorted leaderboard
  const leaderboard = [...players]
    .map((p, i) => ({ ...p, score: Math.floor(Math.random() * 800) + (i === 0 ? currentScore : 0) }))
    .sort((a, b) => b.score - a.score)

  return (
    <div className={`min-h-screen ${appScreen === 'landing' ? bgClass : theme === 'dark' ? 'bg-gradient-to-br from-[#0a0323] via-[#1a0d3e] to-[#0a0323]' : 'bg-gray-50'} relative overflow-hidden`}>
      {/* LANDING PAGE */}
      {appScreen === 'landing' && (
        <div className="relative z-10">
          {/* Navigation */}
          <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🎯</span>
              <h1 className={`text-2xl font-bold ${textClass}`}>Math Battle Arena</h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-900'} hover:scale-105 transition-all flex items-center gap-2`}
              >
                {theme === 'dark' ? '☀️ Sáng' : '🌙 Tối'}
              </button>
              <button
                onClick={() => setAppScreen('game-app')}
                className="px-6 py-3 bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 font-semibold"
              >
                Bắt đầu chơi
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 animate-fade-slide">
                <span className="inline-block px-6 py-3 bg-[#6E55FB]/20 text-[#6E55FB] rounded-full text-sm font-semibold border border-[#6E55FB]/30 mb-6">
                  🚀 Học toán thông minh, vui nhộn và hiệu quả
                </span>
                <h1 className={`text-5xl md:text-7xl font-bold ${textClass} mb-6`}>
                  Đấu Trường<br />
                  <span className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] bg-clip-text text-transparent">
                    Toán Học
                  </span>
                </h1>
                <p className={`text-xl md:text-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-2xl mx-auto`}>
                  Tham gia các trận đấu toán học trực tuyến sôi động, thử thách bản thân và chinh phục đỉnh cao tri thức!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-slide animate-delay-200">
                  <button
                    onClick={() => setAppScreen('game-app')}
                    className="px-8 py-4 bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 font-bold text-lg"
                  >
                    🎮 Chơi ngay miễn phí
                  </button>
                  <button className={`px-8 py-4 ${theme === 'dark' ? 'bg-white/10' : 'bg-white border-2 border-gray-200'} ${textClass} rounded-xl hover:scale-105 transition-all font-semibold text-lg`}>
                    📚 Tìm hiểu thêm
                  </button>
                </div>
              </div>

              {/* Preview Image/Card */}
              <div className="mt-16 animate-fade-slide animate-delay-400">
                <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} backdrop-blur-md rounded-3xl p-8 shadow-2xl border max-w-3xl mx-auto`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'} flex items-center justify-center`}>
                        <span className="text-xl font-bold">1</span>
                      </div>
                      <span className="px-4 py-2 rounded-full bg-[#6E55FB]/20 text-[#6E55FB] text-sm font-semibold border border-[#6E55FB]/30">
                        📝 Trắc nghiệm
                      </span>
                    </div>
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>⏱️ 00:25</span>
                  </div>
                  <h3 className={`text-2xl font-semibold ${textClass} mb-6`}>Chọn số lớn nhất trong các số sau:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['A. 1', 'B. 2', 'C. 3', 'D. 4'].map((option, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl ${
                          idx === 3 
                            ? theme === 'dark' ? 'bg-green-500/20 border-2 border-green-500' : 'bg-green-50 border-2 border-green-500'
                            : idx === 2
                            ? theme === 'dark' ? 'bg-red-500/20 border-2 border-red-500' : 'bg-red-50 border-2 border-red-500'
                            : theme === 'dark' ? 'bg-white/5 border-2 border-white/10' : 'bg-gray-50 border-2 border-gray-200'
                        } transition-all`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${
                            idx === 3 ? 'text-green-400' : idx === 2 ? 'text-red-400' : theme === 'dark' ? 'text-white' : 'text-gray-700'
                          }`}>{option}</span>
                          {idx === 3 && (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm">✓</span>
                          )}
                          {idx === 2 && (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-sm">✗</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-6 p-4 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'} border rounded-xl`}>
                    <div className="flex items-center justify-between text-sm">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Câu trả lời của bạn: <span className="text-red-400 font-semibold">C</span>
                      </span>
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Đáp án đúng: <span className="text-green-400 font-semibold">D</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="container mx-auto px-4 py-20">
            <h2 className={`text-4xl font-bold ${textClass} text-center mb-16`}>
              Tính năng nổi bật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: '📝',
                  title: 'Đa dạng dạng câu hỏi',
                  desc: 'Trắc nghiệm, tự luận, ghép cột, sắp xếp, đúng/sai',
                },
                {
                  icon: '🏆',
                  title: 'Bảng xếp hạng',
                  desc: 'Cạnh tranh trực tiếp với bạn bè và học sinh toàn quốc',
                },
                {
                  icon: '⚡',
                  title: 'Chơi real-time',
                  desc: 'Trải nghiệm live với phản hồi tức thì',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className={`${cardBgClass} backdrop-blur-md rounded-2xl p-8 ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-200 shadow-lg'} hover:scale-105 transition-all animate-fade-slide`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="text-5xl mb-4 block">{feature.icon}</span>
                  <h3 className={`text-xl font-bold ${textClass} mb-3`}>{feature.title}</h3>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="container mx-auto px-4 py-20">
            <div className={`${cardBgClass} backdrop-blur-md rounded-3xl p-12 ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-200 shadow-xl'} max-w-4xl mx-auto text-center`}>
              <h2 className={`text-4xl font-bold ${textClass} mb-6`}>
                Sẵn sàng chinh phục toán học? 🚀
              </h2>
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                Tham gia cùng hàng ngàn học sinh đang học toán một cách thú vị!
              </p>
              <button
                onClick={() => setAppScreen('game-app')}
                className="px-10 py-5 bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 font-bold text-xl"
              >
                🎮 Bắt đầu ngay
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className={`${theme === 'dark' ? 'border-white/10' : 'border-gray-200'} border-t py-8`}>
            <div className="container mx-auto px-4 text-center">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                © 2025 Math Battle Arena. Made with ❤️ for Vietnamese students.
              </p>
            </div>
          </footer>
        </div>
      )}

      {/* GAME APP */}
      {appScreen === 'game-app' && (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-[#0a0323] via-[#1a0d3e] to-[#0a0323]' : 'bg-gray-50'} relative overflow-hidden`}>
          {/* Back Button */}
          {screen === 'lobby' && (
            <div className="absolute top-6 left-6 z-50">
              <button
                onClick={() => setAppScreen('landing')}
                className={`px-4 py-2 ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-gray-100'} ${textClass} rounded-xl transition-all flex items-center gap-2 ${theme === 'dark' ? '' : 'shadow-md'}`}
              >
                ← Về trang chủ
              </button>
            </div>
          )}
          
          {/* Theme Toggle in Game */}
          {screen === 'lobby' && (
            <div className="absolute top-6 right-6 z-50">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-white text-gray-900 shadow-md'} hover:scale-105 transition-all flex items-center gap-2`}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          )}
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">∑</div>
        <div className="absolute top-32 right-20 text-5xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>π</div>
        <div className="absolute bottom-32 left-1/4 text-7xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>∞</div>
        <div className="absolute bottom-20 right-1/3 text-5xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>√</div>
        <div className="absolute top-1/2 right-10 text-6xl opacity-15 animate-float" style={{ animationDelay: '0.5s' }}>+</div>
        <div className="absolute top-2/3 left-10 text-5xl opacity-10 animate-float" style={{ animationDelay: '2.5s' }}>×</div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece absolute w-3 h-3 rounded"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#6E55FB', '#FF6B9D', '#FFC837', '#4ECDC4'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* LOBBY SCREEN */}
      {screen === 'lobby' && appScreen === 'game-app' && (
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8 animate-fade-slide">
            <h1 className={`text-5xl md:text-6xl font-bold ${textClass} mb-4 drop-shadow-lg`}>
              ⚔️ Đấu Trường Toán Học
            </h1>
            <div className={`inline-block ${cardBgClass} backdrop-blur-sm px-8 py-4 rounded-2xl border-2 border-[#6E55FB] ${theme === 'dark' ? '' : 'shadow-xl'}`}>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} className="mb-2">Mã phòng:</p>
              <p className="text-5xl font-bold text-[#6E55FB] tracking-wider">{roomCode}</p>
            </div>
          </div>

          <div className={`${cardBgClass} backdrop-blur-md rounded-3xl p-8 shadow-2xl border ${borderClass} animate-fade-slide animate-delay-200`}>
            <input
              type="text"
              placeholder="Nhập tên của bạn"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className={`w-full px-6 py-4 rounded-xl ${inputBgClass} border-2 ${theme === 'dark' ? 'border-white/20' : 'border-gray-300'} ${textClass} text-lg placeholder-gray-400 focus:outline-none focus:border-[#6E55FB] transition-all mb-6`}
            />

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">👥</span>
                Người chơi ({players.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                {players.map((player, index) => (
                  <div
                    key={player.id}
                    className="bg-white/10 rounded-xl p-3 flex items-center gap-3 animate-fade-slide hover:bg-white/20 transition-all"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-3xl">{player.avatar}</span>
                    <span className="text-white font-medium truncate">{player.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setScreen('game')}
              className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold py-5 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95"
            >
              🚀 Sẵn sàng!
            </button>
          </div>
        </div>
      )}

      {/* GAME SCREEN */}
      {screen === 'game' && question && (
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
          <div className="flex justify-between items-center mb-6 animate-fade-slide">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
              <p className="text-white font-bold text-lg">Câu {currentQuestion + 1}/{totalQuestions}</p>
            </div>
            <div className={`bg-white/10 backdrop-blur-sm px-8 py-3 rounded-xl border-2 ${timer < 10 ? 'border-red-500 animate-pulse' : 'border-white/20'}`}>
              <p className={`font-bold text-2xl ${timer < 10 ? 'text-red-400' : 'text-white'}`}>⏱️ 00:{timer.toString().padStart(2, '0')}</p>
            </div>
            <div className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] px-6 py-3 rounded-xl">
              <p className="text-white font-bold text-lg">🏆 {currentScore} điểm</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 mb-6 animate-fade-slide animate-delay-200">
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border-2 border-white/20">
                    <span className="text-xl font-bold text-white">{currentQuestion + 1}</span>
                  </div>
                  <span className="inline-block px-4 py-2 rounded-full bg-[#6E55FB]/20 text-[#6E55FB] text-sm font-semibold border border-[#6E55FB]/30">
                    {question.type === 'multiple-choice' && '📝 Trắc nghiệm'}
                    {question.type === 'text-input' && '✍️ Tự luận'}
                    {question.type === 'matching' && '🔗 Ghép cột'}
                    {question.type === 'ordering' && '🔢 Sắp xếp'}
                    {question.type === 'true-false' && '✓✗ Đúng/Sai'}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">{question.text}</h2>
              </div>
              
              {showFeedback && (
                <button
                  onClick={() => setShowFeedback(false)}
                  className="ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                >
                  <span className="text-white text-xl">✕</span>
                </button>
              )}
            </div>

            {/* Multiple Choice */}
            {question.type === 'multiple-choice' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {question.answers.map((answer, index) => {
                    const isSelected = selectedAnswer === answer.id
                    const showCorrect = showFeedback && answer.isCorrect
                    const showWrong = showFeedback && isSelected && !answer.isCorrect

                    return (
                      <button
                        key={answer.id}
                        onClick={() => !showFeedback && handleAnswerSelect(answer.id, answer.isCorrect)}
                        disabled={showFeedback}
                        className={`relative p-6 rounded-2xl transition-all transform hover:scale-105 active:scale-95 animate-fade-slide text-left ${
                          showCorrect
                            ? 'bg-green-100/10 border-2 border-green-500'
                            : showWrong
                            ? 'bg-red-100/10 border-2 border-red-500'
                            : 'bg-white/5 border-2 border-white/20 hover:border-white/40'
                        } disabled:cursor-not-allowed`}
                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`text-xl font-bold ${
                            showCorrect ? 'text-green-400' : showWrong ? 'text-red-400' : 'text-gray-400'
                          }`}>
                            {answer.id}.
                          </span>
                          <span className={`text-xl font-medium ${
                            showCorrect ? 'text-green-300' : showWrong ? 'text-red-300' : 'text-white'
                          }`}>
                            {answer.text}
                          </span>
                          {showCorrect && (
                            <span className="ml-auto text-2xl">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">✓</span>
                            </span>
                          )}
                          {showWrong && (
                            <span className="ml-auto text-2xl">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white">✗</span>
                            </span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {showFeedback && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 animate-fade-slide">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        Câu trả lời của bạn: <span className={selectedAnswer && question.answers.find(a => a.id === selectedAnswer)?.isCorrect ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
                          {selectedAnswer}
                        </span>
                      </span>
                      <span className="text-gray-400">
                        Đáp án đúng: <span className="text-green-400 font-semibold">
                          {question.answers.find(a => a.isCorrect)?.id}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Text Input */}
            {question.type === 'text-input' && (
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder={question.placeholder}
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  disabled={showFeedback}
                  className="w-full px-8 py-6 rounded-2xl bg-white/10 border-2 border-white/20 text-white text-2xl text-center placeholder-gray-400 focus:outline-none focus:border-[#6E55FB] transition-all disabled:cursor-not-allowed"
                />
                {!showFeedback && (
                  <button
                    onClick={handleTextSubmit}
                    disabled={!textAnswer.trim()}
                    className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold py-5 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ✓ Gửi đáp án
                  </button>
                )}
                {showFeedback && (
                  <div className={`text-center p-6 rounded-2xl ${textAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase() ? 'bg-green-500/20 border-2 border-green-500' : 'bg-red-500/20 border-2 border-red-500'}`}>
                    <p className={`text-2xl font-bold ${textAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase() ? 'text-green-400' : 'text-red-400'}`}>
                      {textAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase() ? '🎉 Chính xác!' : `😔 Sai rồi! Đáp án đúng: ${question.correctAnswer}`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* True/False */}
            {question.type === 'true-false' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <button
                    onClick={() => !showFeedback && handleTrueFalseSelect(true)}
                    disabled={showFeedback}
                    className={`relative p-8 rounded-2xl transition-all transform hover:scale-105 active:scale-95 animate-fade-slide ${
                      showFeedback && question.correctAnswer
                        ? 'bg-green-100/10 border-2 border-green-500'
                        : showFeedback && selectedAnswer === 'true' && !question.correctAnswer
                        ? 'bg-red-100/10 border-2 border-red-500'
                        : 'bg-white/5 border-2 border-white/20 hover:border-white/40'
                    } disabled:cursor-not-allowed`}
                    style={{ animationDelay: '0.3s' }}
                  >
                    <div className="text-center">
                      <span className={`text-5xl mb-4 block ${
                        showFeedback && question.correctAnswer ? 'text-green-400' :
                        showFeedback && selectedAnswer === 'true' && !question.correctAnswer ? 'text-red-400' :
                        'text-white'
                      }`}>✓</span>
                      <span className={`text-2xl font-bold ${
                        showFeedback && question.correctAnswer ? 'text-green-300' :
                        showFeedback && selectedAnswer === 'true' && !question.correctAnswer ? 'text-red-300' :
                        'text-white'
                      }`}>ĐÚNG</span>
                    </div>
                    {showFeedback && question.correctAnswer && (
                      <span className="absolute top-4 right-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-xl">✓</span>
                      </span>
                    )}
                    {showFeedback && selectedAnswer === 'true' && !question.correctAnswer && (
                      <span className="absolute top-4 right-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white text-xl">✗</span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => !showFeedback && handleTrueFalseSelect(false)}
                    disabled={showFeedback}
                    className={`relative p-8 rounded-2xl transition-all transform hover:scale-105 active:scale-95 animate-fade-slide ${
                      showFeedback && !question.correctAnswer
                        ? 'bg-green-100/10 border-2 border-green-500'
                        : showFeedback && selectedAnswer === 'false' && question.correctAnswer
                        ? 'bg-red-100/10 border-2 border-red-500'
                        : 'bg-white/5 border-2 border-white/20 hover:border-white/40'
                    } disabled:cursor-not-allowed`}
                    style={{ animationDelay: '0.4s' }}
                  >
                    <div className="text-center">
                      <span className={`text-5xl mb-4 block ${
                        showFeedback && !question.correctAnswer ? 'text-green-400' :
                        showFeedback && selectedAnswer === 'false' && question.correctAnswer ? 'text-red-400' :
                        'text-white'
                      }`}>✗</span>
                      <span className={`text-2xl font-bold ${
                        showFeedback && !question.correctAnswer ? 'text-green-300' :
                        showFeedback && selectedAnswer === 'false' && question.correctAnswer ? 'text-red-300' :
                        'text-white'
                      }`}>SAI</span>
                    </div>
                    {showFeedback && !question.correctAnswer && (
                      <span className="absolute top-4 right-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-xl">✓</span>
                      </span>
                    )}
                    {showFeedback && selectedAnswer === 'false' && question.correctAnswer && (
                      <span className="absolute top-4 right-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white text-xl">✗</span>
                      </span>
                    )}
                  </button>
                </div>

                {showFeedback && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 animate-fade-slide">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        Câu trả lời của bạn: <span className={selectedAnswer === (question.correctAnswer ? 'true' : 'false') ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
                          {selectedAnswer === 'true' ? 'ĐÚNG' : 'SAI'}
                        </span>
                      </span>
                      <span className="text-gray-400">
                                                Đáp án đúng: <span className="text-green-400 font-semibold">
                          {question.correctAnswer ? 'ĐÚNG' : 'SAI'}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Matching */}
            {question.type === 'matching' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="bg-blue-500/30 px-3 py-1 rounded-lg">Cột A</span>
                    </h3>
                    {question.leftColumn.map((item, index) => {
                      const paired = matchingPairs.find(p => p.left === item.id)
                      const isSelected = selectedLeft === item.id
                      const showCorrect = showFeedback && question.correctPairs.some(cp => cp.left === item.id && cp.right === paired?.right)
                      const showWrong = showFeedback && paired && !question.correctPairs.some(cp => cp.left === item.id && cp.right === paired.right)
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => !showFeedback && setSelectedLeft(isSelected ? null : item.id)}
                          disabled={showFeedback}
                          className={`w-full p-4 rounded-xl transition-all transform hover:scale-105 text-left animate-fade-slide ${
                            showCorrect ? 'bg-green-500/30 border-2 border-green-500' :
                            showWrong ? 'bg-red-500/30 border-2 border-red-500' :
                            isSelected ? 'bg-[#6E55FB]/50 border-2 border-[#6E55FB]' :
                            paired ? 'bg-blue-500/20 border-2 border-blue-500/50' :
                            'bg-white/10 border-2 border-white/20 hover:border-[#6E55FB]'
                          } disabled:cursor-not-allowed`}
                          style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                        >
                          <span className="text-white font-semibold text-lg">{item.text}</span>
                          {paired && (
                            <div className="mt-2 text-sm text-blue-300">
                              → {question.rightColumn.find(r => r.id === paired.right)?.text}
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="bg-purple-500/30 px-3 py-1 rounded-lg">Cột B</span>
                    </h3>
                    {question.rightColumn.map((item, index) => {
                      const isPaired = matchingPairs.some(p => p.right === item.id)
                      const canSelect = selectedLeft !== null

                      return (
                        <button
                          key={item.id}
                          onClick={() => !showFeedback && selectedLeft && handleMatchingSelect(selectedLeft, item.id)}
                          disabled={showFeedback || !canSelect}
                          className={`w-full p-4 rounded-xl transition-all transform hover:scale-105 text-left animate-fade-slide ${
                            isPaired ? 'bg-purple-500/20 border-2 border-purple-500/50' :
                            canSelect ? 'bg-white/10 border-2 border-white/20 hover:border-purple-500' :
                            'bg-white/5 border-2 border-white/10'
                          } disabled:cursor-not-allowed`}
                          style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                        >
                          <span className="text-white font-semibold text-lg">{item.text}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {!showFeedback && (
                  <button
                    onClick={handleMatchingSubmit}
                    disabled={matchingPairs.length < question.leftColumn.length}
                    className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold py-5 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ✓ Gửi đáp án {matchingPairs.length > 0 && `(${matchingPairs.length}/${question.leftColumn.length})`}
                  </button>
                )}
              </div>
            )}

            {/* Ordering */}
            {question.type === 'ordering' && (
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                  <p className="text-gray-300 text-sm">💡 Kéo thả để sắp xếp các mục theo thứ tự đúng</p>
                </div>
                <div className="space-y-3">
                  {orderedItems.map((itemId, index) => {
                    const item = question.items.find(i => i.id === itemId)
                    if (!item) return null

                    const isCorrectPosition = showFeedback && item.correctOrder === index
                    const isWrongPosition = showFeedback && item.correctOrder !== index

                    return (
                      <div
                        key={itemId}
                        draggable={!showFeedback}
                        onDragStart={() => setDraggedItem(itemId)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          if (draggedItem) {
                            const fromIndex = orderedItems.indexOf(draggedItem)
                            moveItem(fromIndex, index)
                            setDraggedItem(null)
                          }
                        }}
                        className={`relative p-6 rounded-xl transition-all cursor-move animate-fade-slide ${
                          isCorrectPosition ? 'bg-green-500/30 border-2 border-green-500' :
                          isWrongPosition ? 'bg-red-500/30 border-2 border-red-500' :
                          'bg-white/10 border-2 border-white/20 hover:border-[#6E55FB] hover:scale-105'
                        } ${showFeedback ? 'cursor-default' : ''}`}
                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-bold bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-xl md:text-2xl font-semibold text-white flex-1">{item.text}</span>
                          {!showFeedback && (
                            <span className="text-2xl text-gray-400">⋮⋮</span>
                          )}
                        </div>
                        {isCorrectPosition && <span className="absolute top-4 right-4 text-3xl">✓</span>}
                        {isWrongPosition && <span className="absolute top-4 right-4 text-3xl">✗</span>}
                      </div>
                    )
                  })}
                </div>

                {!showFeedback && (
                  <button
                    onClick={handleOrderingSubmit}
                    className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold py-5 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95"
                  >
                    ✓ Gửi đáp án
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEADERBOARD SCREEN */}
      {screen === 'leaderboard' && (
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl flex items-center justify-center min-h-screen">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/10 w-full animate-fade-slide">
            <h2 className="text-4xl font-bold text-white text-center mb-8">📊 Bảng xếp hạng tạm thời</h2>

            <div className="space-y-3 mb-8">
              {leaderboard.slice(0, 5).map((player, index) => {
                const isCurrentUser = index === 0
                return (
                  <div
                    key={player.id}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      isCurrentUser
                        ? 'bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] shadow-lg shadow-[#6E55FB]/50 scale-105'
                        : 'bg-white/10'
                    } animate-fade-slide`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`text-2xl font-bold w-10 h-10 rounded-lg flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-500 text-yellow-900' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      index === 2 ? 'bg-orange-600 text-orange-100' :
                      'bg-white/20 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-3xl">{player.avatar}</span>
                    <span className="text-white font-semibold text-lg flex-1">{player.name}</span>
                    <span className="text-white font-bold text-xl">{player.score} điểm</span>
                  </div>
                )
              })}
            </div>

            <button
              onClick={handleNextQuestion}
              className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold py-5 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95"
            >
              ➡️ Câu tiếp theo
            </button>
          </div>
        </div>
      )}

      {/* RESULTS SCREEN */}
      {screen === 'results' && (
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl flex items-center justify-center min-h-screen">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 w-full animate-fade-slide">
            <h2 className="text-5xl font-bold text-white text-center mb-4">🏆 Kết quả chung cuộc</h2>
            <p className="text-2xl text-green-400 text-center mb-12 animate-fade-slide animate-delay-200">
              Chúc mừng! Bạn đã hoàn thành trận đấu!
            </p>

            {/* Podium */}
            <div className="flex items-end justify-center gap-4 mb-12 animate-fade-slide animate-delay-400">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-gray-300 to-gray-400 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl mb-3 shadow-lg">
                  {leaderboard[1]?.avatar}
                </div>
                <div className="bg-gradient-to-br from-gray-300 to-gray-500 w-24 md:w-32 h-32 md:h-40 rounded-t-2xl flex flex-col items-center justify-center">
                  <span className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">2</span>
                  <span className="text-white font-semibold text-sm md:text-base">{leaderboard[1]?.name}</span>
                  <span className="text-white font-bold text-lg md:text-xl">{leaderboard[1]?.score}</span>
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center -mt-8">
                <span className="text-5xl mb-3 animate-bounce">👑</span>
                <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center text-5xl mb-3 shadow-lg shadow-yellow-500/50">
                  {leaderboard[0]?.avatar}
                </div>
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-28 md:w-36 h-40 md:h-52 rounded-t-2xl flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-yellow-900 mb-1">1</span>
                  <span className="text-yellow-900 font-bold text-base md:text-lg">{leaderboard[0]?.name}</span>
                  <span className="text-yellow-900 font-bold text-xl md:text-2xl">{leaderboard[0]?.score}</span>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl mb-3 shadow-lg">
                  {leaderboard[2]?.avatar}
                </div>
                <div className="bg-gradient-to-br from-orange-400 to-orange-700 w-24 md:w-32 h-24 md:h-32 rounded-t-2xl flex flex-col items-center justify-center">
                  <span className="text-3xl md:text-4xl font-bold text-orange-900 mb-1">3</span>
                  <span className="text-white font-semibold text-sm md:text-base">{leaderboard[2]?.name}</span>
                  <span className="text-white font-bold text-lg md:text-xl">{leaderboard[2]?.score}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 animate-fade-slide animate-delay-600">
              <button
                onClick={handlePlayAgain}
                className="flex-1 bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold py-5 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95"
              >
                🔄 Chơi lại
              </button>
              <button
                onClick={() => alert('Thoát khỏi trò chơi')}
                className="flex-1 bg-white/10 backdrop-blur-sm text-white text-xl font-bold py-5 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95 border border-white/20"
              >
                🚪 Thoát
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default App
