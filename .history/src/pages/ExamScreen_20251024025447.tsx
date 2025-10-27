import { useState, useEffect } from 'react'

interface Exam {
  id: number
  name: string
  type: 'system' | 'ai'
  subject: string
  chapter: string
  lesson: string
  duration: number
  questionCount: number
  grade: string
  examType: '15min' | '45min' | 'midterm' | 'final' | 'practice' | 'review'
  completed?: boolean
  score?: number
  completedAt?: string
}

interface ExamResult {
  examId: number
  score: number
  total: number
  answers: { [key: number]: number }
  completedAt: string
}

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const mockExams: Exam[] = [
  // Bài kiểm tra Hệ thống - Toán
  { id: 1, name: 'Kiểm tra 15 phút', type: 'system', subject: 'Toán', chapter: 'Chương 1', lesson: 'Bài 1', duration: 15, questionCount: 10, grade: 'Lớp 3', examType: '15min' },
  { id: 2, name: 'Kiểm tra 45 phút', type: 'system', subject: 'Toán', chapter: 'Chương 2', lesson: 'Bài 2', duration: 45, questionCount: 20, grade: 'Lớp 3', examType: '45min' },
  { id: 3, name: 'Kiểm tra Giữa kỳ', type: 'system', subject: 'Toán', chapter: 'Học kỳ 1', lesson: 'Tổng hợp', duration: 60, questionCount: 25, grade: 'Lớp 3', examType: 'midterm' },
  { id: 4, name: 'Kiểm tra Cuối kỳ', type: 'system', subject: 'Toán', chapter: 'Học kỳ 1', lesson: 'Tổng hợp', duration: 90, questionCount: 30, grade: 'Lớp 3', examType: 'final' },
  
  // Bài kiểm tra AI - Toán
  { id: 5, name: 'Bài luyện tập nhanh (AI)', type: 'ai', subject: 'Toán', chapter: 'Chương 1', lesson: 'Bài 1', duration: 20, questionCount: 15, grade: 'Lớp 3', examType: 'practice' },
  { id: 6, name: 'Tổng hợp kiến thức (AI)', type: 'ai', subject: 'Toán', chapter: 'Chương 1', lesson: 'Tổng hợp', duration: 30, questionCount: 20, grade: 'Lớp 3', examType: 'review' },
  { id: 7, name: 'Ôn tập Số học (AI)', type: 'ai', subject: 'Toán', chapter: 'Chương 2', lesson: 'Bài 3', duration: 25, questionCount: 12, grade: 'Lớp 3', examType: 'practice' }
]

const mockQuestions: Question[] = [
  { id: 1, question: '5 + 3 = ?', options: ['6', '7', '8', '9'], correctAnswer: 2 },
  { id: 2, question: '10 - 4 = ?', options: ['5', '6', '7', '8'], correctAnswer: 1 },
  { id: 3, question: '3 × 2 = ?', options: ['4', '5', '6', '7'], correctAnswer: 2 },
  { id: 4, question: '12 ÷ 3 = ?', options: ['3', '4', '5', '6'], correctAnswer: 1 },
  { id: 5, question: '7 + 8 = ?', options: ['13', '14', '15', '16'], correctAnswer: 2 },
  { id: 6, question: '20 - 9 = ?', options: ['9', '10', '11', '12'], correctAnswer: 2 },
  { id: 7, question: '4 × 5 = ?', options: ['15', '18', '20', '25'], correctAnswer: 2 },
  { id: 8, question: '16 ÷ 4 = ?', options: ['3', '4', '5', '6'], correctAnswer: 1 },
  { id: 9, question: '9 + 6 = ?', options: ['13', '14', '15', '16'], correctAnswer: 2 },
  { id: 10, question: '25 - 7 = ?', options: ['16', '17', '18', '19'], correctAnswer: 2 }
]

type ScreenType = 'list' | 'confirm' | 'exam' | 'result'

export const ExamScreen = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('list')
  const [selectedTab, setSelectedTab] = useState<'system' | 'ai'>('system')
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  
  // Bộ lọc
  const [filterGrade, setFilterGrade] = useState('')
  const [filterChapter, setFilterChapter] = useState('')
  const [filterLesson, setFilterLesson] = useState('')
  const [filteredExams, setFilteredExams] = useState<Exam[]>(mockExams)

  // Đếm ngược thời gian
  useEffect(() => {
    if (currentScreen === 'exam' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmitExam()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentScreen, timeRemaining])

  const handleFilter = () => {
    let filtered = mockExams.filter(exam => exam.type === selectedTab)
    
    if (filterGrade) filtered = filtered.filter(e => e.grade === filterGrade)
    if (filterChapter) filtered = filtered.filter(e => e.chapter === filterChapter)
    if (filterLesson) filtered = filtered.filter(e => e.lesson === filterLesson)
    
    setFilteredExams(filtered)
  }

  const handleSelectExam = (exam: Exam) => {
    setSelectedExam(exam)
    setCurrentScreen('confirm')
  }

  const handleStartExam = () => {
    if (selectedExam) {
      setTimeRemaining(selectedExam.duration * 60)
      setCurrentQuestionIndex(0)
      setAnswers({})
      setCurrentScreen('exam')
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers({ ...answers, [currentQuestionIndex]: answerIndex })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleSubmitExam = () => {
    setCurrentScreen('result')
  }

  const calculateScore = () => {
    let correct = 0
    Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
      if (mockQuestions[parseInt(questionIndex)].correctAnswer === answerIndex) {
        correct++
      }
    })
    return correct
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Màn hình 1: Danh sách bài kiểm tra
  if (currentScreen === 'list') {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto px-4 py-8">
          {/* Tiêu đề */}
          <h1 className="text-5xl font-bold text-[#6E55FB] text-center mb-10 flex items-center justify-center gap-4">
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Danh sách Bài kiểm tra
          </h1>

          {/* Bộ lọc */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 mb-10 border-2 border-[#6E55FB]/20">
            <h2 className="text-2xl font-bold text-[#6E55FB] mb-6 flex items-center gap-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Tìm kiếm bài kiểm tra
            </h2>
            
            <div className="grid md:grid-cols-3 gap-5 mb-6">
              <div>
                <label className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-3">
                  <svg className="w-5 h-5 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Chọn Lớp
                </label>
                <select 
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#6E55FB]/30 focus:border-[#6E55FB] bg-white"
                >
                  <option value="">Tất cả</option>
                  <option value="Lớp 1">Lớp 1</option>
                  <option value="Lớp 2">Lớp 2</option>
                  <option value="Lớp 3">Lớp 3</option>
                  <option value="Lớp 4">Lớp 4</option>
                  <option value="Lớp 5">Lớp 5</option>
                </select>
              </div>

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
            </div>

            <button
              onClick={handleFilter}
              className="w-full md:w-auto px-10 py-4 bg-[#6E55FB] text-white text-xl font-bold rounded-2xl hover:bg-[#5d47d4] transition-all hover:scale-105 flex items-center justify-center gap-3 mx-auto shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Tìm kiếm
            </button>
          </div>

          {/* Tab chọn loại bài kiểm tra */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-2xl p-2 shadow-inner">
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
              <div
                key={exam.id}
                onClick={() => handleSelectExam(exam)}
                className="bg-white border-2 border-gray-200 rounded-3xl p-6 hover:border-[#6E55FB] hover:shadow-2xl transition-all cursor-pointer hover:scale-105 relative overflow-hidden group"
              >
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
                </div>

                <div className="bg-[#6E55FB] text-white text-center py-3 rounded-xl font-bold text-lg group-hover:bg-[#5d47d4] transition-colors flex items-center justify-center gap-2">
                  Bắt đầu làm bài
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Màn hình 2: Xác nhận
  if (currentScreen === 'confirm' && selectedExam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10">
          <div className="text-center">
            {/* Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-[#6E55FB] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Tên bài kiểm tra */}
            <h1 className="text-4xl font-bold text-[#6E55FB] mb-6">
              {selectedExam.name}
            </h1>

            {/* Thông tin */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 text-lg mb-1">
                    <svg className="w-6 h-6 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Thời gian
                  </div>
                  <p className="text-3xl font-bold text-[#6E55FB]">{selectedExam.duration} phút</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 text-lg mb-1">
                    <svg className="w-6 h-6 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Số câu hỏi
                  </div>
                  <p className="text-3xl font-bold text-[#6E55FB]">{selectedExam.questionCount} câu</p>
                </div>
              </div>
            </div>

            {/* Hướng dẫn */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8 flex items-start gap-3">
              <svg className="w-8 h-8 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-2xl text-gray-700 font-semibold">
                Con hãy đọc kỹ câu hỏi và chọn đáp án đúng nhé!
              </p>
            </div>

            {/* Nút bắt đầu */}
            <button
              onClick={handleStartExam}
              className="w-full py-5 bg-[#6E55FB] text-white text-2xl font-bold rounded-2xl hover:bg-[#5d47d4] transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Bắt đầu làm bài
            </button>

            <button
              onClick={() => setCurrentScreen('list')}
              className="w-full mt-4 py-4 bg-white text-[#6E55FB] border-2 border-[#6E55FB] text-xl font-bold rounded-2xl hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Màn hình 3: Làm bài
  if (currentScreen === 'exam' && selectedExam) {
    const currentQuestion = mockQuestions[currentQuestionIndex]
    const isLastQuestion = currentQuestionIndex === mockQuestions.length - 1

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-[#6E55FB] text-white py-6 px-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold flex items-center gap-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Câu {currentQuestionIndex + 1}/{mockQuestions.length}
            </div>
            <div className="text-2xl font-bold flex items-center gap-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Thời gian còn lại: <span className="text-yellow-300">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-gray-200 h-3">
          <div 
            className="bg-[#6E55FB] h-3 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / mockQuestions.length) * 100}%` }}
          />
        </div>

        {/* Nội dung chính */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Cột trái: Bảng câu hỏi */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-5 sticky top-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Danh sách câu hỏi
                </h3>
                
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {mockQuestions.map((_, index) => {
                    const isAnswered = answers[index] !== undefined
                    const isCurrent = index === currentQuestionIndex
                    
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={`aspect-square rounded-lg text-base font-bold transition-all hover:scale-110 border-2 ${
                          isCurrent
                            ? 'bg-[#6E55FB] text-white border-[#6E55FB] shadow-lg scale-110'
                            : isAnswered
                            ? 'bg-green-100 text-green-700 border-green-300 hover:border-green-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-[#6E55FB]'
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  })}
                </div>

                {/* Chú thích */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#6E55FB] rounded border-2 border-[#6E55FB]"></div>
                    <span className="text-gray-600">Câu hiện tại</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded border-2 border-green-300"></div>
                    <span className="text-gray-600">Đã trả lời</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white rounded border-2 border-gray-300"></div>
                    <span className="text-gray-600">Chưa trả lời</span>
                  </div>
                </div>

                {/* Thông tin tổng quan */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Đã làm:</span>
                      <span className="font-bold text-green-600">{Object.keys(answers).length}/{mockQuestions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Còn lại:</span>
                      <span className="font-bold text-orange-600">{mockQuestions.length - Object.keys(answers).length}</span>
                    </div>
                  </div>
                </div>

                {/* Nút nộp bài */}
                <button
                  onClick={handleSubmitExam}
                  className="w-full mt-4 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Nộp bài
                </button>
              </div>
            </div>

            {/* Cột phải: Câu hỏi và đáp án */}
            <div className="lg:col-span-3">
              {/* Câu hỏi */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-10 mb-8 border-2 border-[#6E55FB]/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#6E55FB] rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {currentQuestionIndex + 1}
                  </div>
                  <p className="text-3xl font-bold text-gray-900 flex-1">
                    {currentQuestion.question}
                  </p>
                </div>
              </div>

              {/* Các lựa chọn */}
              <div className="grid gap-4 mb-8">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = answers[currentQuestionIndex] === index
                  const optionLabels = ['A', 'B', 'C', 'D']

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
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

              {/* Nút điều hướng */}
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
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
                    onClick={handleNextQuestion}
                    className="flex-1 py-4 text-xl font-bold rounded-2xl transition-all bg-[#6E55FB] text-white hover:bg-[#5d47d4] hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    Câu tiếp theo
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitExam}
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
        </div>
      </div>
    )
  }

  // Màn hình 4: Kết quả
  if (currentScreen === 'result' && selectedExam) {
    const score = calculateScore()
    const total = mockQuestions.length
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
                onClick={() => {
                  setCurrentScreen('list')
                  setSelectedExam(null)
                }}
                className="w-full py-5 bg-[#6E55FB] text-white text-2xl font-bold rounded-2xl hover:bg-[#5d47d4] transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-3"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Về trang chọn bài
              </button>
              
              <button
                onClick={handleStartExam}
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

  return null
}
