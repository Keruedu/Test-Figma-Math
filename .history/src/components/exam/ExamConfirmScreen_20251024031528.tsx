import type { Exam } from '../../types'

interface ExamConfirmScreenProps {
  exam: Exam
  onStartExam: () => void
  onBack: () => void
}

export default function ExamConfirmScreen({ exam, onStartExam, onBack }: ExamConfirmScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full bg-white rounded-3xl shadow-2xl p-10">
        <div className="text-center">
          {/* Icon */}
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#6E55FB] to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Tiêu đề */}
          <h1 className="text-5xl font-bold text-[#6E55FB] mb-6">Xác nhận làm bài</h1>

          {/* Thông tin bài kiểm tra */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 mb-8 text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{exam.name}</h2>
            
            <div className="space-y-4 text-xl text-gray-700">
              <div className="flex items-center gap-3">
                <svg className="w-7 h-7 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span><strong>Chương:</strong> {exam.chapter}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="w-7 h-7 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Thời gian:</strong> {exam.duration} phút</span>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-7 h-7 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Số câu:</strong> {exam.questionCount} câu</span>
              </div>
            </div>
          </div>

          {/* Lưu ý */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8 text-left flex gap-3">
            <svg className="w-8 h-8 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lưu ý quan trọng:</h3>
              <ul className="text-lg text-gray-700 space-y-1 list-disc ml-5">
                <li>Đọc kỹ đề bài trước khi trả lời</li>
                <li>Thời gian làm bài sẽ đếm ngược khi bắt đầu</li>
                <li>Bài làm sẽ tự động nộp khi hết giờ</li>
                <li>Không thể quay lại sau khi nộp bài</li>
              </ul>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={onStartExam}
              className="w-full py-5 bg-[#6E55FB] text-white text-2xl font-bold rounded-2xl hover:bg-[#5d47d4] transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Bắt đầu làm bài
            </button>
            
            <button
              onClick={onBack}
              className="w-full py-5 bg-white text-[#6E55FB] border-2 border-[#6E55FB] text-2xl font-bold rounded-2xl hover:bg-purple-50 transition-all hover:scale-105 flex items-center justify-center gap-3"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
