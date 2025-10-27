import type { Exam } from '../../types'

interface ExamCardProps {
  exam: Exam
  onSelectExam: (exam: Exam) => void
  onRetakeExam: (exam: Exam) => void
  onViewResult: (exam: Exam) => void
}

export default function ExamCard({ exam, onSelectExam, onRetakeExam, onViewResult }: ExamCardProps) {
  // Mapping exam types to Vietnamese labels
  const examTypeLabels: Record<string, string> = {
    '15min': 'Kiểm tra 15 phút',
    '45min': 'Kiểm tra 45 phút',
    'midterm': 'Kiểm tra giữa kỳ',
    'final': 'Kiểm tra cuối kỳ',
  }

  return (
    <div className={`border-2 border-gray-200 rounded-3xl p-6 hover:border-[#6E55FB] hover:shadow-2xl transition-all hover:scale-105 relative overflow-hidden group ${
      exam.completed ? 'bg-gray-50 opacity-80' : 'bg-white'
    }`}>
      {/* Badge AI */}
      {exam.type === 'ai' && (
        <div className="absolute top-4 right-4">
          <div className="bg-[#6E55FB] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI
          </div>
        </div>
      )}

      {/* Icon môn học */}
      <div className="w-16 h-16 bg-gradient-to-br from-[#6E55FB] to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Loại kiểm tra - nhỏ, phía trên */}
      <div className="mb-2">
        <span className="inline-block bg-purple-100 text-[#6E55FB] px-3 py-1 rounded-full text-sm font-semibold">
          {examTypeLabels[exam.examType] || exam.examType}
        </span>
      </div>

      {/* Tên bài kiểm tra - phần chính */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{exam.name}</h3>
      
      <div className="space-y-2 text-lg text-gray-600 mb-4">
        <p className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="font-semibold">Chương:</span> {exam.chapter}
        </p>
        <p className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">Thời gian:</span> {exam.duration} phút
        </p>
        <p className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">Số câu:</span> {exam.questionCount} câu
        </p>
        {exam.completed && exam.score !== undefined && (
          <p className="flex items-center gap-2 text-green-600 font-bold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span>Điểm:</span> {exam.score}/{exam.questionCount * 2}
          </p>
        )}
        {exam.completed && exam.completedAt && (
          <p className="flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Hoàn thành: {exam.completedAt}
          </p>
        )}
      </div>

      {/* Nút hành động */}
      {exam.completed ? (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onRetakeExam(exam)}
            className="bg-[#6E55FB] text-white text-center py-3 rounded-xl font-bold text-base hover:bg-[#5d47d4] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Làm lại
          </button>
          <button
            onClick={() => onViewResult(exam)}
            className="bg-gray-600 text-white text-center py-3 rounded-xl font-bold text-base hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Xem chi tiết
          </button>
        </div>
      ) : (
        <button
          onClick={() => onSelectExam(exam)}
          className="w-full bg-[#6E55FB] text-white text-center py-3 rounded-xl font-bold text-lg group-hover:bg-[#5d47d4] transition-colors flex items-center justify-center gap-2"
        >
          Bắt đầu làm bài
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      )}
    </div>
  )
}
