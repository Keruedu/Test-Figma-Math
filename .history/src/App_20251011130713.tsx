import { useState } from 'react'
import './App.css'
import type { GameScreen } from './types'
import { LandingPage } from './pages/LandingPage'

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('lobby')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const handleNavigate = (screen: GameScreen, questionIndex?: number) => {
    setShowLanding(false)
    setCurrentScreen(screen)
    if (questionIndex !== undefined) {
      setCurrentQuestionIndex(questionIndex)
    }
  }

  if (showLanding) {
    return <LandingPage onNavigate={handleNavigate} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50">
      <button
        onClick={() => setShowLanding(true)}
        className="fixed top-4 left-4 z-50 bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg border border-gray-200"
      >
        <span>←</span> Về trang chủ
      </button>

      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {currentScreen === 'lobby' && '🏠 Sảnh chờ'}
            {currentScreen === 'game' && '🎮 Trò chơi'}
            {currentScreen === 'leaderboard' && '📊 Bảng xếp hạng'}
            {currentScreen === 'results' && '🏆 Kết quả'}
          </h2>
          <p className="text-gray-600">
            Màn hình <strong>{currentScreen}</strong> đang được phát triển...
          </p>
          {currentScreen === 'game' && (
            <p className="text-gray-600 mt-2">
              Câu hỏi số: <strong>{currentQuestionIndex + 1}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
