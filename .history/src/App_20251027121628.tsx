import { useState } from 'react'
import './App.css'
import type { GameScreen, Player } from './types'
import { LandingPage } from './pages/LandingPage'
import { LobbyScreen } from './pages/LobbyScreen'
import { GameScreen as GameScreenComponent } from './pages/GameScreen'
import { LeaderboardScreen } from './pages/LeaderboardScreen'
import { ResultsScreen } from './pages/ResultsScreen'
import { questions } from './data/questions'

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('lobby')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Bạn', avatar: '😊', score: 0 },
    { id: '2', name: 'Minh', avatar: '🎨', score: 0 },
    { id: '3', name: 'Hương', avatar: '🌸', score: 0 },
    { id: '4', name: 'Tuấn', avatar: '⚡', score: 0 },
    { id: '5', name: 'Linh', avatar: '🌟', score: 0 },
    { id: '6', name: 'Khoa', avatar: '🎯', score: 0 },
    { id: '7', name: 'Trang', avatar: '🦋', score: 0 },
    { id: '8', name: 'Nam', avatar: '🚀', score: 0 },
  ])

  const handleNavigate = (screen: GameScreen, questionIndex?: number) => {
    setShowLanding(false)
    setCurrentScreen(screen)
    if (questionIndex !== undefined) {
      setCurrentQuestionIndex(questionIndex)
    }
  }

  const handleStartGame = () => {
    setCurrentScreen('game')
    setCurrentQuestionIndex(0)
    // Reset player scores
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({ ...player, score: 0 }))
    )
  }

  const handleNextQuestion = () => {
    // Update random player scores for demo
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        score: player.score + Math.floor(Math.random() * 100),
      }))
    )
    setCurrentScreen('leaderboard')
  }

  const handleContinueFromLeaderboard = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setCurrentScreen('game')
    } else {
      setCurrentScreen('results')
    }
  }

  const handleFinishGame = () => {
    // Final score update
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        score: player.score + Math.floor(Math.random() * 100),
      }))
    )
    setCurrentScreen('results')
  }

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0)
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({ ...player, score: 0 }))
    )
    setCurrentScreen('lobby')
  }

  const handleExit = () => {
    setShowLanding(true)
    setCurrentScreen('lobby')
    setCurrentQuestionIndex(0)
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({ ...player, score: 0 }))
    )
  }

  if (showLanding) {
    return <LandingPage />
  }

  return (
    <div className="min-h-screen">
      {currentScreen !== 'lobby' && (
        <button
          onClick={handleExit}
          className="fixed top-4 left-4 z-50 bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg border border-gray-200"
        >
          <span>←</span> Về trang chủ
        </button>
      )}

      {currentScreen === 'lobby' && <LobbyScreen onStart={handleStartGame} />}
      {currentScreen === 'game' && (
        <GameScreenComponent
          questionIndex={currentQuestionIndex}
          onNextQuestion={handleNextQuestion}
          onFinish={handleFinishGame}
        />
      )}
      {currentScreen === 'leaderboard' && (
        <LeaderboardScreen players={players} onContinue={handleContinueFromLeaderboard} />
      )}
      {currentScreen === 'results' && (
        <ResultsScreen players={players} onPlayAgain={handlePlayAgain} onExit={handleExit} />
      )}
    </div>
  )
}

export default App
