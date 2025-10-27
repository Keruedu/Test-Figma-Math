import { useState, useEffect } from 'react'
import type { Exam, ExamQuestion, ExamResult } from '../types'
import ExamListScreen from '../components/exam/ExamListScreen'
import ExamConfirmScreen from '../components/exam/ExamConfirmScreen'
import ExamTestScreen from '../components/exam/ExamTestScreen'
import ExamResultScreen from '../components/exam/ExamResultScreen'
import ExamReviewScreen from '../components/exam/ExamReviewScreen'

type ScreenType = 'list' | 'confirm' | 'exam' | 'result' | 'reviewResult'

const mockExams: Exam[] = [
  // Bài kiểm tra Hệ thống - Toán
  { id: 1, name: 'Kiểm tra 15 phút', type: 'system', subject: 'Toán', chapter: 'Chương 1', lesson: 'Bài 1', duration: 15, questionCount: 10, grade: 'Lớp 3', examType: '15min', completed: true, score: 8, completedAt: '2025-10-20 14:30' },
  { id: 2, name: 'Kiểm tra 45 phút', type: 'system', subject: 'Toán', chapter: 'Chương 2', lesson: 'Bài 2', duration: 45, questionCount: 20, grade: 'Lớp 3', examType: '45min', completed: true, score: 15, completedAt: '2025-10-22 10:15' },
  { id: 3, name: 'Kiểm tra Giữa kỳ', type: 'system', subject: 'Toán', chapter: 'Học kỳ 1', lesson: 'Tổng hợp', duration: 60, questionCount: 25, grade: 'Lớp 3', examType: 'midterm', completed: false },
  { id: 4, name: 'Kiểm tra Cuối kỳ', type: 'system', subject: 'Toán', chapter: 'Học kỳ 1', lesson: 'Tổng hợp', duration: 90, questionCount: 30, grade: 'Lớp 3', examType: 'final', completed: false },
  
  // Bài kiểm tra AI - Toán
  { id: 5, name: 'Bài luyện tập nhanh (AI)', type: 'ai', subject: 'Toán', chapter: 'Chương 1', lesson: 'Bài 1', duration: 20, questionCount: 15, grade: 'Lớp 3', examType: '15min', completed: false },
  { id: 6, name: 'Tổng hợp kiến thức (AI)', type: 'ai', subject: 'Toán', chapter: 'Chương 1', lesson: 'Tổng hợp', duration: 30, questionCount: 20, grade: 'Lớp 3', examType: '45min', completed: false },
  { id: 7, name: 'Ôn tập Số học (AI)', type: 'ai', subject: 'Toán', chapter: 'Chương 2', lesson: 'Bài 3', duration: 25, questionCount: 12, grade: 'Lớp 3', examType: '15min', completed: false }
]

const mockQuestions: ExamQuestion[] = [
  { id: 1, question: '5 + 3 = ?', options: ['6', '7', '8', '9'], correctAnswer: 2 },
  { id: 2, question: '10 - 4 = ?', options: ['5', '6', '7', '8'], correctAnswer: 1 },
  { id: 3, question: '3 × 2 = ?', options: ['4', '5', '6', '7'], correctAnswer: 2 },
  { id: 4, question: '12 ÷ 3 = ?', options: ['3', '4', '5', '6'], correctAnswer: 1 },
  { id: 5, question: '7 + 8 = ?', options: ['13', '14', '15', '16'], correctAnswer: 2 },
  { id: 6, question: '20 - 9 = ?', options: ['9', '10', '11', '12'], correctAnswer: 2 },
  { id: 7, question: '4 × 5 = ?', options: ['18', '19', '20', '21'], correctAnswer: 2 },
  { id: 8, question: '18 ÷ 2 = ?', options: ['7', '8', '9', '10'], correctAnswer: 2 },
  { id: 9, question: '6 + 9 = ?', options: ['13', '14', '15', '16'], correctAnswer: 2 },
  { id: 10, question: '15 - 7 = ?', options: ['6', '7', '8', '9'], correctAnswer: 2 },
]

export default function ExamScreen() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('list')
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [selectedTab, setSelectedTab] = useState<'system' | 'ai'>('system')
  const [filteredExams, setFilteredExams] = useState<Exam[]>(mockExams.filter(e => e.type === 'system'))
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(mockQuestions.length).fill(-1))
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [examResults, setExamResults] = useState<{ [examId: number]: ExamResult }>({})
  const [viewingResult, setViewingResult] = useState<ExamResult | null>(null)

  // Filter states
  const [filterGrade, setFilterGrade] = useState('')
  const [filterChapter, setFilterChapter] = useState('')
  const [filterLesson, setFilterLesson] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'notCompleted'>('all')
  const [filterExamType, setFilterExamType] = useState('')

  // Apply filters whenever filter states change
  useEffect(() => {
    handleFilter()
  }, [selectedTab, filterGrade, filterChapter, filterLesson, filterStatus, filterExamType])

  const handleFilter = () => {
    let filtered = mockExams.filter(exam => exam.type === selectedTab)

    if (filterGrade) {
      filtered = filtered.filter(exam => exam.grade === filterGrade)
    }
    if (filterChapter) {
      filtered = filtered.filter(exam => exam.chapter === filterChapter)
    }
    if (filterLesson) {
      filtered = filtered.filter(exam => exam.lesson === filterLesson)
    }
    if (filterStatus !== 'all') {
      if (filterStatus === 'completed') {
        filtered = filtered.filter(exam => exam.completed)
      } else {
        filtered = filtered.filter(exam => !exam.completed)
      }
    }
    if (filterExamType) {
      filtered = filtered.filter(exam => exam.examType === filterExamType)
    }

    // Sort: completed exams to bottom
    filtered.sort((a, b) => {
      if (a.completed === b.completed) return 0
      return a.completed ? 1 : -1
    })

    setFilteredExams(filtered)
  }

  const handleSelectExam = (exam: Exam) => {
    setSelectedExam(exam)
    setCurrentScreen('confirm')
  }

  const handleStartExam = () => {
    if (selectedExam) {
      setCurrentScreen('exam')
      setTimeRemaining(selectedExam.duration * 60)
      setCurrentQuestionIndex(0)
      setAnswers(Array(mockQuestions.length).fill(-1))
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleQuestionNavigate = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  const calculateScore = () => {
    let score = 0
    answers.forEach((answer, index) => {
      if (answer === mockQuestions[index].correctAnswer) {
        score += 2
      }
    })
    return score
  }

  const handleSubmitExam = () => {
    if (!selectedExam) return

    const score = calculateScore()
    const now = new Date()
    const completedAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    const result: ExamResult = {
      examId: selectedExam.id,
      score,
      total: mockQuestions.length,
      answers: [...answers],
      completedAt,
    }

    // Save result
    setExamResults(prev => ({ ...prev, [selectedExam.id]: result }))

    // Update exam status
    const examIndex = mockExams.findIndex(e => e.id === selectedExam.id)
    if (examIndex !== -1) {
      mockExams[examIndex].completed = true
      mockExams[examIndex].score = score
      mockExams[examIndex].completedAt = completedAt
    }

    setCurrentScreen('result')
  }

  const handleViewResult = (exam: Exam) => {
    const result = examResults[exam.id]
    if (result) {
      setSelectedExam(exam)
      setViewingResult(result)
      setCurrentScreen('reviewResult')
    }
  }

  const handleRetakeExam = (exam: Exam) => {
    setSelectedExam(exam)
    setCurrentScreen('confirm')
  }

  const handleBackToList = () => {
    setCurrentScreen('list')
    setSelectedExam(null)
    setViewingResult(null)
    setAnswers(Array(mockQuestions.length).fill(-1))
  }

  // Timer effect
  useEffect(() => {
    if (currentScreen === 'exam' && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (currentScreen === 'exam' && timeRemaining === 0 && selectedExam) {
      // Auto submit when time's up
      const score = calculateScore()
      const now = new Date()
      const completedAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

      const result: ExamResult = {
        examId: selectedExam.id,
        score,
        total: mockQuestions.length,
        answers: [...answers],
        completedAt,
      }

      setExamResults(prev => ({ ...prev, [selectedExam.id]: result }))

      const examIndex = mockExams.findIndex(e => e.id === selectedExam.id)
      if (examIndex !== -1) {
        mockExams[examIndex].completed = true
        mockExams[examIndex].score = score
        mockExams[examIndex].completedAt = completedAt
      }

      setCurrentScreen('result')
    }
  }, [currentScreen, timeRemaining, selectedExam, answers])

  // Render screens
  if (currentScreen === 'list') {
    return (
      <ExamListScreen
        filteredExams={filteredExams}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        setFilteredExams={setFilteredExams}
        mockExams={mockExams}
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
        onSelectExam={handleSelectExam}
        onRetakeExam={handleRetakeExam}
        onViewResult={handleViewResult}
      />
    )
  }

  if (currentScreen === 'confirm' && selectedExam) {
    return (
      <ExamConfirmScreen
        exam={selectedExam}
        onStartExam={handleStartExam}
        onBack={handleBackToList}
      />
    )
  }

  if (currentScreen === 'exam' && selectedExam) {
    return (
      <ExamTestScreen
        exam={selectedExam}
        questions={mockQuestions}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        timeRemaining={timeRemaining}
        onAnswerSelect={handleAnswerSelect}
        onNextQuestion={handleNextQuestion}
        onPreviousQuestion={handlePreviousQuestion}
        onSubmit={handleSubmitExam}
        onQuestionNavigate={handleQuestionNavigate}
      />
    )
  }

  if (currentScreen === 'result' && selectedExam) {
    const score = calculateScore()
    const total = mockQuestions.length

    return (
      <ExamResultScreen
        score={score}
        total={total}
        onBackToList={handleBackToList}
        onRetake={() => handleRetakeExam(selectedExam)}
      />
    )
  }

  if (currentScreen === 'reviewResult' && viewingResult && selectedExam) {
    return (
      <ExamReviewScreen
        exam={selectedExam}
        result={viewingResult}
        questions={mockQuestions}
        onBackToList={handleBackToList}
        onRetake={() => handleRetakeExam(selectedExam)}
      />
    )
  }

  return null
}
