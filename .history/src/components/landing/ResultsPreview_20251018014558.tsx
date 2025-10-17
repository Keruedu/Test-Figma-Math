interface ResultsPreviewProps {
  onNavigate: () => void
}

export const ResultsPreview = ({ onNavigate }: ResultsPreviewProps) => {
  return (
    <div className="animate-fade-slide animate-delay-800">
      <div className="text-center mb-6 md:mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">6️⃣ Kết quả chung cuộc</h2>
        <p className="text-sm md:text-base text-gray-600">Bục vinh quang và xếp hạng cuối cùng</p>
      </div>
      <div
        className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200 hover:scale-105 transition-all cursor-pointer"
        onClick={onNavigate}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-2 md:mb-3">
          🏆 Kết quả chung cuộc
        </h3>
        <p className="text-lg md:text-xl text-green-600 text-center mb-6 md:mb-8">
          Chúc mừng! Bạn đã hoàn thành trận đấu!
        </p>

        {/* Podium */}
        <div className="flex items-end justify-center gap-3 md:gap-4 mb-6 md:mb-8">
          {/* 2nd */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-gray-300 to-gray-400 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl mb-2">
              🚀
            </div>
            <div className="bg-gradient-to-br from-gray-300 to-gray-500 w-20 md:w-24 h-28 md:h-32 rounded-t-2xl flex flex-col items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-gray-800">2</span>
              <span className="text-white text-xs md:text-sm">400</span>
            </div>
          </div>

          {/* 1st */}
          <div className="flex flex-col items-center -mt-4 md:-mt-6">
            <span className="text-3xl md:text-4xl mb-2">👑</span>
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl mb-2">
              🎯
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-24 md:w-28 h-36 md:h-44 rounded-t-2xl flex flex-col items-center justify-center">
              <span className="text-3xl md:text-4xl font-bold text-yellow-900">1</span>
              <span className="text-yellow-900 font-bold text-base md:text-lg">500</span>
            </div>
          </div>

          {/* 3rd */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl mb-2">
              ⭐
            </div>
            <div className="bg-gradient-to-br from-orange-400 to-orange-700 w-20 md:w-24 h-20 md:h-24 rounded-t-2xl flex flex-col items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-orange-900">3</span>
              <span className="text-white text-xs md:text-sm">300</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <button
            className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white font-bold py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base"
            disabled
          >
            🔄 Chơi lại
          </button>
          <button
            className="bg-gray-50 text-gray-900 font-bold py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-300 text-sm md:text-base"
            disabled
          >
            🚪 Thoát
          </button>
        </div>
      </div>
    </div>
  )
}
