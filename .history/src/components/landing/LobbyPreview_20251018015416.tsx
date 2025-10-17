interface LobbyPreviewProps {
  onNavigate: () => void
}

export const LobbyPreview = ({ onNavigate }: LobbyPreviewProps) => {
  return (
    <div className="animate-fade-slide animate-delay-200">
      <div className="text-center mb-6 md:mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">1️⃣ Sảnh chờ</h2>
        <p className="text-sm md:text-base text-gray-600">Người chơi nhập tên và chờ trận đấu bắt đầu</p>
      </div>
      <div
        className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200 hover:scale-105 transition-all cursor-pointer"
        onClick={onNavigate}
      >
        <div className="text-center mb-5 md:mb-6">
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">⚔️ Đấu Trường Toán Học</h3>
          <div className="inline-block bg-purple-50 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border-2 border-[#6E55FB]">
            <p className="text-gray-600 text-xs md:text-sm mb-1">Mã phòng:</p>
            <p className="text-2xl md:text-3xl font-bold text-[#6E55FB]">4827</p>
          </div>
        </div>
        <input
          type="text"
          placeholder="Nhập tên của bạn"
          className="w-full px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 text-center placeholder-gray-400 mb-3 md:mb-4 text-sm md:text-base"
          disabled
        />
        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
          {['🎯 Minh Anh', '🚀 Tuấn Kiệt', '⭐ Hương Giang'].map((player, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg md:rounded-xl p-2 text-center text-gray-900 text-xs md:text-sm border border-gray-200"
            >
              {player}
            </div>
          ))}
        </div>
        <button
          className="w-full bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white font-bold py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base"
          disabled
        >
          🚀 Sẵn sàng!
        </button>
      </div>
    </div>
  )
}
