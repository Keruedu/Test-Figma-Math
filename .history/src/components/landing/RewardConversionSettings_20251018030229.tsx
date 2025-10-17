import { useState } from 'react'

interface Package {
  id: number
  name: string
  tokens: number
  points: number
  price: number
  purchaseType: 'money' | 'points'
  status: 'active' | 'inactive'
}

interface Reward {
  id: number
  type: 'achievement' | 'arena'
  name: string
  tokenReward: number
  pointReward: number
  status: 'active' | 'inactive'
}

const packages: Package[] = [
  { id: 1, name: 'Gói Starter', tokens: 100, points: 0, price: 20000, purchaseType: 'money', status: 'active' },
  { id: 2, name: 'Gói Basic', tokens: 500, points: 0, price: 90000, purchaseType: 'money', status: 'active' },
  { id: 3, name: 'Gói Pro', tokens: 1000, points: 0, price: 150000, purchaseType: 'money', status: 'active' },
  { id: 4, name: 'Gói Premium', tokens: 2000, points: 0, price: 250000, purchaseType: 'money', status: 'active' },
  { id: 5, name: 'Gói đổi điểm S', tokens: 50, points: 0, price: 100, purchaseType: 'points', status: 'active' },
  { id: 6, name: 'Gói đổi điểm M', tokens: 150, points: 0, price: 250, purchaseType: 'points', status: 'active' },
  { id: 7, name: 'Gói đổi điểm L', tokens: 500, points: 0, price: 800, purchaseType: 'points', status: 'active' }
]

const rewards: Reward[] = [
  { id: 1, type: 'achievement', name: 'Hoàn thành 10 bài', tokenReward: 0, pointReward: 50, status: 'active' },
  { id: 2, type: 'achievement', name: 'Hoàn thành 50 bài', tokenReward: 50, pointReward: 300, status: 'active' },
  { id: 3, type: 'achievement', name: 'Streak 7 ngày', tokenReward: 20, pointReward: 100, status: 'active' },
  { id: 4, type: 'arena', name: 'Top 1 Đấu trường', tokenReward: 100, pointReward: 500, status: 'active' },
  { id: 5, type: 'arena', name: 'Top 3 Đấu trường', tokenReward: 50, pointReward: 200, status: 'active' },
  { id: 6, type: 'arena', name: 'Tham gia Đấu trường', tokenReward: 10, pointReward: 50, status: 'active' }
]

export const RewardConversionSettings = () => {
  const [selectedTab, setSelectedTab] = useState<'packages' | 'rewards'>('packages')

  return (
    <div className="animate-fade-slide animate-delay-1000">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Quản lý Gói & Phần thưởng
          </h2>
          <p className="text-gray-600">
            Cài đặt gói mua và phần thưởng cho người dùng
          </p>
        </div>

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
              Gói
            </button>
            <button
              onClick={() => setSelectedTab('rewards')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                selectedTab === 'rewards'
                  ? 'bg-white text-[#6E55FB] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Phần thưởng
            </button>
          </div>
        </div>

        {selectedTab === 'packages' ? (
          <div className="space-y-6">
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
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Thêm phần thưởng Token
              </h3>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loại
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent">
                    <option value="achievement">Thành tựu</option>
                    <option value="arena">Đấu trường</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên thành tích
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Hoàn thành 10 bài"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Token thưởng
                  </label>
                  <input
                    type="number"
                    placeholder="50"
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

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                  Danh sách phần thưởng Token
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Loại
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Tên thành tích
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Token thưởng
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {achievementRewards.map((reward) => (
                      <tr key={reward.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
                            reward.type === 'achievement'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-purple-50 text-purple-700 border-purple-200'
                          }`}>
                            {reward.type === 'achievement' ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                              </svg>
                            )}
                            {reward.type === 'achievement' ? 'Thành tựu' : 'Đấu trường'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{reward.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#6E55FB]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                            <span className="text-lg font-bold text-[#6E55FB]">{reward.tokenReward.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
                            reward.status === 'active'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-gray-50 text-gray-700 border-gray-200'
                          }`}>
                            {reward.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Chỉnh sửa">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-blue-100">Thành tựu</h4>
                  <svg className="w-8 h-8 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <p className="text-3xl font-bold">3 loại</p>
                <p className="text-sm text-blue-100 mt-1">Tổng: 450 Token</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-purple-100">Đấu trường</h4>
                  <svg className="w-8 h-8 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <p className="text-3xl font-bold">3 loại</p>
                <p className="text-sm text-purple-100 mt-1">Tổng: 750 Token</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-orange-100">Token phát ra</h4>
                  <svg className="w-8 h-8 text-orange-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-3xl font-bold">12,500</p>
                <p className="text-sm text-orange-100 mt-1">Hôm nay</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
