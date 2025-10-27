import type { Exam, ExamQuestion } from '../../types'

interface ExamTestScreenProps {
  exam: Exam
  questions: ExamQuestion[]
  currentQuestionIndex: number
  answers: number[]
  timeRemaining: number
  onAnswerSelect: (index: number) => void
  onNextQuestion: () => void
  onPreviousQuestion: () => void
  onSubmit: () => void
  onQuestionNavigate: (index: number) => void
}

export default function ExamTestScreen({
  exam,
  questions,
  currentQuestionIndex,
  answers,
  timeRemaining,
  onAnswerSelect,
  onNextQuestion,
  onPreviousQuestion,
  onSubmit,
  onQuestionNavigate,
}: ExamTestScreenProps) {
  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const answeredCount = answers.filter(a => a !== -1).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-6 px-4">
      <div className="mx-auto">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-200">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{exam.name}</h1>
                  <p className="text-xl text-gray-600">
                    Câu {currentQuestionIndex + 1} / {questions.length}
                  </p>
                </div>
                
                <div className={`px-6 py-4 rounded-2xl font-bold text-2xl ${
                  timeRemaining < 60 ? 'bg-red-100 text-red-600' : 'bg-[#6E55FB] text-white'
                }`}>
                  <div className="flex items-center gap-2">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6E55FB] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {currentQuestionIndex + 1}
                    </div>
                    <p className="text-2xl font-bold text-gray-900 flex-1">
                      {currentQuestion.question}
                    </p>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="grid gap-4 mb-8">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = answers[currentQuestionIndex] === index
                  const optionLabels = ['A', 'B', 'C', 'D']

                  return (
                    <button
                      key={index}
                      onClick={() => onAnswerSelect(index)}
                      className={`w-full p-5 rounded-2xl text-xl font-bold text-left transition-all hover:scale-102 border-2 ${
                        isSelected
                          ? 'bg-[#6E55FB] text-white border-[#6E55FB] shadow-xl scale-102'
                          : 'bg-white text-gray-900 border-gray-300 hover:border-[#6E55FB] hover:shadow-lg'
                      }`}
                    >
                      <span className={`inline-block w-10 h-10 rounded-full text-center leading-[2.5rem] mr-4 ${
                        isSelected ? 'bg-white text-[#6E55FB]' : 'bg-[#6E55FB] text-white'
                      }`}>
                        {optionLabels[index]}
                      </span>
                      {option}
                    </button>
                  )
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={onPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-8 py-4 text-xl font-bold rounded-2xl transition-all flex items-center gap-2 ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-white text-[#6E55FB] border-2 border-[#6E55FB] hover:bg-purple-50 hover:scale-105'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Câu trước
                </button>

                {!isLastQuestion ? (
                  <button
                    onClick={onNextQuestion}
                    className="flex-1 py-4 text-xl font-bold rounded-2xl transition-all bg-[#6E55FB] text-white hover:bg-[#5d47d4] hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    Câu tiếp theo
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={onSubmit}
                    className="flex-1 py-4 text-xl font-bold rounded-2xl transition-all bg-green-500 text-white hover:bg-green-600 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Nộp bài
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Question Palette */}
          <div className="w-80 bg-white rounded-3xl shadow-2xl p-6 sticky top-6 h-fit">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Bảng câu hỏi
            </h3>

            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
              <p className="text-lg font-bold text-gray-900 mb-2">Tiến độ</p>
              <p className="text-3xl font-bold text-[#6E55FB]">
                {answeredCount}/{questions.length}
              </p>
              <p className="text-sm text-gray-600 mt-1">câu đã trả lời</p>
            </div>

            {/* Question Grid */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {questions.map((_, index) => {
                const isAnswered = answers[index] !== -1
                const isCurrent = index === currentQuestionIndex

                return (
                  <button
                    key={index}
                    onClick={() => onQuestionNavigate(index)}
                    className={`w-12 h-12 rounded-lg font-bold text-lg transition-all ${
                      isCurrent
                        ? 'bg-[#6E55FB] text-white ring-4 ring-[#6E55FB]/30 scale-110'
                        : isAnswered
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 text-sm mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#6E55FB] rounded"></div>
                <span>Câu hiện tại</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 rounded"></div>
                <span>Đã trả lời</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-100 rounded"></div>
                <span>Chưa trả lời</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={onSubmit}
              className="w-full py-4 text-lg font-bold rounded-2xl transition-all bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Nộp bài
            </button>

            {answeredCount < questions.length && (
              <p className="text-center text-sm text-orange-600 font-bold mt-3">
                ⚠️ Còn {questions.length - answeredCount} câu chưa trả lời
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
