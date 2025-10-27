import { Exam } from '../../types'
import FilterBar from './FilterBar'
import ExamCard from './ExamCard'

interface ExamListScreenProps {
  filteredExams: Exam[]
  selectedTab: 'system' | 'ai'
  setSelectedTab: (tab: 'system' | 'ai') => void
  setFilteredExams: (exams: Exam[]) => void
  mockExams: Exam[]
  filterGrade: string
  setFilterGrade: (value: string) => void
  filterChapter: string
  setFilterChapter: (value: string) => void
  filterLesson: string
  setFilterLesson: (value: string) => void
  filterExamType: string
  setFilterExamType: (value: string) => void
  filterStatus: 'all' | 'completed' | 'notCompleted'
  setFilterStatus: (value: 'all' | 'completed' | 'notCompleted') => void
  onSelectExam: (exam: Exam) => void
  onRetakeExam: (exam: Exam) => void
  onViewResult: (exam: Exam) => void
}

export default function ExamListScreen({
  filteredExams,
  selectedTab,
  setSelectedTab,
  setFilteredExams,
  mockExams,
  filterGrade,
  setFilterGrade,
  filterChapter,
  setFilterChapter,
  filterLesson,
  setFilterLesson,
  filterExamType,
  setFilterExamType,
  filterStatus,
  setFilterStatus,
  onSelectExam,
  onRetakeExam,
  onViewResult,
}: ExamListScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#6E55FB] to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-4">
            <svg className="w-16 h-16 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Kiểm tra Toán học
          </h1>
          <p className="text-2xl text-gray-600 font-semibold">Chọn bài kiểm tra phù hợp với con</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Bộ lọc
          </h2>

          <FilterBar
            filterGrade={filterGrade}
            setFilterGrade={setFilterGrade}
            filterChapter={filterChapter}
            setFilterChapter={setFilterChapter}
            filterLesson={filterLesson}
            setFilterLesson={setFilterLesson}
            filterExamType={filterExamType}
            setFilterExamType={setFilterExamType}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </div>

        {/* Exam List */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <svg className="w-8 h-8 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Danh sách bài kiểm tra
          </h2>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex gap-4 bg-gray-100 rounded-2xl p-2 inline-flex">
              <button
                onClick={() => {
                  setSelectedTab('system')
                  setFilteredExams(mockExams.filter(e => e.type === 'system'))
                }}
                className={`px-8 py-4 text-xl font-bold rounded-xl transition-all flex items-center gap-2 ${
                  selectedTab === 'system'
                    ? 'bg-[#6E55FB] text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Bài kiểm tra Hệ thống
              </button>
              <button
                onClick={() => {
                  setSelectedTab('ai')
                  setFilteredExams(mockExams.filter(e => e.type === 'ai'))
                }}
                className={`px-8 py-4 text-xl font-bold rounded-xl transition-all flex items-center gap-2 ${
                  selectedTab === 'ai'
                    ? 'bg-[#6E55FB] text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Bài kiểm tra AI
              </button>
            </div>
          </div>

          {/* Danh sách bài kiểm tra */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.filter(exam => exam.type === selectedTab).map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onSelectExam={onSelectExam}
                onRetakeExam={onRetakeExam}
                onViewResult={onViewResult}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
