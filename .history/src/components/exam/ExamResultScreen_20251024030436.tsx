interface ExamResultScreenProps {
  score: number
  total: number
  onBackToList: () => void
  onRetake: () => void
}

export default function ExamResultScreen({ score, total, onBackToList, onRetake }: ExamResultScreenProps) {
  const percentage = Math.round((score / total) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10">
        <div className="text-center">
          {/* Icon kết quả */}
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#6E55FB] to-purple-600 rounded-full flex items-center justify-center">
            {percentage >= 80 ? (
              <svg className="w-20 h-20 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ) : percentage >= 50 ? (
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            ) : (
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            )}
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
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8 flex items-start gap-3">
            <svg className="w-8 h-8 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {percentage >= 80 ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              ) : percentage >= 50 ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              )}
            </svg>
            <p className="text-xl text-gray-700">
              {percentage >= 80 
                ? 'Con làm bài rất xuất sắc! Tiếp tục phát huy nhé!'
                : percentage >= 50
                ? 'Kết quả tốt! Hãy luyện tập thêm để đạt điểm cao hơn!'
                : 'Đừng nản chí! Hãy ôn bài kỹ hơn và thử lại nhé!'}
            </p>
          </div>

          {/* Các nút */}
          <div className="space-y-4">
            <button
              onClick={onBackToList}
              className="w-full py-5 bg-[#6E55FB] text-white text-2xl font-bold rounded-2xl hover:bg-[#5d47d4] transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Về trang chọn bài
            </button>
            
            <button
              onClick={onRetake}
              className="w-full py-5 bg-white text-[#6E55FB] border-2 border-[#6E55FB] text-2xl font-bold rounded-2xl hover:bg-purple-50 transition-all hover:scale-105 flex items-center justify-center gap-3"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Làm lại bài này
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
