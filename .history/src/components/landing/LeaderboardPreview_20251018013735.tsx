interface Player {
  pos: number
  avatar: string
  name: string
  score: number
  badge?: string
  gap?: number
}

interface LeaderboardPreviewProps {
  onNavigate: () => void
}

const players: Player[] = [
  { pos: 1, avatar: '🎯', name: 'Minh Anh', score: 500, badge: '👑 Đang dẫn đầu' },
  { pos: 2, avatar: '🚀', name: 'Tuấn Kiệt', score: 450, gap: 50 },
  { pos: 3, avatar: '⭐', name: 'Hương Giang', score: 400, gap: 100 },
  { pos: 4, avatar: '🌸', name: 'Thu Trang', score: 350, gap: 150 },
  { pos: 5, avatar: '⚡', name: 'Đức Nam', score: 300, gap: 200 },
]

export const LeaderboardPreview = ({ onNavigate }: LeaderboardPreviewProps) => {
  return (
    <div className="animate-fade-slide animate-delay-500">
      <div className="text-center mb-6 md:mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">3️⃣ Bảng xếp hạng</h2>
        <p className="text-sm md:text-base text-gray-600">Xem thứ hạng sau mỗi câu hỏi và nhận điểm thưởng</p>
      </div>
      <div
        className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200 hover:scale-105 transition-all cursor-pointer"
        onClick={onNavigate}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-2 md:mb-3">
          🏆 BẢNG XẾP HẠNG 🏆
        </h3>
        <p className="text-gray-600 text-base md:text-lg text-center mb-6 md:mb-8">Sau câu hỏi này sẽ tiếp tục...</p>
        
        <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
          {players.map((player) => (
            <div
              key={player.pos}
              className={`rounded-xl md:rounded-2xl shadow-lg border-2 transition-all ${
                player.pos === 1
                  ? 'bg-gradient-to-r from-yellow-50 to-white border-yellow-400'
                  : player.pos === 2
                    ? 'bg-gradient-to-r from-gray-50 to-white border-gray-300'
                    : player.pos === 3
                      ? 'bg-gradient-to-r from-orange-50 to-white border-orange-300'
                      : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4">
                <div
                  className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full font-black text-xl md:text-2xl ${
                    player.pos === 1
                      ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg'
                      : player.pos === 2
                        ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg'
                        : player.pos === 3
                          ? 'bg-gradient-to-br from-orange-300 to-orange-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {player.pos === 1 ? '🥇' : player.pos === 2 ? '🥈' : player.pos === 3 ? '🥉' : player.pos}
                </div>

                <div className="w-12 h-12 md:w-14 md:h-14 text-3xl md:text-4xl bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200">
                  {player.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-base md:text-lg font-bold text-gray-900 truncate">{player.name}</h4>
                  {player.badge && (
                    <span className="inline-block px-2 py-0.5 md:py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full mt-1">
                      {player.badge}
                    </span>
                  )}
                  {player.gap && (
                    <p className="text-gray-500 text-xs md:text-sm">Kém {player.gap} điểm</p>
                  )}
                </div>

                <div className="text-right">
                  <div
                    className={`text-2xl md:text-3xl font-black ${
                      player.pos === 1
                        ? 'text-yellow-600'
                        : player.pos === 2
                          ? 'text-gray-600'
                          : player.pos === 3
                            ? 'text-orange-600'
                            : 'text-[#6E55FB]'
                    }`}
                  >
                    {player.score}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 font-semibold">điểm</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-inner border border-gray-200">
          <p className="text-gray-600 text-center mb-2 md:mb-3 text-sm md:text-base">Câu hỏi tiếp theo trong</p>
          <div className="text-5xl md:text-6xl font-black text-[#6E55FB] text-center mb-2 md:mb-3 animate-pulse">
            3
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] h-full rounded-full"
              style={{ width: '60%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
