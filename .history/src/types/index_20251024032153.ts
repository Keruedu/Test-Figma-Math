export type GameScreen = 'lobby' | 'game' | 'leaderboard' | 'results'

export type Player = {
  id: string
  name: string
  avatar: string
  score: number
}

export type MultipleChoiceQuestion = {
  type: 'multiple-choice'
  text: string
  answers: { id: string; text: string; isCorrect: boolean }[]
}

export type TextInputQuestion = {
  type: 'text-input'
  text: string
  correctAnswer: string
  placeholder: string
}

export type MatchingQuestion = {
  type: 'matching'
  text: string
  leftColumn: { id: string; text: string }[]
  rightColumn: { id: string; text: string }[]
  correctPairs: { left: string; right: string }[]
}

export type OrderingQuestion = {
  type: 'ordering'
  text: string
  items: { id: string; text: string; correctOrder: number }[]
}

export type TrueFalseQuestion = {
  type: 'true-false'
  text: string
  correctAnswer: boolean
}

export type Question =
  | MultipleChoiceQuestion
  | TextInputQuestion
  | MatchingQuestion
  | OrderingQuestion
  | TrueFalseQuestion

// Exam types
export interface Exam {
  id: number
  name: string
  subject: string
  grade: string
  chapter: string
  lesson: string
  duration: number
  questionCount: number
  type: 'system' | 'ai'
  examType: '15min' | '45min' | 'midterm' | 'final'
  completed?: boolean
  score?: number
  completedAt?: string
}

export interface ExamQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export interface ExamResult {
  examId: number
  score: number
  total: number
  answers: number[]
  completedAt: string
}
