import { useEffect, useState } from 'react'
import type { Player } from '../types'

interface LeaderboardScreenProps {
  players: Player[]
  onContinue: () => void
}

export const LeaderboardScreen = ({ players, onContinue }: LeaderboardScreenProps) => {
  const [countdown, setCountdown] = useState(5)
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowLeaderboard(true), 300)
  }, [])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  const topPlayers = sortedPlayers.slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            showLeaderboard ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] bg-clip-text text-transparent">
            🏆 BẢNG XẾP HẠNG 🏆
          </h1>
          <p className="text-gray-600 text-xl">Sau câu hỏi này sẽ tiếp tục...</p>
        </div>

        <div className="space-y-4 mb-10">
          {topPlayers.map((player, index) => {
            const delay = index * 150

            return (
              <div
                key={player.id}
                className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-700 ${
                  showLeaderboard ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                } ${
                  index === 0
                    ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-white'
                    : index === 1
                      ? 'border-gray-300 bg-gradient-to-r from-gray-50 to-white'
                      : index === 2
                        ? 'border-orange-300 bg-gradient-to-r from-orange-50 to-white'
                        : 'border-gray-200'
                } hover:scale-105 transform cursor-pointer`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div className="flex items-center gap-6 p-6">
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-full font-black text-2xl ${
                      index === 0
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg'
                        : index === 1
                          ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg'
                          : index === 2
                            ? 'bg-gradient-to-br from-orange-300 to-orange-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </div>

                  <div
                    className="flex items-center justify-center w-16 h-16 text-4xl bg-gray-50 rounded-full border-2 border-gray-200"
                    style={{ animationDelay: `${delay + 200}ms` }}
                  >
                    {player.avatar}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{player.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {index === 0 && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                          👑 Đang dẫn đầu
                        </span>
                      )}
                      {index > 0 && (
                        <span className="text-gray-500 text-sm">
                          Kém {sortedPlayers[0].score - player.score} điểm
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-3xl font-black ${
                        index === 0
                          ? 'text-yellow-600'
                          : index === 1
                            ? 'text-gray-600'
                            : index === 2
                              ? 'text-orange-600'
                              : 'text-[#6E55FB]'
                      }`}
                    >
                      {player.score}
                    </div>
                    <div className="text-sm text-gray-500 font-semibold">điểm</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className={`text-center transition-all duration-700 ${
            showLeaderboard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 mb-6">
            <p className="text-gray-600 text-lg mb-4">Câu hỏi tiếp theo trong</p>
            <div className="text-6xl font-black text-[#6E55FB] mb-4 animate-pulse">
              {countdown}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] h-full transition-all duration-1000 ease-linear"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={onContinue}
            className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold px-12 py-5 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95"
          >
            ⚡ Tiếp tục ngay
          </button>
        </div>
      </div>
    </div>
  )
}
