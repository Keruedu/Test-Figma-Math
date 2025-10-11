import { useState } from 'react'
import './App.css'

// Types
type GameScreen = 'lobby' | 'game' | 'leaderboard' | 'results'

function App() {
  const [landingView] = useState(true)
  const [, setScreen] = useState<GameScreen>('lobby')
  const [, setLandingView] = useState(true)
  const [, setCurrentQuestion] = useState(0)

  if (landingView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-10 animate-float text-[#6E55FB]">∑</div>
          <div className="absolute top-32 right-20 text-5xl opacity-10 animate-float text-[#6E55FB]" style={{ animationDelay: '1s' }}>π</div>
          <div className="absolute bottom-32 left-1/4 text-7xl opacity-10 animate-float text-[#6E55FB]" style={{ animationDelay: '2s' }}>∞</div>
          <div className="absolute bottom-20 right-1/3 text-5xl opacity-10 animate-float text-[#6E55FB]" style={{ animationDelay: '1.5s' }}>√</div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-slide">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 drop-shadow-lg">
              ⚔️ Đấu Trường Toán Học
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Math Battle Arena - Nền tảng học toán tương tác như Kahoot!
            </p>
            <button
              onClick={() => setLandingView(false)}
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
                <h2 className="text-4xl font-bold text-gray-800 mb-2">1️⃣ Sảnh chờ</h2>
                <p className="text-gray-600">Người chơi nhập tên và chờ trận đấu bắt đầu</p>
              </div>
              <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 hover:scale-105 transition-all cursor-pointer" onClick={() => { setLandingView(false); setScreen('lobby'); }}>
                <div className="text-center mb-6">
                  <h3 className="text-4xl font-bold text-gray-800 mb-3">⚔️ Đấu Trường Toán Học</h3>
                  <div className="inline-block bg-purple-50 px-6 py-3 rounded-2xl border-2 border-[#6E55FB]">
                    <p className="text-gray-600 text-sm mb-1">Mã phòng:</p>
                    <p className="text-3xl font-bold text-[#6E55FB]">4827</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Nhập tên của bạn"
                  className="w-full px-6 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-800 text-center placeholder-gray-400 mb-4"
                  disabled
                />
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {['🎯 Minh Anh', '🚀 Tuấn Kiệt', '⭐ Hương Giang'].map((player, i) => (
                    <div key={i} className="bg-purple-50 rounded-xl p-2 text-center text-gray-800 text-sm font-medium">{player}</div>
                  ))}
                </div>
                <button className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white font-bold py-3 rounded-xl shadow-lg" disabled>
                  🚀 Sẵn sàng!
                </button>
              </div>
            </div>

            {/* Question Types Preview */}
            <div className="animate-fade-slide animate-delay-400">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">2️⃣ Các dạng câu hỏi</h2>
                <p className="text-gray-600">5 loại câu hỏi đa dạng và hấp dẫn</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {/* Multiple Choice */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:scale-105 hover:border-[#6E55FB] transition-all cursor-pointer shadow-lg" onClick={() => { setLandingView(false); setScreen('game'); setCurrentQuestion(0); }}>
                  <div className="text-center mb-4">
                    <span className="text-5xl mb-2 block">📝</span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Trắc nghiệm</h3>
                    <p className="text-sm text-gray-600">Chọn đáp án đúng từ 4 lựa chọn</p>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2 text-gray-600 text-sm">A. 162</div>
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-2 text-green-700 text-sm flex items-center justify-between font-semibold">
                      <span>B. 172</span>
                      <span className="text-lg">✓</span>
                    </div>
                  </div>
                </div>

                {/* Text Input */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:scale-105 hover:border-[#6E55FB] transition-all cursor-pointer shadow-lg" onClick={() => { setLandingView(false); setScreen('game'); setCurrentQuestion(1); }}>
                  <div className="text-center mb-4">
                    <span className="text-5xl mb-2 block">✍️</span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tự luận</h3>
                    <p className="text-sm text-gray-600">Nhập trực tiếp đáp án</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Nhập đáp án..."
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 text-gray-800 text-center placeholder-gray-400 mb-3"
                    disabled
                  />
                  <button className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white font-semibold py-2 rounded-lg shadow" disabled>
                    ✓ Gửi đáp án
                  </button>
                </div>

                {/* True/False */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:scale-105 hover:border-[#6E55FB] transition-all cursor-pointer shadow-lg" onClick={() => { setLandingView(false); setScreen('game'); setCurrentQuestion(2); }}>
                  <div className="text-center mb-4">
                    <span className="text-5xl mb-2 block">✓✗</span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Đúng/Sai</h3>
                    <p className="text-sm text-gray-600">Chọn đúng hoặc sai</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3 text-center">
                      <span className="text-3xl text-green-600">✓</span>
                      <p className="text-green-700 font-bold text-sm mt-1">ĐÚNG</p>
                    </div>
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 text-center">
                      <span className="text-3xl text-gray-400">✗</span>
                      <p className="text-gray-600 font-bold text-sm mt-1">SAI</p>
                    </div>
                  </div>
                </div>

                {/* Matching */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:scale-105 hover:border-[#6E55FB] transition-all cursor-pointer shadow-lg" onClick={() => { setLandingView(false); setScreen('game'); setCurrentQuestion(3); }}>
                  <div className="text-center mb-4">
                    <span className="text-5xl mb-2 block">🔗</span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Ghép cột</h3>
                    <p className="text-sm text-gray-600">Nối cột A với cột B</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-2 text-blue-700 text-sm font-semibold">5 × 6</div>
                    <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-2 text-purple-700 text-sm font-semibold">30</div>
                  </div>
                </div>

                {/* Ordering */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:scale-105 hover:border-[#6E55FB] transition-all cursor-pointer shadow-lg" onClick={() => { setLandingView(false); setScreen('game'); setCurrentQuestion(4); }}>
                  <div className="text-center mb-4">
                    <span className="text-5xl mb-2 block">🔢</span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Sắp xếp</h3>
                    <p className="text-sm text-gray-600">Kéo thả để sắp xếp</p>
                  </div>
                  <div className="space-y-2">
                    {['1. 47', '2. 89', '3. 125'].map((item, i) => (
                      <div key={i} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2 text-gray-700 text-sm flex items-center justify-between font-medium">
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
                <h2 className="text-4xl font-bold text-gray-800 mb-2">3️⃣ Bảng xếp hạng</h2>
                <p className="text-gray-600">Xem thứ hạng sau mỗi câu hỏi</p>
              </div>
              <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200 hover:scale-105 transition-all cursor-pointer" onClick={() => { setLandingView(false); setScreen('leaderboard'); }}>
                <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">📊 Bảng xếp hạng tạm thời</h3>
                <div className="space-y-3">
                  {[
                    { pos: 1, avatar: '🎯', name: 'Minh Anh', score: 500, color: 'bg-yellow-400' },
                    { pos: 2, avatar: '🚀', name: 'Tuấn Kiệt', score: 400, color: 'bg-gray-300' },
                    { pos: 3, avatar: '⭐', name: 'Hương Giang', score: 300, color: 'bg-orange-500' },
                  ].map((player) => (
                    <div key={player.pos} className={player.pos === 1 ? 'bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] p-4 rounded-xl shadow-lg' : 'bg-purple-50 p-4 rounded-xl border-2 border-gray-200'}>
                      <div className="flex items-center gap-4">
                        <div className={`${player.color} w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold ${player.pos === 1 ? 'text-yellow-900' : 'text-gray-700'} shadow`}>{player.pos}</div>
                        <span className="text-2xl">{player.avatar}</span>
                        <span className={`${player.pos === 1 ? 'text-white' : 'text-gray-800'} font-semibold flex-1`}>{player.name}</span>
                        <span className={`${player.pos === 1 ? 'text-white' : 'text-gray-800'} font-bold`}>{player.score} điểm</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Preview */}
            <div className="animate-fade-slide animate-delay-800">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">4️⃣ Kết quả chung cuộc</h2>
                <p className="text-gray-600">Bục vinh quang và xếp hạng cuối cùng</p>
              </div>
              <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200 hover:scale-105 transition-all cursor-pointer" onClick={() => { setLandingView(false); setScreen('results'); }}>
                <h3 className="text-4xl font-bold text-gray-800 text-center mb-3">🏆 Kết quả chung cuộc</h3>
                <p className="text-xl text-green-600 text-center mb-8 font-semibold">Chúc mừng! Bạn đã hoàn thành trận đấu!</p>
                
                {/* Podium */}
                <div className="flex items-end justify-center gap-4 mb-8">
                  {/* 2nd */}
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-br from-gray-300 to-gray-400 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2 shadow-lg">🚀</div>
                    <div className="bg-gradient-to-br from-gray-300 to-gray-500 w-24 h-32 rounded-t-2xl flex flex-col items-center justify-center shadow-lg">
                      <span className="text-3xl font-bold text-gray-800">2</span>
                      <span className="text-white text-sm font-semibold">400</span>
                    </div>
                  </div>

                  {/* 1st */}
                  <div className="flex flex-col items-center -mt-6">
                    <span className="text-4xl mb-2 animate-bounce">👑</span>
                    <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-2 shadow-lg">🎯</div>
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-28 h-44 rounded-t-2xl flex flex-col items-center justify-center shadow-lg">
                      <span className="text-4xl font-bold text-yellow-900">1</span>
                      <span className="text-yellow-900 font-bold text-lg">500</span>
                    </div>
                  </div>

                  {/* 3rd */}
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2 shadow-lg">⭐</div>
                    <div className="bg-gradient-to-br from-orange-400 to-orange-700 w-24 h-24 rounded-t-2xl flex flex-col items-center justify-center shadow-lg">
                      <span className="text-3xl font-bold text-orange-900">3</span>
                      <span className="text-white text-sm font-semibold">300</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white font-bold py-3 rounded-xl shadow-lg" disabled>
                    🔄 Chơi lại
                  </button>
                  <button className="bg-gray-100 text-gray-800 font-bold py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-200 transition-all" disabled>
                    🚪 Thoát
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pb-8">
            <p className="text-gray-500 text-sm">Thiết kế bởi Tailwind CSS • Màu chủ đạo: #6E55FB • Light Mode</p>
          </div>
        </div>
      </div>
    )
  }

  return <div>Game screens will be added later</div>
}

export default App
