import { useState, useEffect } from 'react'

interface Exam {
  id: number
  name: string
  type: 'system' | 'ai'
  subject: string
  chapter: string
  lesson: string
  duration: number
  questionCount: number
  grade: string
  examType: '15min' | '45min' | 'midterm' | 'final' | 'practice' | 'review'
}

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const mockExams: Exam[] = [
  // Bài kiểm tra Hệ thống - Toán
  { id: 1, name: 'Kiểm tra 15 phút', type: 'system', subject: 'Toán', chapter: 'Chương 1', lesson: 'Bài 1', duration: 15, questionCount: 10, grade: 'Lớp 3', examType: '15min' },
  { id: 2, name: 'Kiểm tra 45 phút', type: 'system', subject: 'Toán', chapter: 'Chương 2', lesson: 'Bài 2', duration: 45, questionCount: 20, grade: 'Lớp 3', examType: '45min' },
  { id: 3, name: 'Kiểm tra Giữa kỳ', type: 'system', subject: 'Toán', chapter: 'Học kỳ 1', lesson: 'Tổng hợp', duration: 60, questionCount: 25, grade: 'Lớp 3', examType: 'midterm' },
  { id: 4, name: 'Kiểm tra Cuối kỳ', type: 'system', subject: 'Toán', chapter: 'Học kỳ 1', lesson: 'Tổng hợp', duration: 90, questionCount: 30, grade: 'Lớp 3', examType: 'final' },
  
  // Bài kiểm tra AI - Toán
  { id: 5, name: 'Bài luyện tập nhanh (AI)', type: 'ai', subject: 'Toán', chapter: 'Chương 1', lesson: 'Bài 1', duration: 20, questionCount: 15, grade: 'Lớp 3', examType: 'practice' },
  { id: 6, name: 'Tổng hợp kiến thức (AI)', type: 'ai', subject: 'Toán', chapter: 'Chương 1', lesson: 'Tổng hợp', duration: 30, questionCount: 20, grade: 'Lớp 3', examType: 'review' },
  { id: 7, name: 'Ôn tập Số học (AI)', type: 'ai', subject: 'Toán', chapter: 'Chương 2', lesson: 'Bài 3', duration: 25, questionCount: 12, grade: 'Lớp 3', examType: 'practice' }
]

const mockQuestions: Question[] = [
  { id: 1, question: '5 + 3 = ?', options: ['6', '7', '8', '9'], correctAnswer: 2 },
  { id: 2, question: '10 - 4 = ?', options: ['5', '6', '7', '8'], correctAnswer: 1 },
  { id: 3, question: '3 × 2 = ?', options: ['4', '5', '6', '7'], correctAnswer: 2 },
  { id: 4, question: '12 ÷ 3 = ?', options: ['3', '4', '5', '6'], correctAnswer: 1 },
  { id: 5, question: '7 + 8 = ?', options: ['13', '14', '15', '16'], correctAnswer: 2 },
  { id: 6, question: '20 - 9 = ?', options: ['9', '10', '11', '12'], correctAnswer: 2 },
  { id: 7, question: '4 × 5 = ?', options: ['15', '18', '20', '25'], correctAnswer: 2 },
  { id: 8, question: '16 ÷ 4 = ?', options: ['3', '4', '5', '6'], correctAnswer: 1 },
  { id: 9, question: '9 + 6 = ?', options: ['13', '14', '15', '16'], correctAnswer: 2 },
  { id: 10, question: '25 - 7 = ?', options: ['16', '17', '18', '19'], correctAnswer: 2 }
]

type ScreenType = 'list' | 'confirm' | 'exam' | 'result'

export const ExamScreen = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('list')
  const [selectedTab, setSelectedTab] = useState<'system' | 'ai'>('system')
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  
  // Bộ lọc
  const [filterGrade, setFilterGrade] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  const [filterChapter, setFilterChapter] = useState('')
  const [filterLesson, setFilterLesson] = useState('')
  const [filteredExams, setFilteredExams] = useState<Exam[]>(mockExams)

  // Đếm ngược thời gian
  useEffect(() => {
    if (currentScreen === 'exam' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmitExam()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentScreen, timeRemaining])

  const handleFilter = () => {
    let filtered = mockExams.filter(exam => exam.type === selectedTab)
    
    if (filterGrade) filtered = filtered.filter(e => e.grade === filterGrade)
    if (filterSubject) filtered = filtered.filter(e => e.subject === filterSubject)
    if (filterChapter) filtered = filtered.filter(e => e.chapter === filterChapter)
    if (filterLesson) filtered = filtered.filter(e => e.lesson === filterLesson)
    
    setFilteredExams(filtered)
  }

  const handleSelectExam = (exam: Exam) => {
    setSelectedExam(exam)
    setCurrentScreen('confirm')
  }

  const handleStartExam = () => {
    if (selectedExam) {
      setTimeRemaining(selectedExam.duration * 60)
      setCurrentQuestionIndex(0)
      setAnswers({})
      setCurrentScreen('exam')
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers({ ...answers, [currentQuestionIndex]: answerIndex })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleSubmitExam = () => {
    setCurrentScreen('result')
  }

  const calculateScore = () => {
    let correct = 0
    Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
      if (mockQuestions[parseInt(questionIndex)].correctAnswer === answerIndex) {
        correct++
      }
    })
    return correct
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Màn hình 1: Danh sách bài kiểm tra
  if (currentScreen === 'list') {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto px-4 py-8">
          {/* Tiêu đề */}
          <h1 className="text-5xl font-bold text-[#6E55FB] text-center mb-10">
            📚 Danh sách Bài kiểm tra
          </h1>

          {/* Bộ lọc */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 mb-10 border-2 border-[#6E55FB]/20">
            <h2 className="text-2xl font-bold text-[#6E55FB] mb-6 flex items-center gap-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Tìm kiếm bài kiểm tra
            </h2>
            
            <div className="grid md:grid-cols-4 gap-5 mb-6">
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">🎓 Chọn Lớp</label>
                <select 
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#6E55FB]/30 focus:border-[#6E55FB] bg-white"
                >
                  <option value="">Tất cả</option>
                  <option value="Lớp 1">Lớp 1</option>
                  <option value="Lớp 2">Lớp 2</option>
                  <option value="Lớp 3">Lớp 3</option>
                  <option value="Lớp 4">Lớp 4</option>
                  <option value="Lớp 5">Lớp 5</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">📖 Chọn Môn</label>
                <select 
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#6E55FB]/30 focus:border-[#6E55FB] bg-white"
                >
                  <option value="">Tất cả</option>
                  <option value="Toán">Toán</option>
                  <option value="Tiếng Việt">Tiếng Việt</option>
                  <option value="Tự nhiên & Xã hội">Tự nhiên & Xã hội</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">📚 Chọn Chương</label>
                <select 
                  value={filterChapter}
                  onChange={(e) => setFilterChapter(e.target.value)}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#6E55FB]/30 focus:border-[#6E55FB] bg-white"
                >
                  <option value="">Tất cả</option>
                  <option value="Chương 1">Chương 1</option>
                  <option value="Chương 2">Chương 2</option>
                  <option value="Học kỳ 1">Học kỳ 1</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">📝 Chọn Bài</label>
                <select 
                  value={filterLesson}
                  onChange={(e) => setFilterLesson(e.target.value)}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#6E55FB]/30 focus:border-[#6E55FB] bg-white"
                >
                  <option value="">Tất cả</option>
                  <option value="Bài 1">Bài 1</option>
                  <option value="Bài 2">Bài 2</option>
                  <option value="Bài 3">Bài 3</option>
                  <option value="Tổng hợp">Tổng hợp</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleFilter}
              className="w-full md:w-auto px-10 py-4 bg-[#6E55FB] text-white text-xl font-bold rounded-2xl hover:bg-[#5d47d4] transition-all hover:scale-105 flex items-center justify-center gap-3 mx-auto shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Tìm kiếm
            </button>
          </div>

          {/* Tab chọn loại bài kiểm tra */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-2xl p-2 shadow-inner">
              <button
                onClick={() => {
                  setSelectedTab('system')
                  setFilteredExams(mockExams.filter(e => e.type === 'system'))
                }}
                className={`px-8 py-4 text-xl font-bold rounded-xl transition-all ${
                  selectedTab === 'system'
                    ? 'bg-[#6E55FB] text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                🏫 Bài kiểm tra Hệ thống
              </button>
              <button
                onClick={() => {
                  setSelectedTab('ai')
                  setFilteredExams(mockExams.filter(e => e.type === 'ai'))
                }}
                className={`px-8 py-4 text-xl font-bold rounded-xl transition-all ${
                  selectedTab === 'ai'
                    ? 'bg-[#6E55FB] text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                🤖 Bài kiểm tra AI
              </button>
            </div>
          </div>

          {/* Danh sách bài kiểm tra */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.filter(exam => exam.type === selectedTab).map((exam) => (
              <div
                key={exam.id}
                onClick={() => handleSelectExam(exam)}
                className="bg-white border-2 border-gray-200 rounded-3xl p-6 hover:border-[#6E55FB] hover:shadow-2xl transition-all cursor-pointer hover:scale-105 relative overflow-hidden group"
              >
                {/* Badge AI */}
                {exam.type === 'ai' && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-[#6E55FB] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      🤖 AI
                    </div>
                  </div>
                )}

                {/* Icon môn học */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#6E55FB] to-purple-600 rounded-2xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {exam.subject === 'Toán' ? '🔢' : exam.subject === 'Tiếng Việt' ? '📝' : '🌍'}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">{exam.name}</h3>
                
                <div className="space-y-2 text-lg text-gray-600 mb-4">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">📖 Môn:</span> {exam.subject}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">📚 Chương:</span> {exam.chapter}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">⏱️ Thời gian:</span> {exam.duration} phút
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">❓ Số câu:</span> {exam.questionCount} câu
                  </p>
                </div>

                <div className="bg-[#6E55FB] text-white text-center py-3 rounded-xl font-bold text-lg group-hover:bg-[#5d47d4] transition-colors">
                  Bắt đầu làm bài →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Màn hình 2: Xác nhận
  if (currentScreen === 'confirm' && selectedExam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10">
          <div className="text-center">
            {/* Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-[#6E55FB] to-purple-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
              {selectedExam.subject === 'Toán' ? '🔢' : selectedExam.subject === 'Tiếng Việt' ? '📝' : '🌍'}
            </div>

            {/* Tên bài kiểm tra */}
            <h1 className="text-4xl font-bold text-[#6E55FB] mb-6">
              {selectedExam.name}
            </h1>

            {/* Thông tin */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-white rounded-xl p-4">
                  <p className="text-gray-600 text-lg mb-1">⏱️ Thời gian</p>
                  <p className="text-3xl font-bold text-[#6E55FB]">{selectedExam.duration} phút</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-gray-600 text-lg mb-1">❓ Số câu hỏi</p>
                  <p className="text-3xl font-bold text-[#6E55FB]">{selectedExam.questionCount} câu</p>
                </div>
              </div>
            </div>

            {/* Hướng dẫn */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
              <p className="text-2xl text-gray-700 font-semibold">
                💡 Con hãy đọc kỹ câu hỏi và chọn đáp án đúng nhé!
              </p>
            </div>

            {/* Nút bắt đầu */}
            <button
              onClick={handleStartExam}
              className="w-full py-5 bg-[#6E55FB] text-white text-2xl font-bold rounded-2xl hover:bg-[#5d47d4] transition-all hover:scale-105 shadow-lg"
            >
              🚀 Bắt đầu làm bài
            </button>

            <button
              onClick={() => setCurrentScreen('list')}
              className="w-full mt-4 py-4 bg-white text-[#6E55FB] border-2 border-[#6E55FB] text-xl font-bold rounded-2xl hover:bg-purple-50 transition-all"
            >
              ← Quay lại
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Màn hình 3: Làm bài
  if (currentScreen === 'exam' && selectedExam) {
    const currentQuestion = mockQuestions[currentQuestionIndex]
    const isLastQuestion = currentQuestionIndex === mockQuestions.length - 1

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-[#6E55FB] text-white py-6 px-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold">
              📝 Câu {currentQuestionIndex + 1}/{mockQuestions.length}
            </div>
            <div className="text-2xl font-bold flex items-center gap-2">
              ⏱️ Thời gian còn lại: <span className="text-yellow-300">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-gray-200 h-3">
          <div 
            className="bg-[#6E55FB] h-3 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / mockQuestions.length) * 100}%` }}
          />
        </div>

        {/* Nội dung câu hỏi */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Câu hỏi */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-10 mb-10 border-2 border-[#6E55FB]/20">
            <p className="text-4xl font-bold text-gray-900 text-center">
              {currentQuestion.question}
            </p>
          </div>

          {/* Các lựa chọn */}
          <div className="grid gap-5 mb-10">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestionIndex] === index
              const optionLabels = ['A', 'B', 'C', 'D']

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-6 rounded-2xl text-2xl font-bold text-left transition-all hover:scale-102 border-3 ${
                    isSelected
                      ? 'bg-[#6E55FB] text-white border-[#6E55FB] shadow-xl scale-102'
                      : 'bg-white text-gray-900 border-[#6E55FB] hover:border-[#6E55FB] hover:shadow-lg'
                  }`}
                >
                  <span className={`inline-block w-12 h-12 rounded-full text-center leading-[3rem] mr-4 ${
                    isSelected ? 'bg-white text-[#6E55FB]' : 'bg-[#6E55FB] text-white'
                  }`}>
                    {optionLabels[index]}
                  </span>
                  {option}
                </button>
              )
            })}
          </div>

          {/* Nút điều hướng */}
          <div className="flex gap-4">
            {!isLastQuestion ? (
              <button
                onClick={handleNextQuestion}
                disabled={answers[currentQuestionIndex] === undefined}
                className={`flex-1 py-5 text-2xl font-bold rounded-2xl transition-all ${
                  answers[currentQuestionIndex] !== undefined
                    ? 'bg-[#6E55FB] text-white hover:bg-[#5d47d4] hover:scale-105 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Câu tiếp theo →
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                disabled={answers[currentQuestionIndex] === undefined}
                className={`flex-1 py-5 text-2xl font-bold rounded-2xl transition-all ${
                  answers[currentQuestionIndex] !== undefined
                    ? 'bg-green-500 text-white hover:bg-green-600 hover:scale-105 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                ✅ Nộp bài
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Màn hình 4: Kết quả
  if (currentScreen === 'result' && selectedExam) {
    const score = calculateScore()
    const total = mockQuestions.length
    const percentage = Math.round((score / total) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10">
          <div className="text-center">
            {/* Icon kết quả */}
            <div className="text-8xl mb-6">
              {percentage >= 80 ? '🏆' : percentage >= 50 ? '👍' : '💪'}
            </div>

            {/* Lời động viên */}
            <h1 className="text-5xl font-bold text-[#6E55FB] mb-6">
              {percentage >= 80 ? 'Xuất sắc!' : percentage >= 50 ? 'Làm tốt lắm!' : 'Cố gắng lên!'}
            </h1>

            {/* Điểm số */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-10 mb-8">
              <p className="text-2xl text-gray-600 mb-4">Số câu đúng</p>
              <p className="text-8xl font-bold text-[#6E55FB]">
                {score}/{total}
              </p>
              <p className="text-3xl text-gray-600 mt-4 font-semibold">
                Điểm: {percentage}%
              </p>
            </div>

            {/* Thông báo */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
              <p className="text-xl text-gray-700">
                {percentage >= 80 
                  ? '🌟 Con làm bài rất xuất sắc! Tiếp tục phát huy nhé!'
                  : percentage >= 50
                  ? '👏 Kết quả tốt! Hãy luyện tập thêm để đạt điểm cao hơn!'
                  : '💪 Đừng nản chí! Hãy ôn bài kỹ hơn và thử lại nhé!'}
              </p>
            </div>

            {/* Các nút */}
            <div className="space-y-4">
              <button
                onClick={() => {
                  setCurrentScreen('list')
                  setSelectedExam(null)
                }}
                className="w-full py-5 bg-[#6E55FB] text-white text-2xl font-bold rounded-2xl hover:bg-[#5d47d4] transition-all hover:scale-105 shadow-lg"
              >
                📚 Về trang chọn bài
              </button>
              
              <button
                onClick={handleStartExam}
                className="w-full py-5 bg-white text-[#6E55FB] border-2 border-[#6E55FB] text-2xl font-bold rounded-2xl hover:bg-purple-50 transition-all hover:scale-105"
              >
                🔄 Làm lại bài này
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
