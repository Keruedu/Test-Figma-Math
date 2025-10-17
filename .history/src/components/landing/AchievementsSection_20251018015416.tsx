export const AchievementsSection = () => {
  return (
    <div className="animate-fade-slide animate-delay-750">
      <div className="text-center mb-6 md:mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Thành tựu của bạn</h2>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Khám phá các cột mốc bạn đã đạt được và những thử thách đang chờ phía trước
        </p>
        
        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
          <button className="px-4 md:px-6 py-2 rounded-full bg-[#6E55FB] text-white font-semibold text-xs md:text-sm shadow-md hover:bg-[#5d47d4] transition-all">
            Tất cả
          </button>
          <button className="px-4 md:px-6 py-2 rounded-full bg-white text-gray-700 font-semibold text-xs md:text-sm border border-gray-200 hover:border-[#6E55FB] transition-all">
            Đã đạt được
          </button>
          <button className="px-4 md:px-6 py-2 rounded-full bg-white text-gray-700 font-semibold text-xs md:text-sm border border-gray-200 hover:border-[#6E55FB] transition-all">
            Chưa đạt được
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Achievement Stats Bar */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl md:rounded-3xl p-4 md:p-6 mb-6 border border-purple-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-black text-[#6E55FB]">12</p>
              <p className="text-xs md:text-sm text-gray-600 font-semibold">Đã đạt được</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-gray-400">8</p>
              <p className="text-xs md:text-sm text-gray-600 font-semibold">Đang thực hiện</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-[#6E55FB]">850</p>
              <p className="text-xs md:text-sm text-gray-600 font-semibold">Điểm thưởng</p>
            </div>
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Achievement 1 - Completed */}
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-[#6E55FB] hover:scale-105 transition-all cursor-pointer relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-[#6E55FB] text-white px-3 py-1 rounded-bl-xl text-xs font-bold">
              ✓ Đã đạt
            </div>
            <div className="text-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                Hoàn thành bài đầu tiên
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mb-3">
                Chúc mừng! Bạn đã hoàn thành bài kiểm tra đầu tiên
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-2 md:p-3 mb-3 border border-green-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs md:text-sm font-semibold text-green-700">Hoàn thành</span>
                <span className="text-xs md:text-sm font-bold text-green-700">1/1</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <span className="bg-purple-100 text-[#6E55FB] px-3 py-1 rounded-full font-bold">+50 điểm</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">3 ngày trước</span>
            </div>
          </div>

          {/* Achievement 2 - In Progress */}
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-200 hover:scale-105 hover:border-[#6E55FB] transition-all cursor-pointer group">
            <div className="text-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center shadow-md">
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                Chuỗi học 7 ngày
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mb-3">
                Học liên tục trong 7 ngày để mở khóa thành tựu này
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-2 md:p-3 mb-3 border border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs md:text-sm font-semibold text-blue-700">Tiến độ</span>
                <span className="text-xs md:text-sm font-bold text-blue-700">5/7 ngày</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: '71%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold">+100 điểm</span>
              <span className="text-gray-500">•</span>
              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded font-bold">+2 token</span>
            </div>
          </div>

          {/* Achievement 3 - Completed */}
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-[#6E55FB] hover:scale-105 transition-all cursor-pointer relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-[#6E55FB] text-white px-3 py-1 rounded-bl-xl text-xs font-bold">
              ✓ Đã đạt
            </div>
            <div className="text-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                Điểm số hoàn hảo
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mb-3">
                Đạt 10/10 điểm trong một bài kiểm tra
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-2 md:p-3 mb-3 border border-green-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs md:text-sm font-semibold text-green-700">Hoàn thành</span>
                <span className="text-xs md:text-sm font-bold text-green-700">10/10</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <span className="bg-purple-100 text-[#6E55FB] px-3 py-1 rounded-full font-bold">+75 điểm</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">1 tuần trước</span>
            </div>
          </div>

          {/* Achievement 4 - Locked */}
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-200 hover:scale-105 hover:border-gray-300 transition-all cursor-pointer opacity-75 group relative">
            <div className="absolute top-3 right-3 text-gray-400 text-sm font-bold">
              🔒
            </div>
            <div className="text-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center shadow-md">
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-500 mb-2">
                Vua toán học
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mb-3">
                Hoàn thành 50 bài kiểm tra với điểm trung bình 9.0+
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 md:p-3 mb-3 border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs md:text-sm font-semibold text-gray-500">Chưa mở khóa</span>
                <span className="text-xs md:text-sm font-bold text-gray-500">12/50</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-bold">+200 điểm</span>
              <span className="text-gray-400">•</span>
              <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded font-bold">+5 token</span>
            </div>
          </div>

          {/* Achievement 5 - In Progress */}
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-200 hover:scale-105 hover:border-[#6E55FB] transition-all cursor-pointer group">
            <div className="text-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-md">
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                Tốc độ ánh sáng
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mb-3">
                Hoàn thành 10 bài trong thời gian dưới 5 phút
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-2 md:p-3 mb-3 border border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs md:text-sm font-semibold text-blue-700">Tiến độ</span>
                <span className="text-xs md:text-sm font-bold text-blue-700">6/10 bài</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold">+80 điểm</span>
              <span className="text-gray-500">•</span>
              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded font-bold">+1 token</span>
            </div>
          </div>

          {/* Achievement 6 - Completed */}
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-[#6E55FB] hover:scale-105 transition-all cursor-pointer relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-[#6E55FB] text-white px-3 py-1 rounded-bl-xl text-xs font-bold">
              ✓ Đã đạt
            </div>
            <div className="text-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                Streak Master
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mb-3">
                Đạt chuỗi 10 câu đúng liên tiếp trong một trận
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-2 md:p-3 mb-3 border border-green-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs md:text-sm font-semibold text-green-700">Hoàn thành</span>
                <span className="text-xs md:text-sm font-bold text-green-700">10/10</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <span className="bg-purple-100 text-[#6E55FB] px-3 py-1 rounded-full font-bold">+150 điểm</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">2 ngày trước</span>
            </div>
          </div>
        </div>

        {/* Reward Summary Card */}
        <div className="mt-8 bg-gradient-to-br from-[#6E55FB] to-[#8b6fff] rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Điểm thưởng & Token AI</h3>
              <p className="text-sm md:text-base opacity-90 mb-4">
                Tổng điểm đã kiếm được từ các thành tựu
              </p>
              <div className="flex items-center gap-4 md:gap-6">
                <div>
                  <p className="text-xs md:text-sm opacity-75">Điểm thưởng</p>
                  <p className="text-3xl md:text-4xl font-black">850</p>
                </div>
                <div className="w-px h-12 bg-white opacity-30"></div>
                <div>
                  <p className="text-xs md:text-sm opacity-75">Token AI</p>
                  <p className="text-3xl md:text-4xl font-black">8</p>
                </div>
              </div>
            </div>
            <button className="bg-white text-[#6E55FB] font-bold py-3 px-6 md:px-8 rounded-xl hover:bg-gray-100 transition-all shadow-lg text-sm md:text-base">
              Đổi quà ngay
            </button>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-6 bg-purple-50 rounded-2xl p-4 md:p-6 border border-purple-100 text-center">
          <p className="text-sm md:text-base text-gray-700">
            <span className="font-bold text-[#6E55FB]">Tiếp tục phấn đấu!</span> Bạn còn{' '}
            <span className="font-bold">8 thành tựu</span> đang chờ được mở khóa.
          </p>
        </div>
      </div>
    </div>
  )
}
