export const PaymentPlans = () => {
  return (
    <div className="animate-fade-slide animate-delay-600">
      <div className="text-center mb-6 md:mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Thanh toán gói học</h2>
        <p className="text-sm md:text-base text-gray-600">Chọn gói phù hợp để nâng cao kỹ năng toán học</p>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {/* Gói Cơ bản */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Gói Cơ bản</h3>
            <div className="mb-6">
              <span className="text-4xl md:text-5xl font-black text-[#6E55FB]">99.000đ</span>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2 text-sm md:text-base">
                <span className="text-yellow-500 text-lg">💰</span>
                <span className="text-gray-700">100 coins</span>
              </div>
              <div className="flex items-start gap-2 text-sm md:text-base">
                <span className="text-gray-400 text-lg">✏️</span>
                <span className="text-gray-700">50 lượt hỏi đáp</span>
              </div>
              <div className="flex items-start gap-2 text-sm md:text-base">
                <span className="text-gray-400 text-lg">📝</span>
                <span className="text-gray-700">100 lượt sinh bài tập</span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-500 mb-6">Phù hợp cho học sinh mới bắt đầu</p>
            <button className="w-full bg-gray-50 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all border border-gray-200">
              Chọn gói
            </button>
          </div>

          {/* Gói Nâng cao - POPULAR */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border-2 border-[#6E55FB] relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#6E55FB] text-white px-4 py-1 rounded-full text-xs md:text-sm font-bold shadow-lg">
              PHỔ BIẾN NHẤT
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Gói Nâng cao</h3>
            <div className="mb-6">
              <span className="text-4xl md:text-5xl font-black text-[#6E55FB]">249.000đ</span>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2 text-sm md:text-base">
                <span className="text-yellow-500 text-lg">💰</span>
                <span className="text-gray-700">300 coins</span>
              </div>
              <div className="flex items-start gap-2 text-sm md:text-base">
                <span className="text-gray-400 text-lg">✏️</span>
                <span className="text-gray-700">200 lượt hỏi đáp</span>
              </div>
              <div className="flex items-start gap-2 text-sm md:text-base">
                <span className="text-gray-400 text-lg">📝</span>
                <span className="text-gray-700">500 lượt sinh bài tập</span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-500 mb-6">Dành cho học sinh muốn nâng cao kiến thức</p>
            <button className="w-full bg-[#6E55FB] text-white font-bold py-3 rounded-xl hover:bg-[#5d47d4] transition-all shadow-md">
              Chọn gói
            </button>
          </div>

          {/* Gói Premium */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Gói Premium</h3>
            <div className="mb-6">
              <span className="text-4xl md:text-5xl font-black text-[#6E55FB]">399.000đ</span>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2 text-sm md:text-base">
                <span className="text-yellow-500 text-lg">💰</span>
                <span className="text-gray-700">500 coins</span>
              </div>
              <div className="flex items-start gap-2 text-sm md:text-base">
                <span className="text-gray-400 text-lg">✏️</span>
                <span className="text-gray-700">500 lượt hỏi đáp</span>
              </div>
              <div className="flex items-start gap-2 text-sm md:text-base">
                <span className="text-gray-400 text-lg">📝</span>
                <span className="text-gray-700">700 lượt sinh bài tập</span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-500 mb-6">Gói cao cấp, học tập thoải mái</p>
            <button className="w-full bg-gray-50 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all border border-gray-200">
              Chọn gói
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#6E55FB] bg-white cursor-pointer hover:bg-purple-50 transition-all">
              <div className="w-12 h-12 bg-[#6E55FB] rounded-lg flex items-center justify-center text-white text-2xl">
                💳
              </div>
              <div>
                <h5 className="font-bold text-gray-900 text-sm md:text-base">PayOS</h5>
                <p className="text-xs md:text-sm text-gray-600">Visa, Mastercard, JCB</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-all">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                📱
              </div>
              <div>
                <h5 className="font-bold text-gray-900 text-sm md:text-base">SePay</h5>
                <p className="text-xs md:text-sm text-gray-600">Thanh toán qua QR</p>
              </div>
            </div>
          </div>
          <button className="w-full bg-[#6E55FB] text-white font-bold py-3 md:py-4 rounded-xl hover:bg-[#5d47d4] transition-all shadow-md text-sm md:text-base">
            Xác nhận thanh toán
          </button>
        </div>
      </div>
    </div>
  )
}
