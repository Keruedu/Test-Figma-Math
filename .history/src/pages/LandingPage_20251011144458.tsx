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
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div className="animate-fade-slide animate-delay-500">
            <div className="text-center mb-6 md:mb-8 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">3️⃣ Bảng xếp hạng</h2>
              <p className="text-sm md:text-base text-gray-600">Xem thứ hạng sau mỗi câu hỏi và nhận điểm thưởng</p>
            </div>
            <div
              className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200 hover:scale-105 transition-all cursor-pointer"
              onClick={() => onNavigate('leaderboard')}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-2 md:mb-3">
                🏆 BẢNG XẾP HẠNG 🏆
              </h3>
              <p className="text-gray-600 text-base md:text-lg text-center mb-6 md:mb-8">Sau câu hỏi này sẽ tiếp tục...</p>
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {[
                  { pos: 1, avatar: '🎯', name: 'Minh Anh', score: 500, badge: '👑 Đang dẫn đầu' },
                  { pos: 2, avatar: '🚀', name: 'Tuấn Kiệt', score: 450, gap: 50 },
                  { pos: 3, avatar: '⭐', name: 'Hương Giang', score: 400, gap: 100 },
                  { pos: 4, avatar: '🌸', name: 'Thu Trang', score: 350, gap: 150 },
                  { pos: 5, avatar: '⚡', name: 'Đức Nam', score: 300, gap: 200 },
                ].map((player) => (
                  <div
                    key={player.pos}
                    className={`rounded-xl md:rounded-2xl shadow-lg border-2 transition-all ${
                      player.pos === 1
                        ? 'bg-gradient-to-r from-yellow-50 to-white border-yellow-400'
                        : player.pos === 2
                          ? 'bg-gradient-to-r from-gray-50 to-white border-gray-300'
                          : player.pos === 3
                            ? 'bg-gradient-to-r from-orange-50 to-white border-orange-300'
                            : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full font-black text-xl md:text-2xl ${
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

                      <div className="w-12 h-12 md:w-14 md:h-14 text-3xl md:text-4xl bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200">
                        {player.avatar}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-base md:text-lg font-bold text-gray-900 truncate">{player.name}</h4>
                        {player.badge && (
                          <span className="inline-block px-2 py-0.5 md:py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full mt-1">
                            {player.badge}
                          </span>
                        )}
                        {player.gap && (
                          <p className="text-gray-500 text-xs md:text-sm">Kém {player.gap} điểm</p>
                        )}
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-2xl md:text-3xl font-black ${
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
                        <div className="text-xs md:text-sm text-gray-500 font-semibold">điểm</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-inner border border-gray-200">
                <p className="text-gray-600 text-center mb-2 md:mb-3 text-sm md:text-base">Câu hỏi tiếp theo trong</p>
                <div className="text-5xl md:text-6xl font-black text-[#6E55FB] text-center mb-2 md:mb-3 animate-pulse">
                  3
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] h-full rounded-full"
                    style={{ width: '60%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Plans */}
          <div className="animate-fade-slide animate-delay-600">
            <div className="text-center mb-6 md:mb-8 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Thanh toán gói học</h2>
              <p className="text-sm md:text-base text-gray-600">Chọn gói phù hợp để nâng cao kỹ năng toán học</p>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                {/* Gói Cơ bản */}
                <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Gói Cơ bản</h3>
                  <div className="mb-6">
                    <span className="text-4xl md:text-5xl font-black text-[#6E55FB]">99.000đ</span>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2 text-sm md:text-base">
                      <span className="text-yellow-500 text-lg">💰</span>
                      <span className="text-gray-700">100 coins</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm md:text-base">
                      <span className="text-gray-400 text-lg">✏️</span>
                      <span className="text-gray-700">50 lượt hỏi đáp</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm md:text-base">
                      <span className="text-gray-400 text-lg">📝</span>
                      <span className="text-gray-700">100 lượt sinh bài tập</span>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mb-6">Phù hợp cho học sinh mới bắt đầu</p>
                  <button className="w-full bg-gray-50 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all border border-gray-200">
                    Chọn gói
                  </button>
                </div>

                {/* Gói Nâng cao - POPULAR */}
                <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border-2 border-[#6E55FB] relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#6E55FB] text-white px-4 py-1 rounded-full text-xs md:text-sm font-bold shadow-lg">
                    PHỔ BIẾN NHẤT
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Gói Nâng cao</h3>
                  <div className="mb-6">
                    <span className="text-4xl md:text-5xl font-black text-[#6E55FB]">249.000đ</span>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2 text-sm md:text-base">
                      <span className="text-yellow-500 text-lg">💰</span>
                      <span className="text-gray-700">300 coins</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm md:text-base">
                      <span className="text-gray-400 text-lg">✏️</span>
                      <span className="text-gray-700">200 lượt hỏi đáp</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm md:text-base">
                      <span className="text-gray-400 text-lg">📝</span>
                      <span className="text-gray-700">500 lượt sinh bài tập</span>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mb-6">Dành cho học sinh muốn nâng cao kiến thức</p>
                  <button className="w-full bg-[#6E55FB] text-white font-bold py-3 rounded-xl hover:bg-[#5d47d4] transition-all shadow-md">
                    Chọn gói
                  </button>
                </div>

                {/* Gói Premium */}
                <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Gói Premium</h3>
                  <div className="mb-6">
                    <span className="text-4xl md:text-5xl font-black text-[#6E55FB]">399.000đ</span>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2 text-sm md:text-base">
                      <span className="text-yellow-500 text-lg">💰</span>
                      <span className="text-gray-700">500 coins</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm md:text-base">
                      <span className="text-gray-400 text-lg">✏️</span>
                      <span className="text-gray-700">500 lượt hỏi đáp</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm md:text-base">
                      <span className="text-gray-400 text-lg">📝</span>
                      <span className="text-gray-700">700 lượt sinh bài tập</span>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mb-6">Gói cao cấp, học tập thoải mái</p>
                  <button className="w-full bg-gray-50 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all border border-gray-200">
                    Chọn gói
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#6E55FB] bg-white cursor-pointer hover:bg-purple-50 transition-all">
                    <div className="w-12 h-12 bg-[#6E55FB] rounded-lg flex items-center justify-center text-white text-2xl">
                      💳
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 text-sm md:text-base">PayOS</h5>
                      <p className="text-xs md:text-sm text-gray-600">Visa, Mastercard, JCB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-all">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      📱
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 text-sm md:text-base">SePay</h5>
                      <p className="text-xs md:text-sm text-gray-600">Thanh toán qua QR</p>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-[#6E55FB] text-white font-bold py-3 md:py-4 rounded-xl hover:bg-[#5d47d4] transition-all shadow-md text-sm md:text-base">
                  Xác nhận thanh toán
                </button>
              </div>
            </div>
          </div>

          {/* Token Exchange */}
          <div className="animate-fade-slide animate-delay-700">
            <div className="text-center mb-6 md:mb-8 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Đổi Token AI</h2>
              <p className="text-sm md:text-base text-gray-600">Dùng điểm thưởng để đổi token sinh đề kiểm tra</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200">
                {/* Current Balance */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 border border-purple-100">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm md:text-base text-gray-600 mb-1">Điểm thưởng hiện có</p>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl md:text-4xl font-black text-[#6E55FB]">1,250</span>
                        <span className="text-lg md:text-xl text-gray-600">điểm</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm md:text-base text-gray-600 mb-1">Token AI hiện có</p>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl md:text-4xl">🤖</span>
                        <span className="text-3xl md:text-4xl font-black text-[#6E55FB]">25</span>
                        <span className="text-lg md:text-xl text-gray-600">tokens</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exchange Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 hover:border-[#6E55FB] hover:shadow-xl transition-all cursor-pointer">
                    <div className="text-center">
                      <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Gói Cơ bản</h4>
                      <div className="mb-4">
                        <span className="text-2xl md:text-3xl font-black text-[#6E55FB]">5 tokens</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-xl md:text-2xl font-bold text-gray-700">100 điểm</span>
                      </div>
                      <button className="w-full bg-gray-50 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-100 transition-all border border-gray-200 text-sm md:text-base">
                        Đổi ngay
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#6E55FB] rounded-xl p-4 md:p-6 shadow-xl border-2 border-[#6E55FB] relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-[#6E55FB] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      PHỔ BIẾN
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg md:text-xl font-bold text-white mb-2">Gói Tiết kiệm</h4>
                      <div className="mb-4">
                        <span className="text-2xl md:text-3xl font-black text-white">15 tokens</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-xl md:text-2xl font-bold text-white">250 điểm</span>
                        <span className="text-xs bg-white text-[#6E55FB] px-2 py-0.5 rounded-full font-bold">-17%</span>
                      </div>
                      <button className="w-full bg-white text-[#6E55FB] font-bold py-2 rounded-lg hover:bg-gray-100 transition-all text-sm md:text-base">
                        Đổi ngay
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 hover:border-[#6E55FB] hover:shadow-xl transition-all cursor-pointer">
                    <div className="text-center">
                      <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Gói Cao cấp</h4>
                      <div className="mb-4">
                        <span className="text-2xl md:text-3xl font-black text-[#6E55FB]">50 tokens</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-xl md:text-2xl font-bold text-gray-700">750 điểm</span>
                        <span className="text-xs bg-[#6E55FB] text-white px-2 py-0.5 rounded-full font-bold">-25%</span>
                      </div>
                      <button className="w-full bg-gray-50 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-100 transition-all border border-gray-200 text-sm md:text-base">
                        Đổi ngay
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-purple-50 rounded-xl p-4 md:p-6 border border-purple-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl md:text-3xl">💡</span>
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900 mb-2 text-sm md:text-base">Token AI dùng để làm gì?</h5>
                      <ul className="space-y-2 text-xs md:text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <span className="text-[#6E55FB]">✓</span>
                          <span>Sinh đề kiểm tra tự động với AI</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#6E55FB]">✓</span>
                          <span>Tùy chỉnh độ khó và dạng câu hỏi</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#6E55FB]">✓</span>
                          <span>Nhận giải thích chi tiết cho mỗi câu</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#6E55FB]">★</span>
                          <span className="font-semibold">1 token = 1 đề kiểm tra (10 câu hỏi)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Earning Points */}
                <div className="mt-6 bg-white rounded-xl p-4 md:p-6 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl md:text-3xl">🎯</span>
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900 mb-2 text-sm md:text-base">Cách kiếm điểm thưởng:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-100 text-[#6E55FB] px-2 py-1 rounded font-bold">+100</span>
                          <span className="text-gray-700">Thắng 1 trận đấu</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-100 text-[#6E55FB] px-2 py-1 rounded font-bold">+50</span>
                          <span className="text-gray-700">Streak 5 câu liên tiếp</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-100 text-[#6E55FB] px-2 py-1 rounded font-bold">+200</span>
                          <span className="text-gray-700">Top 1 bảng xếp hạng</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-100 text-[#6E55FB] px-2 py-1 rounded font-bold">+25</span>
                          <span className="text-gray-700">Hoàn thành hàng ngày</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="animate-fade-slide animate-delay-750">
            <div className="text-center mb-6 md:mb-8 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Thành tựu của bạn</h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Khám phá các cột mốc bạn đã đạt được và những thử thách đang chờ phía trước
              </p>
              
              {/* Filter Tabs */}
              <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
                <button className="px-4 md:px-6 py-2 rounded-full bg-[#6E55FB] text-white font-semibold text-xs md:text-sm shadow-md hover:bg-[#5d47d4] transition-all">
                  Tất cả
                </button>
                <button className="px-4 md:px-6 py-2 rounded-full bg-white text-gray-700 font-semibold text-xs md:text-sm border border-gray-200 hover:border-[#6E55FB] transition-all">
                  Đã đạt được
                </button>
                <button className="px-4 md:px-6 py-2 rounded-full bg-white text-gray-700 font-semibold text-xs md:text-sm border border-gray-200 hover:border-[#6E55FB] transition-all">
                  Chưa đạt được
                </button>
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Achievement Stats Bar */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl md:rounded-3xl p-4 md:p-6 mb-6 border border-purple-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl md:text-3xl font-black text-[#6E55FB]">12</p>
                    <p className="text-xs md:text-sm text-gray-600 font-semibold">Đã đạt được</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-black text-gray-400">8</p>
                    <p className="text-xs md:text-sm text-gray-600 font-semibold">Đang thực hiện</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-black text-[#6E55FB]">850</p>
                    <p className="text-xs md:text-sm text-gray-600 font-semibold">Điểm thưởng</p>
                  </div>
                </div>
              </div>

              {/* Achievement Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Achievement 1 - Completed */}
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-[#6E55FB] hover:scale-105 transition-all cursor-pointer relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-[#6E55FB] text-white px-3 py-1 rounded-bl-xl text-xs font-bold">
                    ✓ Đã đạt
                  </div>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-lg animate-pulse">
                      🏅
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                      Hoàn thành bài đầu tiên!
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-3">
                      Chúc mừng! Bạn đã hoàn thành bài kiểm tra đầu tiên
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 md:p-3 mb-3 border border-green-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs md:text-sm font-semibold text-green-700">Hoàn thành</span>
                      <span className="text-xs md:text-sm font-bold text-green-700">1/1</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
                    <span className="bg-purple-100 text-[#6E55FB] px-3 py-1 rounded-full font-bold">+50 điểm</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">3 ngày trước</span>
                  </div>
                </div>

                {/* Achievement 2 - In Progress */}
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-200 hover:scale-105 hover:border-[#6E55FB] transition-all cursor-pointer group">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-md">
                      🔥
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                      Chuỗi học 7 ngày
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-3">
                      Học liên tục trong 7 ngày để mở khóa thành tựu này
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2 md:p-3 mb-3 border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs md:text-sm font-semibold text-blue-700">Tiến độ</span>
                      <span className="text-xs md:text-sm font-bold text-blue-700">5/7 ngày</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: '71%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold">+100 điểm</span>
                    <span className="text-gray-500">•</span>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded font-bold">+2 token</span>
                  </div>
                </div>

                {/* Achievement 3 - Completed */}
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-[#6E55FB] hover:scale-105 transition-all cursor-pointer relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-[#6E55FB] text-white px-3 py-1 rounded-bl-xl text-xs font-bold">
                    ✓ Đã đạt
                  </div>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-lg">
                      ⭐
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                      Điểm số hoàn hảo
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-3">
                      Đạt 10/10 điểm trong một bài kiểm tra
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 md:p-3 mb-3 border border-green-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs md:text-sm font-semibold text-green-700">Hoàn thành</span>
                      <span className="text-xs md:text-sm font-bold text-green-700">10/10</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
                    <span className="bg-purple-100 text-[#6E55FB] px-3 py-1 rounded-full font-bold">+75 điểm</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">1 tuần trước</span>
                  </div>
                </div>

                {/* Achievement 4 - Locked */}
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-200 hover:scale-105 hover:border-gray-300 transition-all cursor-pointer opacity-75 group">
                  <div className="absolute top-3 right-3">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-md grayscale">
                      👑
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-500 mb-2">
                      Vua toán học
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mb-3">
                      Hoàn thành 50 bài kiểm tra với điểm trung bình 9.0+
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 md:p-3 mb-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs md:text-sm font-semibold text-gray-500">Chưa mở khóa</span>
                      <span className="text-xs md:text-sm font-bold text-gray-500">12/50</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-400 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-bold">+200 điểm</span>
                    <span className="text-gray-400">•</span>
                    <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded font-bold">+5 token</span>
                  </div>
                </div>

                {/* Achievement 5 - In Progress */}
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-200 hover:scale-105 hover:border-[#6E55FB] transition-all cursor-pointer group">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-md">
                      🚀
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                      Tốc độ ánh sáng
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-3">
                      Hoàn thành 10 bài trong thời gian dưới 5 phút
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2 md:p-3 mb-3 border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs md:text-sm font-semibold text-blue-700">Tiến độ</span>
                      <span className="text-xs md:text-sm font-bold text-blue-700">6/10 bài</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold">+80 điểm</span>
                    <span className="text-gray-500">•</span>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded font-bold">+1 token</span>
                  </div>
                </div>

                {/* Achievement 6 - Completed */}
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-[#6E55FB] hover:scale-105 transition-all cursor-pointer relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-[#6E55FB] text-white px-3 py-1 rounded-bl-xl text-xs font-bold">
                    ✓ Đã đạt
                  </div>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-lg">
                      💯
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                      Streak Master
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-3">
                      Đạt chuỗi 10 câu đúng liên tiếp trong một trận
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 md:p-3 mb-3 border border-green-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs md:text-sm font-semibold text-green-700">Hoàn thành</span>
                      <span className="text-xs md:text-sm font-bold text-green-700">10/10</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
                    <span className="bg-purple-100 text-[#6E55FB] px-3 py-1 rounded-full font-bold">+150 điểm</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">2 ngày trước</span>
                  </div>
                </div>
              </div>

              {/* Reward Summary Card */}
              <div className="mt-8 bg-gradient-to-br from-[#6E55FB] to-[#8b6fff] rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">🎁 Điểm thưởng & Token AI</h3>
                    <p className="text-sm md:text-base opacity-90 mb-4">
                      Tổng điểm đã kiếm được từ các thành tựu
                    </p>
                    <div className="flex items-center gap-4 md:gap-6">
                      <div>
                        <p className="text-xs md:text-sm opacity-75">Điểm thưởng</p>
                        <p className="text-3xl md:text-4xl font-black">850</p>
                      </div>
                      <div className="w-px h-12 bg-white opacity-30"></div>
                      <div>
                        <p className="text-xs md:text-sm opacity-75">Token AI</p>
                        <p className="text-3xl md:text-4xl font-black">8</p>
                      </div>
                    </div>
                  </div>
                  <button className="bg-white text-[#6E55FB] font-bold py-3 px-6 md:px-8 rounded-xl hover:bg-gray-100 transition-all shadow-lg text-sm md:text-base">
                    💎 Đổi quà ngay
                  </button>
                </div>
              </div>

              {/* Motivational Message */}
              <div className="mt-6 bg-purple-50 rounded-2xl p-4 md:p-6 border border-purple-100 text-center">
                <p className="text-sm md:text-base text-gray-700">
                  <span className="font-bold text-[#6E55FB]">💪 Tiếp tục phấn đấu!</span> Bạn còn{' '}
                  <span className="font-bold">8 thành tựu</span> đang chờ được mở khóa.
                </p>
              </div>
            </div>
          </div>

          {/* Results Preview */}
          <div className="animate-fade-slide animate-delay-800">
            <div className="text-center mb-6 md:mb-8 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">6️⃣ Kết quả chung cuộc</h2>
              <p className="text-sm md:text-base text-gray-600">Bục vinh quang và xếp hạng cuối cùng</p>
            </div>
            <div
              className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200 hover:scale-105 transition-all cursor-pointer"
              onClick={() => onNavigate('results')}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-2 md:mb-3">
                🏆 Kết quả chung cuộc
              </h3>
              <p className="text-lg md:text-xl text-green-600 text-center mb-6 md:mb-8">
                Chúc mừng! Bạn đã hoàn thành trận đấu!
              </p>

              {/* Podium */}
              <div className="flex items-end justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                {/* 2nd */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-gray-300 to-gray-400 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl mb-2">
                    🚀
                  </div>
                  <div className="bg-gradient-to-br from-gray-300 to-gray-500 w-20 md:w-24 h-28 md:h-32 rounded-t-2xl flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-gray-800">2</span>
                    <span className="text-white text-xs md:text-sm">400</span>
                  </div>
                </div>

                {/* 1st */}
                <div className="flex flex-col items-center -mt-4 md:-mt-6">
                  <span className="text-3xl md:text-4xl mb-2">👑</span>
                  <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl mb-2">
                    🎯
                  </div>
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-24 md:w-28 h-36 md:h-44 rounded-t-2xl flex flex-col items-center justify-center">
                    <span className="text-3xl md:text-4xl font-bold text-yellow-900">1</span>
                    <span className="text-yellow-900 font-bold text-base md:text-lg">500</span>
                  </div>
                </div>

                {/* 3rd */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl mb-2">
                    ⭐
                  </div>
                  <div className="bg-gradient-to-br from-orange-400 to-orange-700 w-20 md:w-24 h-20 md:h-24 rounded-t-2xl flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-orange-900">3</span>
                    <span className="text-white text-xs md:text-sm">300</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <button
                  className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white font-bold py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base"
                  disabled
                >
                  🔄 Chơi lại
                </button>
                <button
                  className="bg-gray-50 text-gray-900 font-bold py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-300 text-sm md:text-base"
                  disabled
                >
                  🚪 Thoát
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 md:mt-16 pb-6 md:pb-8">
          <p className="text-gray-500 text-xs md:text-sm px-4">Thiết kế bởi Tailwind CSS • Màu chủ đạo: #6E55FB</p>
        </div>
      </div>
    </div>
  )
}
