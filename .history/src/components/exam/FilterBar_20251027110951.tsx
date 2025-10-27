interface FilterBarProps {
  filterChapter: string
  setFilterChapter: (value: string) => void
  filterLesson: string
  setFilterLesson: (value: string) => void
  filterExamType: string
  setFilterExamType: (value: string) => void
  filterStatus: 'all' | 'completed' | 'notCompleted'
  setFilterStatus: (value: 'all' | 'completed' | 'notCompleted') => void
}

export default function FilterBar({
  filterChapter,
  setFilterChapter,
  filterLesson,
  setFilterLesson,
  filterExamType,
  setFilterExamType,
  filterStatus,
  setFilterStatus,
}: FilterBarProps) {
  return (
    <div className="grid md:grid-cols-4 gap-5 mb-6">
      <div>
        <label className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-3">
          <svg className="w-5 h-5 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Chọn Chương
        </label>
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
        <label className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-3">
          <svg className="w-5 h-5 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Chọn Bài
        </label>
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

      <div>
        <label className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-3">
          <svg className="w-5 h-5 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Loại kiểm tra
        </label>
        <select 
          value={filterExamType}
          onChange={(e) => setFilterExamType(e.target.value)}
          className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#6E55FB]/30 focus:border-[#6E55FB] bg-white"
        >
          <option value="">Tất cả</option>
          <option value="15min">15 phút</option>
          <option value="45min">45 phút</option>
          <option value="midterm">Giữa kỳ</option>
          <option value="final">Cuối kỳ</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-3">
          <svg className="w-5 h-5 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Trạng thái
        </label>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'notCompleted')}
          className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#6E55FB]/30 focus:border-[#6E55FB] bg-white"
        >
          <option value="all">Tất cả</option>
          <option value="notCompleted">Chưa làm</option>
          <option value="completed">Đã làm</option>
        </select>
      </div>
    </div>
  )
}
