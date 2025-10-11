import type { GameScreen } from '../types'
import { AnimatedBackground } from '../components/AnimatedBackground'

interface LandingPageProps {
  onNavigate: (screen: GameScreen, questionIndex?: number) => void
}

export const LandingPage = ({ onNavigate }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-slide">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 drop-shadow-lg">
            ⚔️ Đấu Trường Toán Học
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Math Battle Arena - Nền tảng học toán tương tác như Kahoot!
          </p>
          <button
            onClick={() => onNavigate('lobby')}
            className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-xl font-bold py-4 px-12 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95"
          >
            🚀 Bắt đầu trải nghiệm
          </button>
        </div>

        {/* Screen Previews */}
        <div className="space-y-16">
          {/* Lobby Preview */}
          <div className="animate-fade-slide animate-delay-200">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">1️⃣ Sảnh chờ</h2>
              <p className="text-gray-600">Người chơi nhập tên và chờ trận đấu bắt đầu</p>
            </div>
            <div
              className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 hover:scale-105 transition-all cursor-pointer"
              onClick={() => onNavigate('lobby')}
            >
              <div className="text-center mb-6">
                <h3 className="text-4xl font-bold text-gray-900 mb-3">⚔️ Đấu Trường Toán Học</h3>
                <div className="inline-block bg-purple-50 px-6 py-3 rounded-2xl border-2 border-[#6E55FB]">
                  <p className="text-gray-600 text-sm mb-1">Mã phòng:</p>
                  <p className="text-3xl font-bold text-[#6E55FB]">4827</p>
                </div>
              </div>
              <input
                type="text"
                placeholder="Nhập tên của bạn"
                className="w-full px-6 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 text-center placeholder-gray-400 mb-4"
                disabled
              />
              <div className="grid grid-cols-3 gap-3 mb-4">
                {['🎯 Minh Anh', '🚀 Tuấn Kiệt', '⭐ Hương Giang'].map((player, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-xl p-2 text-center text-gray-900 text-sm border border-gray-200"
                  >
                    {player}
                  </div>
                ))}
              </div>
              <button
                className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white font-bold py-3 rounded-xl"
                disabled
              >
                🚀 Sẵn sàng!
              </button>
            </div>
          </div>

          {/* Question Types Preview */}
          <div className="animate-fade-slide animate-delay-400">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">2️⃣ Các dạng câu hỏi</h2>
              <p className="text-gray-600">5 loại câu hỏi đa dạng và hấp dẫn</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {/* Multiple Choice */}
              <div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:scale-105 transition-all cursor-pointer"
                onClick={() => onNavigate('game', 0)}
              >
                <div className="text-center mb-4">
                  <span className="text-5xl mb-2 block">📝</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Trắc nghiệm</h3>
                  <p className="text-sm text-gray-600">Chọn đáp án đúng từ 4 lựa chọn</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-gray-900 text-sm">
                    A. 162
                  </div>
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-2 text-green-700 text-sm flex items-center justify-between">
                    <span>B. 172</span>
                    <span className="text-lg">✓</span>
                  </div>
                </div>
              </div>

              {/* Text Input */}
              <div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:scale-105 transition-all cursor-pointer"
                onClick={() => onNavigate('game', 1)}
              >
                <div className="text-center mb-4">
                  <span className="text-5xl mb-2 block">✍️</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tự luận</h3>
                  <p className="text-sm text-gray-600">Nhập trực tiếp đáp án</p>
                </div>
                <input
                  type="text"
                  placeholder="Nhập đáp án..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 text-gray-900 text-center placeholder-gray-400"
                  disabled
                />
                <button
                  className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white font-semibold py-2 rounded-lg mt-3"
                  disabled
                >
                  ✓ Gửi đáp án
                </button>
              </div>

              {/* True/False */}
              <div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:scale-105 transition-all cursor-pointer"
                onClick={() => onNavigate('game', 2)}
              >
                <div className="text-center mb-4">
                  <span className="text-5xl mb-2 block">✓✗</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Đúng/Sai</h3>
                  <p className="text-sm text-gray-600">Chọn đúng hoặc sai</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3 text-center">
                    <span className="text-3xl text-green-600">✓</span>
                    <p className="text-green-700 font-bold text-sm mt-1">ĐÚNG</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <span className="text-3xl text-gray-400">✗</span>
                    <p className="text-gray-600 font-bold text-sm mt-1">SAI</p>
                  </div>
                </div>
              </div>

              {/* Matching */}
              <div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:scale-105 transition-all cursor-pointer"
                onClick={() => onNavigate('game', 3)}
              >
                <div className="text-center mb-4">
                  <span className="text-5xl mb-2 block">🔗</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ghép cột</h3>
                  <p className="text-sm text-gray-600">Nối cột A với cột B</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 border border-blue-400 rounded-lg p-2 text-gray-900 text-sm">
                    5 × 6
                  </div>
                  <div className="bg-purple-50 border border-purple-400 rounded-lg p-2 text-gray-900 text-sm">
                    30
                  </div>
                </div>
              </div>

              {/* Ordering */}
              <div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:scale-105 transition-all cursor-pointer"
                onClick={() => onNavigate('game', 4)}
              >
                <div className="text-center mb-4">
                  <span className="text-5xl mb-2 block">🔢</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sắp xếp</h3>
                  <p className="text-sm text-gray-600">Kéo thả để sắp xếp</p>
                </div>
                <div className="space-y-2">
                  {['1. 47', '2. 89', '3. 125'].map((item, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-gray-900 text-sm flex items-center justify-between"
                    >
                      <span>{item}</span>
                      <span className="text-gray-400">⋮⋮</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div className="animate-fade-slide animate-delay-600">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">3️⃣ Bảng xếp hạng</h2>
              <p className="text-gray-600">Xem thứ hạng sau mỗi câu hỏi</p>
            </div>
            <div
              className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 hover:scale-105 transition-all cursor-pointer"
              onClick={() => onNavigate('leaderboard')}
            >
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-6">
                📊 Bảng xếp hạng tạm thời
              </h3>
              <div className="space-y-3">
                {[
                  { pos: 1, avatar: '🎯', name: 'Minh Anh', score: 500, color: 'bg-yellow-500' },
                  { pos: 2, avatar: '🚀', name: 'Tuấn Kiệt', score: 400, color: 'bg-gray-300' },
                  { pos: 3, avatar: '⭐', name: 'Hương Giang', score: 300, color: 'bg-orange-600' },
                ].map((player) => (
                  <div
                    key={player.pos}
                    className={
                      player.pos === 1
                        ? 'bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] p-4 rounded-xl'
                        : 'bg-gray-50 p-4 rounded-xl border border-gray-200'
                    }
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`${player.color} w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold text-white`}
                      >
                        {player.pos}
                      </div>
                      <span className="text-2xl">{player.avatar}</span>
                      <span
                        className={`font-semibold flex-1 ${player.pos === 1 ? 'text-white' : 'text-gray-900'}`}
                      >
                        {player.name}
                      </span>
                      <span
                        className={`font-bold ${player.pos === 1 ? 'text-white' : 'text-gray-900'}`}
                      >
                        {player.score} điểm
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Preview */}
          <div className="animate-fade-slide animate-delay-800">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">4️⃣ Kết quả chung cuộc</h2>
              <p className="text-gray-600">Bục vinh quang và xếp hạng cuối cùng</p>
            </div>
            <div
              className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 hover:scale-105 transition-all cursor-pointer"
              onClick={() => onNavigate('results')}
            >
              <h3 className="text-4xl font-bold text-gray-900 text-center mb-3">
                🏆 Kết quả chung cuộc
              </h3>
              <p className="text-xl text-green-600 text-center mb-8">
                Chúc mừng! Bạn đã hoàn thành trận đấu!
              </p>

              {/* Podium */}
              <div className="flex items-end justify-center gap-4 mb-8">
                {/* 2nd */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-gray-300 to-gray-400 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2">
                    🚀
                  </div>
                  <div className="bg-gradient-to-br from-gray-300 to-gray-500 w-24 h-32 rounded-t-2xl flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">2</span>
                    <span className="text-white text-sm">400</span>
                  </div>
                </div>

                {/* 1st */}
                <div className="flex flex-col items-center -mt-6">
                  <span className="text-4xl mb-2">👑</span>
                  <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-2">
                    🎯
                  </div>
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-28 h-44 rounded-t-2xl flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-yellow-900">1</span>
                    <span className="text-yellow-900 font-bold text-lg">500</span>
                  </div>
                </div>

                {/* 3rd */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2">
                    ⭐
                  </div>
                  <div className="bg-gradient-to-br from-orange-400 to-orange-700 w-24 h-24 rounded-t-2xl flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-orange-900">3</span>
                    <span className="text-white text-sm">300</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white font-bold py-3 rounded-xl"
                  disabled
                >
                  🔄 Chơi lại
                </button>
                <button
                  className="bg-gray-50 text-gray-900 font-bold py-3 rounded-xl border border-gray-300"
                  disabled
                >
                  🚪 Thoát
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <p className="text-gray-500 text-sm">Thiết kế bởi Tailwind CSS • Màu chủ đạo: #6E55FB</p>
        </div>
      </div>
    </div>
  )
}
