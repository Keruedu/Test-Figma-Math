export const TokenExchange = () => {
  return (
    <div className="animate-fade-slide animate-delay-700">
      <div className="text-center mb-6 md:mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Đổi Token AI</h2>
        <p className="text-sm md:text-base text-gray-600">Dùng điểm thưởng để đổi token sinh đề kiểm tra</p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200">
          {/* Current Balance */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 border border-purple-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm md:text-base text-gray-600 mb-1">Điểm thưởng hiện có</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl md:text-4xl font-black text-[#6E55FB]">1,250</span>
                  <span className="text-lg md:text-xl text-gray-600">điểm</span>
                </div>
              </div>
              <div>
                <p className="text-sm md:text-base text-gray-600 mb-1">Token AI hiện có</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl md:text-4xl">🤖</span>
                  <span className="text-3xl md:text-4xl font-black text-[#6E55FB]">25</span>
                  <span className="text-lg md:text-xl text-gray-600">tokens</span>
                </div>
              </div>
            </div>
          </div>

          {/* Exchange Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 hover:border-[#6E55FB] hover:shadow-xl transition-all cursor-pointer">
              <div className="text-center">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Gói Cơ bản</h4>
                <div className="mb-4">
                  <span className="text-2xl md:text-3xl font-black text-[#6E55FB]">5 tokens</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-xl md:text-2xl font-bold text-gray-700">100 điểm</span>
                </div>
                <button className="w-full bg-gray-50 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-100 transition-all border border-gray-200 text-sm md:text-base">
                  Đổi ngay
                </button>
              </div>
            </div>

            <div className="bg-[#6E55FB] rounded-xl p-4 md:p-6 shadow-xl border-2 border-[#6E55FB] relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-[#6E55FB] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                PHỔ BIẾN
              </div>
              <div className="text-center">
                <h4 className="text-lg md:text-xl font-bold text-white mb-2">Gói Tiết kiệm</h4>
                <div className="mb-4">
                  <span className="text-2xl md:text-3xl font-black text-white">15 tokens</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-xl md:text-2xl font-bold text-white">250 điểm</span>
                  <span className="text-xs bg-white text-[#6E55FB] px-2 py-0.5 rounded-full font-bold">-17%</span>
                </div>
                <button className="w-full bg-white text-[#6E55FB] font-bold py-2 rounded-lg hover:bg-gray-100 transition-all text-sm md:text-base">
                  Đổi ngay
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 hover:border-[#6E55FB] hover:shadow-xl transition-all cursor-pointer">
              <div className="text-center">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Gói Cao cấp</h4>
                <div className="mb-4">
                  <span className="text-2xl md:text-3xl font-black text-[#6E55FB]">50 tokens</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-xl md:text-2xl font-bold text-gray-700">750 điểm</span>
                  <span className="text-xs bg-[#6E55FB] text-white px-2 py-0.5 rounded-full font-bold">-25%</span>
                </div>
                <button className="w-full bg-gray-50 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-100 transition-all border border-gray-200 text-sm md:text-base">
                  Đổi ngay
                </button>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-purple-50 rounded-xl p-4 md:p-6 border border-purple-100">
            <div className="flex items-start gap-3">
              <span className="text-2xl md:text-3xl">💡</span>
              <div className="flex-1">
                <h5 className="font-bold text-gray-900 mb-2 text-sm md:text-base">Token AI dùng để làm gì?</h5>
                <ul className="space-y-2 text-xs md:text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-[#6E55FB]">✓</span>
                    <span>Sinh đề kiểm tra tự động với AI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#6E55FB]">✓</span>
                    <span>Tùy chỉnh độ khó và dạng câu hỏi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#6E55FB]">✓</span>
                    <span>Nhận giải thích chi tiết cho mỗi câu</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#6E55FB]">★</span>
                    <span className="font-semibold">1 token = 1 đề kiểm tra (10 câu hỏi)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Earning Points */}
          <div className="mt-6 bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl md:text-3xl">🎯</span>
              <div className="flex-1">
                <h5 className="font-bold text-gray-900 mb-2 text-sm md:text-base">Cách kiếm điểm thưởng:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-100 text-[#6E55FB] px-2 py-1 rounded font-bold">+100</span>
                    <span className="text-gray-700">Thắng 1 trận đấu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-100 text-[#6E55FB] px-2 py-1 rounded font-bold">+50</span>
                    <span className="text-gray-700">Streak 5 câu liên tiếp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-100 text-[#6E55FB] px-2 py-1 rounded font-bold">+200</span>
                    <span className="text-gray-700">Top 1 bảng xếp hạng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-100 text-[#6E55FB] px-2 py-1 rounded font-bold">+25</span>
                    <span className="text-gray-700">Hoàn thành hàng ngày</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
