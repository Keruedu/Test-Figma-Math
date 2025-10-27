import type { Exam, ExamQuestion, ExamResult } from '../../types'

interface ExamReviewScreenProps {
  exam: Exam
  result: ExamResult
  questions: ExamQuestion[]
  onBackToList: () => void
  onRetake: () => void
}

export default function ExamReviewScreen({ exam, result, questions, onBackToList, onRetake }: ExamReviewScreenProps) {
  const percentage = Math.round((result.score / (result.total * 2)) * 100)
  // Tính điểm thang 10: (số điểm / tổng điểm) × 10
  const score10Scale = ((result.score / (result.total * 2)) * 10).toFixed(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-[#6E55FB] flex items-center gap-3">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Chi tiết bài làm
            </h1>
            <button
              onClick={onBackToList}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Đóng
            </button>
          </div>

          {/* Thông tin bài kiểm tra */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{exam.name}</h2>
              <div className="space-y-2 text-lg text-gray-600">
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="font-semibold">Chương:</span> {exam.chapter}
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold">Hoàn thành lúc:</span> {result.completedAt}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#6E55FB] to-purple-600 rounded-2xl p-6 text-white">
              <p className="text-xl mb-2">Điểm của bạn</p>
              <p className="text-6xl font-bold mb-2">{score10Scale}</p>
              <p className="text-lg opacity-90 mb-2">
                ({result.score}/{result.total * 2} điểm - {percentage}%)
              </p>
              <p className="text-2xl">
                {percentage >= 80 ? '🌟 Xuất sắc!' : percentage >= 50 ? '👍 Tốt!' : '💪 Cố gắng!'}
              </p>
            </div>
          </div>
        </div>

        {/* Danh sách câu hỏi và đáp án */}
        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = result.answers[index]
            const isCorrect = userAnswer === question.correctAnswer
            const optionLabels = ['A', 'B', 'C', 'D']

            return (
              <div
                key={question.id}
                className={`bg-white rounded-3xl shadow-lg p-8 border-2 ${
                  isCorrect ? 'border-green-400' : 'border-red-400'
                }`}
              >
                {/* Header câu hỏi */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {isCorrect ? (
                        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Đúng (+2 điểm)
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Sai (0 điểm)
                        </div>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{question.question}</p>
                  </div>
                </div>

                {/* Các đáp án */}
                <div className="space-y-3 ml-16">
                  {question.options.map((option, optIndex) => {
                    const isUserAnswer = userAnswer === optIndex
                    const isCorrectAnswer = question.correctAnswer === optIndex

                    let bgColor = 'bg-gray-50 border-gray-300'
                    let textColor = 'text-gray-900'
                    
                    if (isCorrectAnswer) {
                      bgColor = 'bg-green-100 border-green-500'
                      textColor = 'text-green-900'
                    } else if (isUserAnswer && !isCorrect) {
                      bgColor = 'bg-red-100 border-red-500'
                      textColor = 'text-red-900'
                    }

                    return (
                      <div
                        key={optIndex}
                        className={`p-4 rounded-xl border-2 ${bgColor} ${textColor} flex items-center gap-3`}
                      >
                        <span className={`inline-block w-8 h-8 rounded-full text-center leading-[2rem] font-bold ${
                          isCorrectAnswer
                            ? 'bg-green-500 text-white'
                            : isUserAnswer && !isCorrect
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-300 text-gray-700'
                        }`}>
                          {optionLabels[optIndex]}
                        </span>
                        <span className="text-lg flex-1">{option}</span>
                        {isCorrectAnswer && (
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {isUserAnswer && !isCorrect && (
                          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Action buttons */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <button
            onClick={onBackToList}
            className="py-5 bg-white text-[#6E55FB] border-2 border-[#6E55FB] text-2xl font-bold rounded-2xl hover:bg-purple-50 transition-all hover:scale-105 flex items-center justify-center gap-3"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Về trang chọn bài
          </button>
          
          <button
            onClick={onRetake}
            className="py-5 bg-[#6E55FB] text-white text-2xl font-bold rounded-2xl hover:bg-[#5d47d4] transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-3"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Làm lại bài này
          </button>
        </div>
      </div>
    </div>
  )
}
