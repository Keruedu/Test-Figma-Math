import type { GameScreen } from '../types'
import { AnimatedBackground } from '../components/AnimatedBackground'

interface LandingPageProps {
  onNavigate: (screen: GameScreen, questionIndex?: number) => void
}

// Question Type Data
const questionTypes = [
  {
    id: 0,
    number: 1,
    type: '📝 Trắc nghiệm',
    title: 'Tính giá trị của biểu thức: 15 × 8 + 52',
    timer: '00:08',
    timerColor: 'red-500',
    streak: 1,
    score: 100,
    answerType: 'multiple-choice' as const,
    answers: [
      { label: 'A', value: '162', isCorrect: false },
      { label: 'B', value: '172', isCorrect: true },
      { label: 'C', value: '182', isCorrect: false },
      { label: 'D', value: '192', isCorrect: false },
    ],
  },
  {
    id: 1,
    number: 2,
    type: '✍️ Tự luận',
    title: 'Phân tích ra thừa số nguyên tố: 72 = ?',
    timer: '00:15',
    timerColor: 'yellow-600',
    streak: 2,
    score: 200,
    answerType: 'text-input' as const,
  },
  {
    id: 2,
    number: 3,
    type: '✓✗ Đúng/Sai',
    title: 'Khẳng định sau đây đúng hay sai: "Số 17 là số nguyên tố"',
    timer: '00:05',
    timerColor: 'red-500',
    streak: 3,
    score: 300,
    answerType: 'true-false' as const,
    isStreakHot: true,
  },
  {
    id: 3,
    number: 4,
    type: '🔗 Ghép cột',
    title: 'Ghép các phép tính với kết quả tương ứng',
    timer: '00:20',
    timerColor: 'gray-900',
    streak: 4,
    score: 400,
    answerType: 'matching' as const,
  },
  {
    id: 4,
    number: 5,
    type: '🔢 Sắp xếp',
    title: 'Sắp xếp các số sau theo thứ tự tăng dần',
    timer: '00:12',
    timerColor: 'yellow-600',
    streak: 5,
    score: 500,
    answerType: 'ordering' as const,
  },
]

// Header Component
const GameHeader = ({ questionNum, timer, timerColor, score }: {
  questionNum: number
  timer: string
  timerColor: string
  score: number
}) => (
  <div className="flex justify-between items-center gap-2 mb-3 md:mb-4">
    <div className="bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-md border border-gray-200">
      <p className="text-gray-900 font-bold text-xs md:text-sm">Câu {questionNum}/10</p>
    </div>
    <div className={`bg-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg md:rounded-xl border-2 border-${timerColor} shadow-md ${timerColor === 'red-500' ? 'animate-pulse' : ''}`}>
      <p className={`font-bold text-base md:text-lg text-${timerColor}`}>⏱️ {timer}</p>
    </div>
    <div className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-md">
      <p className="text-white font-bold text-xs md:text-sm">🏆 {score}</p>
    </div>
  </div>
)

// Streak Component
const StreakBadge = ({ streak, isHot }: { streak: number; isHot?: boolean }) => (
  <div className="flex justify-center mb-3 md:mb-4">
    <div className={`bg-gradient-to-r from-orange-400 to-red-500 px-3 md:px-4 py-1 rounded-full shadow-lg border-2 border-orange-300 ${isHot ? 'animate-pulse' : ''}`}>
      <p className="text-white font-bold text-xs">
        🔥 Streak x{streak}{isHot ? ' - Đang cháy!' : ''}
      </p>
    </div>
  </div>
)

// Question Header Component
const QuestionHeader = ({ number, type }: { number: number; type: string }) => (
  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 border-2 border-gray-300">
      <span className="text-lg md:text-xl font-bold text-gray-900">{number}</span>
    </div>
    <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-purple-50 text-[#6E55FB] text-xs md:text-sm font-semibold border border-purple-200">
      {type}
    </span>
  </div>
)

// Multiple Choice Component
const MultipleChoiceAnswers = ({ answers }: { answers: Array<{ label: string; value: string; isCorrect: boolean }> }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
    {answers.map((answer) => (
      <div
        key={answer.label}
        className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${
          answer.isCorrect
            ? 'bg-green-50 border-2 border-green-500'
            : 'bg-gray-50 border-2 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3 md:gap-4">
          <span className={`text-lg md:text-xl font-bold ${answer.isCorrect ? 'text-green-600' : 'text-gray-500'}`}>
            {answer.label}.
          </span>
          <span className={`text-lg md:text-xl font-medium ${answer.isCorrect ? 'text-green-700' : 'text-gray-900'}`}>
            {answer.value}
          </span>
          {answer.isCorrect && (
            <span className="ml-auto">
              <span className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-500 text-white text-sm md:text-base">
                ✓
              </span>
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
)

// Text Input Component
const TextInputAnswer = () => (
  <>
    <input
      type="text"
      placeholder="Nhập đáp án của bạn..."
      className="w-full px-6 md:px-8 py-4 md:py-6 rounded-xl md:rounded-2xl bg-gray-50 border-2 border-gray-300 text-gray-900 text-lg md:text-2xl text-center placeholder-gray-500 focus:outline-none focus:border-[#6E55FB] transition-all mb-3 md:mb-4"
      disabled
    />
    <button
      className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-lg md:text-xl font-bold py-4 md:py-5 rounded-xl"
      disabled
    >
      ✓ Gửi đáp án
    </button>
  </>
)

// True/False Component
const TrueFalseAnswers = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
    <div className="relative p-6 md:p-8 rounded-xl md:rounded-2xl bg-green-50 border-2 border-green-500">
      <div className="text-center">
        <span className="text-4xl md:text-5xl mb-3 md:mb-4 block text-green-600">✓</span>
        <span className="text-xl md:text-2xl font-bold text-green-700">ĐÚNG</span>
      </div>
      <span className="absolute top-3 right-3 md:top-4 md:right-4">
        <span className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-500 text-white text-lg md:text-xl">
          ✓
        </span>
      </span>
    </div>
    <div className="p-6 md:p-8 rounded-xl md:rounded-2xl bg-gray-50 border-2 border-gray-200">
      <div className="text-center">
        <span className="text-4xl md:text-5xl mb-3 md:mb-4 block text-gray-900">✗</span>
        <span className="text-xl md:text-2xl font-bold text-gray-900">SAI</span>
      </div>
    </div>
  </div>
)

// Matching Component
const MatchingAnswers = () => (
  <>
    <div className="bg-blue-50 p-3 md:p-4 rounded-lg md:rounded-xl border border-blue-200 mb-3 md:mb-4">
      <p className="text-gray-700 text-xs md:text-sm">
        💡 Click vào Cột A, sau đó click vào Cột B để ghép đôi
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="space-y-2 md:space-y-3">
        <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
          <span className="bg-blue-100 px-2 md:px-3 py-1 rounded-lg text-blue-700 text-sm md:text-base">Cột A</span>
        </h4>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-purple-100 border-2 border-[#6E55FB]">
          <span className="text-gray-900 font-semibold text-base md:text-lg">3 × 7</span>
        </div>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-blue-50 border-2 border-blue-400 flex items-center justify-between">
          <span className="text-gray-900 font-semibold text-base md:text-lg">5 × 6</span>
          <span className="text-xs md:text-sm text-blue-700">→ 30</span>
        </div>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-gray-50 border-2 border-gray-200">
          <span className="text-gray-900 font-semibold text-base md:text-lg">8 × 4</span>
        </div>
      </div>
      <div className="space-y-2 md:space-y-3">
        <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
          <span className="bg-purple-100 px-2 md:px-3 py-1 rounded-lg text-purple-700 text-sm md:text-base">Cột B</span>
        </h4>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-purple-50 border-2 border-purple-400">
          <span className="text-gray-900 font-semibold text-base md:text-lg">21</span>
        </div>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-purple-50 border-2 border-purple-400">
          <span className="text-gray-900 font-semibold text-base md:text-lg">30</span>
        </div>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-gray-50 border-2 border-gray-100">
          <span className="text-gray-900 font-semibold text-base md:text-lg">32</span>
        </div>
      </div>
    </div>
    <button
      className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-lg md:text-xl font-bold py-4 md:py-5 rounded-xl mt-4 md:mt-6 opacity-50 cursor-not-allowed"
      disabled
    >
      ✓ Gửi đáp án (1/3)
    </button>
  </>
)

// Ordering Component
const OrderingAnswers = () => (
  <>
    <div className="bg-blue-50 p-3 md:p-4 rounded-lg md:rounded-xl border border-blue-200 mb-3 md:mb-4">
      <p className="text-gray-700 text-xs md:text-sm">
        💡 Kéo thả để sắp xếp các mục theo thứ tự đúng
      </p>
    </div>
    <div className="space-y-2 md:space-y-3">
      {[
        { order: 1, value: '47' },
        { order: 2, value: '89' },
        { order: 3, value: '125' },
      ].map((item, i) => (
        <div
          key={i}
          className={`relative p-4 md:p-6 rounded-lg md:rounded-xl cursor-move ${
            i === 0
              ? 'bg-green-50 border-2 border-green-500'
              : 'bg-gray-50 border-2 border-gray-200'
          }`}
        >
          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-2xl md:text-3xl font-bold bg-gray-100 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center border border-gray-300">
              {item.order}
            </span>
            <span className="text-lg md:text-2xl font-semibold text-gray-900 flex-1">
              {item.value}
            </span>
            <span className="text-xl md:text-2xl text-gray-400">⋮⋮</span>
          </div>
          {i === 0 && (
            <span className="absolute top-3 right-3 md:top-4 md:right-4 text-2xl md:text-3xl">✓</span>
          )}
        </div>
      ))}
    </div>
  </>
)

export const LandingPage = ({ onNavigate }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-slide">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-3 md:mb-4 drop-shadow-lg px-4">
            ⚔️ Đấu Trường Toán Học
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 px-4">
            Math Battle Arena - Nền tảng học toán tương tác như Kahoot!
          </p>
          <button
            onClick={() => onNavigate('lobby')}
            className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-base md:text-xl font-bold py-3 px-8 md:py-4 md:px-12 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95"
          >
            🚀 Bắt đầu trải nghiệm
          </button>
        </div>

        {/* Screen Previews */}
        <div className="space-y-12 md:space-y-16">
          {/* Lobby Preview */}
          <div className="animate-fade-slide animate-delay-200">
            <div className="text-center mb-6 md:mb-8 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">1️⃣ Sảnh chờ</h2>
              <p className="text-sm md:text-base text-gray-600">Người chơi nhập tên và chờ trận đấu bắt đầu</p>
            </div>
            <div
              className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200 hover:scale-105 transition-all cursor-pointer"
              onClick={() => onNavigate('lobby')}
            >
              <div className="text-center mb-5 md:mb-6">
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">⚔️ Đấu Trường Toán Học</h3>
                <div className="inline-block bg-purple-50 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border-2 border-[#6E55FB]">
                  <p className="text-gray-600 text-xs md:text-sm mb-1">Mã phòng:</p>
                  <p className="text-2xl md:text-3xl font-bold text-[#6E55FB]">4827</p>
                </div>
              </div>
              <input
                type="text"
                placeholder="Nhập tên của bạn"
                className="w-full px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 text-center placeholder-gray-400 mb-3 md:mb-4 text-sm md:text-base"
                disabled
              />
              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
                {['🎯 Minh Anh', '🚀 Tuấn Kiệt', '⭐ Hương Giang'].map((player, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-lg md:rounded-xl p-2 text-center text-gray-900 text-xs md:text-sm border border-gray-200"
                  >
                    {player}
                  </div>
                ))}
              </div>
              <button
                className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white font-bold py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base"
                disabled
              >
                🚀 Sẵn sàng!
              </button>
            </div>
          </div>

          {/* Question Types Preview */}
          <div className="animate-fade-slide animate-delay-400">
            <div className="text-center mb-6 md:mb-8 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">2️⃣ Các dạng câu hỏi</h2>
              <p className="text-sm md:text-base text-gray-600">5 loại câu hỏi đa dạng và hấp dẫn với timer và streak</p>
            </div>
            <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
              {questionTypes.map((question) => (
                <div
                  key={question.id}
                  className="bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-gray-200 shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
                  onClick={() => onNavigate('game', question.id)}
                >
                  <GameHeader
                    questionNum={question.number}
                    timer={question.timer}
                    timerColor={question.timerColor}
                    score={question.score}
                  />
                  <StreakBadge streak={question.streak} isHot={question.isStreakHot} />
                  
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-gray-200">
                    <QuestionHeader number={question.number} type={question.type} />
                    <h3 className="text-lg md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
                      {question.title}
                    </h3>
                    
                    {question.answerType === 'multiple-choice' && question.answers && (
                      <MultipleChoiceAnswers answers={question.answers} />
                    )}
                    {question.answerType === 'text-input' && <TextInputAnswer />}
                    {question.answerType === 'true-false' && <TrueFalseAnswers />}
                    {question.answerType === 'matching' && <MatchingAnswers />}
                    {question.answerType === 'ordering' && <OrderingAnswers />}
                  </div>
                </div>
              ))}
              {/* Multiple Choice */}
              <div
                className="bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 rounded-3xl p-6 border border-gray-200 shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
                onClick={() => onNavigate('game', 0)}
              >
                {/* Header Bar */}
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-200">
                    <p className="text-gray-900 font-bold text-sm">Câu 1/10</p>
                  </div>
                  <div className="bg-white px-6 py-2 rounded-xl border-2 border-red-500 shadow-md animate-pulse">
                    <p className="font-bold text-lg text-red-500">⏱️ 00:08</p>
                  </div>
                  <div className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] px-4 py-2 rounded-xl shadow-md">
                    <p className="text-white font-bold text-sm">🏆 100</p>
                  </div>
                </div>

                {/* Streak */}
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 px-4 py-1 rounded-full shadow-lg border-2 border-orange-300">
                    <p className="text-white font-bold text-xs">🔥 Streak x1</p>
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border-2 border-gray-300">
                      <span className="text-xl font-bold text-gray-900">1</span>
                    </div>
                    <span className="inline-block px-4 py-2 rounded-full bg-purple-50 text-[#6E55FB] text-sm font-semibold border border-purple-200">
                      📝 Trắc nghiệm
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Tính giá trị của biểu thức: 15 × 8 + 52
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-gray-50 border-2 border-gray-200">
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-gray-500">A.</span>
                        <span className="text-xl font-medium text-gray-900">162</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-green-50 border-2 border-green-500">
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-green-600">B.</span>
                        <span className="text-xl font-medium text-green-700">172</span>
                        <span className="ml-auto">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                            ✓
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border-2 border-gray-200">
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-gray-500">C.</span>
                        <span className="text-xl font-medium text-gray-900">182</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border-2 border-gray-200">
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-gray-500">D.</span>
                        <span className="text-xl font-medium text-gray-900">192</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Input */}
              <div
                className="bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 rounded-3xl p-6 border border-gray-200 shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
                onClick={() => onNavigate('game', 1)}
              >
                {/* Header Bar */}
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-200">
                    <p className="text-gray-900 font-bold text-sm">Câu 2/10</p>
                  </div>
                  <div className="bg-white px-6 py-2 rounded-xl border-2 border-yellow-500 shadow-md">
                    <p className="font-bold text-lg text-yellow-600">⏱️ 00:15</p>
                  </div>
                  <div className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] px-4 py-2 rounded-xl shadow-md">
                    <p className="text-white font-bold text-sm">🏆 200</p>
                  </div>
                </div>

                {/* Streak */}
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 px-4 py-1 rounded-full shadow-lg border-2 border-orange-300">
                    <p className="text-white font-bold text-xs">🔥 Streak x2</p>
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border-2 border-gray-300">
                      <span className="text-xl font-bold text-gray-900">2</span>
                    </div>
                    <span className="inline-block px-4 py-2 rounded-full bg-purple-50 text-[#6E55FB] text-sm font-semibold border border-purple-200">
                      ✍️ Tự luận
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Phân tích ra thừa số nguyên tố: 72 = ?
                  </h3>
                  <input
                    type="text"
                    placeholder="Nhập đáp án của bạn..."
                    className="w-full px-8 py-6 rounded-2xl bg-gray-50 border-2 border-gray-300 text-gray-900 text-2xl text-center placeholder-gray-500 focus:outline-none focus:border-[#6E55FB] transition-all mb-4"
                    disabled
                  />
                  <button
                    className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold py-5 rounded-xl"
                    disabled
                  >
                    ✓ Gửi đáp án
                  </button>
                </div>
              </div>

              {/* True/False */}
              <div
                className="bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 rounded-3xl p-6 border border-gray-200 shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
                onClick={() => onNavigate('game', 2)}
              >
                {/* Header Bar */}
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-200">
                    <p className="text-gray-900 font-bold text-sm">Câu 3/10</p>
                  </div>
                  <div className="bg-white px-6 py-2 rounded-xl border-2 border-red-500 shadow-md animate-pulse">
                    <p className="font-bold text-lg text-red-500">⏱️ 00:05</p>
                  </div>
                  <div className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] px-4 py-2 rounded-xl shadow-md">
                    <p className="text-white font-bold text-sm">🏆 300</p>
                  </div>
                </div>

                {/* Streak */}
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 px-4 py-1 rounded-full shadow-lg border-2 border-orange-300 animate-pulse">
                    <p className="text-white font-bold text-xs">🔥 Streak x3 - Đang cháy!</p>
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border-2 border-gray-300">
                      <span className="text-xl font-bold text-gray-900">3</span>
                    </div>
                    <span className="inline-block px-4 py-2 rounded-full bg-purple-50 text-[#6E55FB] text-sm font-semibold border border-purple-200">
                      ✓✗ Đúng/Sai
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Khẳng định sau đây đúng hay sai: "Số 17 là số nguyên tố"
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative p-8 rounded-2xl bg-green-50 border-2 border-green-500">
                      <div className="text-center">
                        <span className="text-5xl mb-4 block text-green-600">✓</span>
                        <span className="text-2xl font-bold text-green-700">ĐÚNG</span>
                      </div>
                      <span className="absolute top-4 right-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-xl">
                          ✓
                        </span>
                      </span>
                    </div>
                    <div className="p-8 rounded-2xl bg-gray-50 border-2 border-gray-200">
                      <div className="text-center">
                        <span className="text-5xl mb-4 block text-gray-900">✗</span>
                        <span className="text-2xl font-bold text-gray-900">SAI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Matching */}
              <div
                className="bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 rounded-3xl p-6 border border-gray-200 shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
                onClick={() => onNavigate('game', 3)}
              >
                {/* Header Bar */}
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-200">
                    <p className="text-gray-900 font-bold text-sm">Câu 4/10</p>
                  </div>
                  <div className="bg-white px-6 py-2 rounded-xl border-2 border-gray-300 shadow-md">
                    <p className="font-bold text-lg text-gray-900">⏱️ 00:20</p>
                  </div>
                  <div className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] px-4 py-2 rounded-xl shadow-md">
                    <p className="text-white font-bold text-sm">🏆 400</p>
                  </div>
                </div>

                {/* Streak */}
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 px-4 py-1 rounded-full shadow-lg border-2 border-orange-300">
                    <p className="text-white font-bold text-xs">🔥 Streak x4</p>
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border-2 border-gray-300">
                      <span className="text-xl font-bold text-gray-900">4</span>
                    </div>
                    <span className="inline-block px-4 py-2 rounded-full bg-purple-50 text-[#6E55FB] text-sm font-semibold border border-purple-200">
                      🔗 Ghép cột
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Ghép các phép tính với kết quả tương ứng
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mb-4">
                    <p className="text-gray-700 text-sm">
                      💡 Click vào Cột A, sau đó click vào Cột B để ghép đôi
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-blue-100 px-3 py-1 rounded-lg text-blue-700">Cột A</span>
                      </h4>
                      <div className="p-4 rounded-xl bg-purple-100 border-2 border-[#6E55FB]">
                        <span className="text-gray-900 font-semibold text-lg">3 × 7</span>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-50 border-2 border-blue-400 flex items-center justify-between">
                        <span className="text-gray-900 font-semibold text-lg">5 × 6</span>
                        <span className="text-sm text-blue-700">→ 30</span>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50 border-2 border-gray-200">
                        <span className="text-gray-900 font-semibold text-lg">8 × 4</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-purple-100 px-3 py-1 rounded-lg text-purple-700">
                          Cột B
                        </span>
                      </h4>
                      <div className="p-4 rounded-xl bg-purple-50 border-2 border-purple-400">
                        <span className="text-gray-900 font-semibold text-lg">21</span>
                      </div>
                      <div className="p-4 rounded-xl bg-purple-50 border-2 border-purple-400">
                        <span className="text-gray-900 font-semibold text-lg">30</span>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50 border-2 border-gray-100">
                        <span className="text-gray-900 font-semibold text-lg">32</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold py-5 rounded-xl mt-6 opacity-50 cursor-not-allowed"
                    disabled
                  >
                    ✓ Gửi đáp án (1/3)
                  </button>
                </div>
              </div>

              {/* Ordering */}
              <div
                className="bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 rounded-3xl p-6 border border-gray-200 shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
                onClick={() => onNavigate('game', 4)}
              >
                {/* Header Bar */}
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-200">
                    <p className="text-gray-900 font-bold text-sm">Câu 5/10</p>
                  </div>
                  <div className="bg-white px-6 py-2 rounded-xl border-2 border-yellow-500 shadow-md">
                    <p className="font-bold text-lg text-yellow-600">⏱️ 00:12</p>
                  </div>
                  <div className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] px-4 py-2 rounded-xl shadow-md">
                    <p className="text-white font-bold text-sm">🏆 500</p>
                  </div>
                </div>

                {/* Streak */}
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 px-4 py-1 rounded-full shadow-lg border-2 border-orange-300">
                    <p className="text-white font-bold text-xs">🔥 Streak x5</p>
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border-2 border-gray-300">
                      <span className="text-xl font-bold text-gray-900">5</span>
                    </div>
                    <span className="inline-block px-4 py-2 rounded-full bg-purple-50 text-[#6E55FB] text-sm font-semibold border border-purple-200">
                      � Sắp xếp
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Sắp xếp các số sau theo thứ tự tăng dần
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mb-4">
                    <p className="text-gray-700 text-sm">
                      💡 Kéo thả để sắp xếp các mục theo thứ tự đúng
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { order: 1, value: '47' },
                      { order: 2, value: '89' },
                      { order: 3, value: '125' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`relative p-6 rounded-xl cursor-move ${
                          i === 0
                            ? 'bg-green-50 border-2 border-green-500'
                            : 'bg-gray-50 border-2 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-bold bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center border border-gray-300">
                            {item.order}
                          </span>
                          <span className="text-xl md:text-2xl font-semibold text-gray-900 flex-1">
                            {item.value}
                          </span>
                          <span className="text-2xl text-gray-400">⋮⋮</span>
                        </div>
                        {i === 0 && (
                          <span className="absolute top-4 right-4 text-3xl">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div className="animate-fade-slide animate-delay-500">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">3️⃣ Bảng xếp hạng</h2>
              <p className="text-gray-600">Xem thứ hạng sau mỗi câu hỏi</p>
            </div>
            <div
              className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 hover:scale-105 transition-all cursor-pointer"
              onClick={() => onNavigate('leaderboard')}
            >
              <h3 className="text-4xl font-bold text-gray-900 text-center mb-3">
                🏆 BẢNG XẾP HẠNG 🏆
              </h3>
              <p className="text-gray-600 text-lg text-center mb-8">Sau câu hỏi này sẽ tiếp tục...</p>
              
              <div className="space-y-4 mb-8">
                {[
                  { pos: 1, avatar: '🎯', name: 'Minh Anh', score: 500, badge: '👑 Đang dẫn đầu' },
                  { pos: 2, avatar: '🚀', name: 'Tuấn Kiệt', score: 450, gap: 50 },
                  { pos: 3, avatar: '⭐', name: 'Hương Giang', score: 400, gap: 100 },
                  { pos: 4, avatar: '🌸', name: 'Thu Trang', score: 350, gap: 150 },
                  { pos: 5, avatar: '⚡', name: 'Đức Nam', score: 300, gap: 200 },
                ].map((player) => (
                  <div
                    key={player.pos}
                    className={`rounded-2xl shadow-lg border-2 transition-all ${
                      player.pos === 1
                        ? 'bg-gradient-to-r from-yellow-50 to-white border-yellow-400'
                        : player.pos === 2
                          ? 'bg-gradient-to-r from-gray-50 to-white border-gray-300'
                          : player.pos === 3
                            ? 'bg-gradient-to-r from-orange-50 to-white border-orange-300'
                            : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4 p-4">
                      <div
                        className={`flex items-center justify-center w-14 h-14 rounded-full font-black text-2xl ${
                          player.pos === 1
                            ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg'
                            : player.pos === 2
                              ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg'
                              : player.pos === 3
                                ? 'bg-gradient-to-br from-orange-300 to-orange-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {player.pos === 1 ? '🥇' : player.pos === 2 ? '🥈' : player.pos === 3 ? '🥉' : player.pos}
                      </div>

                      <div className="w-14 h-14 text-4xl bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200">
                        {player.avatar}
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900">{player.name}</h4>
                        {player.badge && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                            {player.badge}
                          </span>
                        )}
                        {player.gap && (
                          <p className="text-gray-500 text-sm">Kém {player.gap} điểm</p>
                        )}
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-3xl font-black ${
                            player.pos === 1
                              ? 'text-yellow-600'
                              : player.pos === 2
                                ? 'text-gray-600'
                                : player.pos === 3
                                  ? 'text-orange-600'
                                  : 'text-[#6E55FB]'
                          }`}
                        >
                          {player.score}
                        </div>
                        <div className="text-sm text-gray-500 font-semibold">điểm</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 shadow-inner border border-gray-200">
                <p className="text-gray-600 text-center mb-3">Câu hỏi tiếp theo trong</p>
                <div className="text-6xl font-black text-[#6E55FB] text-center mb-3 animate-pulse">
                  3
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] h-full rounded-full"
                    style={{ width: '60%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Preview */}
          <div className="animate-fade-slide animate-delay-600">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">4️⃣ Kết quả chung cuộc</h2>
              <p className="text-gray-600">Bục vinh quang và xếp hạng cuối cùng</p>
            </div>
            <div
              className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 hover:scale-105 transition-all cursor-pointer"
              onClick={() => onNavigate('results')}
            >
              <h3 className="text-4xl font-bold text-gray-900 text-center mb-3">
                🏆 Kết quả chung cuộc
              </h3>
              <p className="text-xl text-green-600 text-center mb-8">
                Chúc mừng! Bạn đã hoàn thành trận đấu!
              </p>

              {/* Podium */}
              <div className="flex items-end justify-center gap-4 mb-8">
                {/* 2nd */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-gray-300 to-gray-400 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2">
                    🚀
                  </div>
                  <div className="bg-gradient-to-br from-gray-300 to-gray-500 w-24 h-32 rounded-t-2xl flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">2</span>
                    <span className="text-white text-sm">400</span>
                  </div>
                </div>

                {/* 1st */}
                <div className="flex flex-col items-center -mt-6">
                  <span className="text-4xl mb-2">👑</span>
                  <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-2">
                    🎯
                  </div>
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-28 h-44 rounded-t-2xl flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-yellow-900">1</span>
                    <span className="text-yellow-900 font-bold text-lg">500</span>
                  </div>
                </div>

                {/* 3rd */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2">
                    ⭐
                  </div>
                  <div className="bg-gradient-to-br from-orange-400 to-orange-700 w-24 h-24 rounded-t-2xl flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-orange-900">3</span>
                    <span className="text-white text-sm">300</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white font-bold py-3 rounded-xl"
                  disabled
                >
                  🔄 Chơi lại
                </button>
                <button
                  className="bg-gray-50 text-gray-900 font-bold py-3 rounded-xl border border-gray-300"
                  disabled
                >
                  🚪 Thoát
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <p className="text-gray-500 text-sm">Thiết kế bởi Tailwind CSS • Màu chủ đạo: #6E55FB</p>
        </div>
      </div>
    </div>
  )
}
