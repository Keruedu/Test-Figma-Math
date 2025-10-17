import { GameHeader } from './GameHeader'
import { StreakBadge } from './StreakBadge'

interface Answer {
  label: string
  value: string
  isCorrect: boolean
}

interface QuestionType {
  id: number
  number: number
  type: string
  title: string
  timer: string
  timerColor: string
  streak: number
  score: number
  answerType: 'multiple-choice' | 'text-input' | 'true-false' | 'matching' | 'ordering'
  answers?: Answer[]
  isStreakHot?: boolean
}

interface QuestionPreviewProps {
  questions: QuestionType[]
  onQuestionClick: (questionId: number) => void
}

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
const MultipleChoiceAnswers = ({ answers }: { answers: Answer[] }) => (
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

export const QuestionPreview = ({ questions, onQuestionClick }: QuestionPreviewProps) => {
  return (
    <div className="animate-fade-slide animate-delay-400">
      <div className="text-center mb-6 md:mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">2️⃣ Các dạng câu hỏi</h2>
        <p className="text-sm md:text-base text-gray-600">5 loại câu hỏi đa dạng và hấp dẫn với timer và streak</p>
      </div>
      <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-gray-200 shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
            onClick={() => onQuestionClick(question.id)}
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
  )
}
