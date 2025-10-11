import { useState, useEffect } from 'react'
import type { Player } from '../types'

interface LobbyScreenProps {
  onStart: () => void
}

export const LobbyScreen = ({ onStart }: LobbyScreenProps) => {
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Minh Anh', avatar: '🎯', score: 0 },
    { id: '2', name: 'Tuấn Kiệt', avatar: '🚀', score: 0 },
    { id: '3', name: 'Hương Giang', avatar: '⭐', score: 0 },
  ])

  const roomCode = '4827'

  // Simulate adding players
  useEffect(() => {
    const interval = setInterval(() => {
      const names = ['Thu Hà', 'Đức Anh', 'Mai Linh', 'Quang Huy', 'Phương Anh']
      const emojis = ['🎨', '🎮', '🎪', '🎭', '🎸', '🎺', '🎹']
      if (players.length < 8 && Math.random() > 0.6) {
        setPlayers((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            name: names[Math.floor(Math.random() * names.length)],
            avatar: emojis[Math.floor(Math.random() * emojis.length)],
            score: 0,
          },
        ])
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [players.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 animate-fade-slide">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 drop-shadow-lg">
            ⚔️ Đấu Trường Toán Học
          </h1>
          <div className="inline-block bg-white px-8 py-4 rounded-2xl border-2 border-[#6E55FB] shadow-lg">
            <p className="text-gray-600 mb-2">Mã phòng:</p>
            <p className="text-5xl font-bold text-[#6E55FB] tracking-wider">{roomCode}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 animate-fade-slide animate-delay-200">
          <input
            type="text"
            placeholder="Nhập tên của bạn"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-300 text-gray-900 text-lg placeholder-gray-500 focus:outline-none focus:border-[#6E55FB] transition-all mb-6"
          />

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">👥</span>
              Người chơi ({players.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 animate-fade-slide hover:bg-gray-100 transition-all border border-gray-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-3xl">{player.avatar}</span>
                  <span className="text-gray-900 font-medium truncate">{player.name}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold py-5 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95"
          >
            🚀 Sẵn sàng!
          </button>
        </div>
      </div>
    </div>
  )
}
