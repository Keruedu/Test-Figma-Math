import { useEffect, useState } from 'react'
import type { Player } from '../types'
import { Confetti } from '../components/Confetti'

interface ResultsScreenProps {
  players: Player[]
  onPlayAgain: () => void
  onExit: () => void
}

export const ResultsScreen = ({ players, onPlayAgain, onExit }: ResultsScreenProps) => {
  const [showResults, setShowResults] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowResults(true), 300)
    setTimeout(() => setShowConfetti(true), 800)
  }, [])

  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  const topThree = sortedPlayers.slice(0, 3)
  const winner = topThree[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 py-12 px-4 relative overflow-hidden">
      {showConfetti && <Confetti />}

      <div className="container mx-auto max-w-6xl relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            showResults ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
            🎉 KẾT QUẢ CUỐI CÙNG 🎉
          </h1>
          <p className="text-gray-600 text-2xl">Chúc mừng các chiến binh toán học!</p>
        </div>

        {/* Podium */}
        <div className="flex justify-center items-end gap-4 mb-16 px-4">
          {/* 2nd Place */}
          {topThree[1] && (
            <div
              className={`flex flex-col items-center transition-all duration-700 ${
                showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="mb-4 relative">
                <div className="w-24 h-24 text-5xl bg-white rounded-full flex items-center justify-center border-4 border-gray-300 shadow-lg">
                  {topThree[1].avatar}
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                  🥈
                </div>
              </div>
              <div className="bg-white rounded-t-2xl px-8 py-6 shadow-xl border-2 border-gray-300 min-w-[180px]">
                <p className="font-bold text-lg text-gray-900 mb-2">{topThree[1].name}</p>
                <p className="text-3xl font-black text-gray-600">{topThree[1].score}</p>
                <p className="text-sm text-gray-500 font-semibold">điểm</p>
              </div>
              <div className="w-full h-32 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-xl shadow-lg"></div>
            </div>
          )}

          {/* 1st Place */}
          {winner && (
            <div
              className={`flex flex-col items-center transition-all duration-700 ${
                showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="mb-4 relative animate-bounce">
                <div className="w-32 h-32 text-6xl bg-white rounded-full flex items-center justify-center border-4 border-yellow-400 shadow-2xl">
                  {winner.avatar}
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-3xl shadow-2xl animate-spin-slow">
                  👑
                </div>
              </div>
              <div className="bg-white rounded-t-2xl px-10 py-8 shadow-2xl border-4 border-yellow-400 min-w-[200px]">
                <p className="font-black text-xl text-yellow-600 mb-1">🏆 QUÁN QUÂN 🏆</p>
                <p className="font-bold text-xl text-gray-900 mb-3">{winner.name}</p>
                <p className="text-4xl font-black text-yellow-600">{winner.score}</p>
                <p className="text-sm text-gray-500 font-semibold">điểm</p>
              </div>
              <div className="w-full h-48 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-b-xl shadow-2xl"></div>
            </div>
          )}

          {/* 3rd Place */}
          {topThree[2] && (
            <div
              className={`flex flex-col items-center transition-all duration-700 ${
                showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="mb-4 relative">
                <div className="w-20 h-20 text-4xl bg-white rounded-full flex items-center justify-center border-4 border-orange-300 shadow-lg">
                  {topThree[2].avatar}
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full flex items-center justify-center text-xl shadow-lg">
                  🥉
                </div>
              </div>
              <div className="bg-white rounded-t-2xl px-6 py-5 shadow-xl border-2 border-orange-300 min-w-[160px]">
                <p className="font-bold text-base text-gray-900 mb-2">{topThree[2].name}</p>
                <p className="text-2xl font-black text-orange-600">{topThree[2].score}</p>
                <p className="text-xs text-gray-500 font-semibold">điểm</p>
              </div>
              <div className="w-full h-24 bg-gradient-to-b from-orange-300 to-orange-500 rounded-b-xl shadow-lg"></div>
            </div>
          )}
        </div>

        {/* All Players */}
        <div
          className={`bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 mb-10 transition-all duration-700 ${
            showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            Bảng xếp hạng hoàn chỉnh
          </h2>
          <div className="space-y-3">
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  index < 3 ? 'bg-gradient-to-r from-purple-50 to-white' : 'bg-gray-50'
                } hover:scale-105 transform cursor-pointer`}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-700 border-2 border-gray-200">
                  {index + 1}
                </div>
                <div className="w-12 h-12 text-2xl flex items-center justify-center bg-white rounded-full border-2 border-gray-200">
                  {player.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{player.name}</p>
                </div>
                <div className="text-2xl font-black text-[#6E55FB]">{player.score}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col md:flex-row gap-4 justify-center transition-all duration-700 ${
            showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold px-12 py-5 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95"
          >
            🔄 Chơi lại
          </button>
          <button
            onClick={onExit}
            className="bg-white text-gray-900 text-xl font-bold px-12 py-5 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            🏠 Về trang chủ
          </button>
        </div>
      </div>
    </div>
  )
}
