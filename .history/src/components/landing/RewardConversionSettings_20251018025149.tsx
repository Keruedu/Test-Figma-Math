import { useState } from 'react'

interface TokenPackage {
  id: number
  name: string
  tokens: number
  price: number
  status: 'active' | 'inactive'
}

interface AchievementReward {
  id: number
  type: 'achievement' | 'arena'
  name: string
  tokenReward: number
  status: 'active' | 'inactive'
}

const tokenPackages: TokenPackage[] = [
  { id: 1, name: 'Gói Starter', tokens: 100, price: 20000, status: 'active' },
  { id: 2, name: 'Gói Basic', tokens: 500, price: 90000, status: 'active' },
  { id: 3, name: 'Gói Pro', tokens: 1000, price: 150000, status: 'active' },
  { id: 4, name: 'Gói Premium', tokens: 2000, price: 250000, status: 'active' }
]

const achievementRewards: AchievementReward[] = [
  { id: 1, type: 'achievement', name: 'Hoàn thành 10 bài', tokenReward: 50, status: 'active' },
  { id: 2, type: 'achievement', name: 'Hoàn thành 50 bài', tokenReward: 300, status: 'active' },
  { id: 3, type: 'achievement', name: 'Streak 7 ngày', tokenReward: 100, status: 'active' },
  { id: 4, type: 'arena', name: 'Top 1 Đấu trường', tokenReward: 500, status: 'active' },
  { id: 5, type: 'arena', name: 'Top 3 Đấu trường', tokenReward: 200, status: 'active' },
  { id: 6, type: 'arena', name: 'Tham gia Đấu trường', tokenReward: 50, status: 'active' }
]

export const RewardConversionSettings = () => {
  const [selectedTab, setSelectedTab] = useState<'packages' | 'rewards'>('packages')

  return (
    <div className="animate-fade-slide animate-delay-1000">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Quản lý Token & Gói mua
          </h2>
          <p className="text-gray-600">
            Cài đặt gói Token và phần thưởng thành tựu
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setSelectedTab('packages')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                selectedTab === 'packages'
                  ? 'bg-white text-[#6E55FB] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Gói Token
            </button>
            <button
              onClick={() => setSelectedTab('rewards')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                selectedTab === 'rewards'
                  ? 'bg-white text-[#6E55FB] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Phần thưởng Token
            </button>
          </div>
        </div>

        {/* Token Packages Tab */}
        {selectedTab === 'packages' && (
        {/* Token Packages Tab */}
        {selectedTab === 'packages' && (
          <div className="space-y-6">
            {/* Add New Package */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Thêm gói Token mới
              </h3>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên gói
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Gói Basic"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số Token
                  </label>
                  <input
                    type="number"
                    placeholder="500"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giá (VNĐ)
                  </label>
                  <input
                    type="number"
                    placeholder="90000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                  />
                </div>

                <div className="flex items-end">
                  <button className="w-full bg-[#6E55FB] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5d47d4] transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Thêm
                  </button>
                </div>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tokenPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#6E55FB] transition-all hover:shadow-lg">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-bold">{pkg.name}</h4>
                      <span className={`w-3 h-3 rounded-full ${pkg.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`} />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold">{pkg.tokens.toLocaleString()}</p>
                      <p className="text-purple-200">Token</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Giá bán</p>
                      <p className="text-2xl font-bold text-gray-900">{pkg.price.toLocaleString()} đ</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span>SePay / PayOS</span>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100 transition-colors text-sm">
                        Sửa
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors text-sm">
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">SePay</h4>
                    <p className="text-blue-100 text-sm">Thanh toán tự động</p>
                  </div>
                </div>
                <p className="text-3xl font-bold">156 giao dịch</p>
                <p className="text-blue-100 text-sm mt-1">Hôm nay</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">PayOS</h4>
                    <p className="text-green-100 text-sm">Cổng thanh toán</p>
                  </div>
                </div>
                <p className="text-3xl font-bold">89 giao dịch</p>
                <p className="text-green-100 text-sm mt-1">Hôm nay</p>
              </div>
            </div>
          </div>
        )}

        {/* Token Rewards Tab */}
        {selectedTab === 'rewards' && (
          <div className="space-y-6">
            {/* Add New Item Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Thêm phần thưởng mới
              </h3>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên phần thưởng
                  </label>
                  <input
                    type="text"
                    placeholder="Voucher, quà tặng..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loại
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent">
                    <option value="physical">Vật lý</option>
                    <option value="virtual">Ảo</option>
                    <option value="voucher">Voucher</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Điểm đổi
                  </label>
                  <input
                    type="number"
                    placeholder="500"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button className="bg-[#6E55FB] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5d47d4] transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Thêm phần thưởng
                </button>
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewardItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center text-4xl">
                        {item.image}
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'available'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          item.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        {item.status === 'available' ? 'Còn hàng' : 'Hết hàng'}
                      </div>
                    </div>

                    <h4 className="font-bold text-gray-900 text-lg mb-2">{item.name}</h4>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 text-gray-600">
                        {getTypeIcon(item.type)}
                        <span className="text-sm capitalize">
                          {item.type === 'physical' && 'Vật lý'}
                          {item.type === 'virtual' && 'Ảo'}
                          {item.type === 'voucher' && 'Voucher'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500">Điểm đổi</p>
                        <p className="text-xl font-bold text-[#6E55FB]">{item.pointCost}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Tồn kho</p>
                        <p className="text-xl font-bold text-gray-900">{item.stock}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100 transition-colors text-sm">
                        Chỉnh sửa
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors text-sm">
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-600 mb-1">Tổng phần thưởng</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-600 mb-1">Đang còn hàng</p>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-600 mb-1">Đã đổi hôm nay</p>
                <p className="text-2xl font-bold text-[#6E55FB]">23</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-600 mb-1">Tổng tồn kho</p>
                <p className="text-2xl font-bold text-orange-600">1,119</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
