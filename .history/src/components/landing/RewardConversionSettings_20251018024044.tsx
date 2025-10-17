import { useState } from 'react'

interface ConversionRate {
  id: number
  fromType: string
  toType: string
  rate: number
  minAmount: number
  maxAmount: number
  status: 'active' | 'inactive'
}

interface RewardItem {
  id: number
  name: string
  type: 'physical' | 'virtual' | 'voucher'
  pointCost: number
  stock: number
  status: 'available' | 'out-of-stock'
  image: string
}

const conversionRates: ConversionRate[] = [
  { id: 1, fromType: 'Điểm', toType: 'VNĐ', rate: 1000, minAmount: 100, maxAmount: 10000, status: 'active' },
  { id: 2, fromType: 'Điểm', toType: 'Coin Game', rate: 10, minAmount: 10, maxAmount: 5000, status: 'active' },
  { id: 3, fromType: 'VNĐ', toType: 'Điểm', rate: 0.001, minAmount: 10000, maxAmount: 1000000, status: 'active' },
  { id: 4, fromType: 'Điểm', toType: 'Thẻ cào', rate: 5000, minAmount: 500, maxAmount: 2000, status: 'inactive' }
]

const rewardItems: RewardItem[] = [
  { id: 1, name: 'Voucher 50k', type: 'voucher', pointCost: 500, stock: 25, status: 'available', image: '🎫' },
  { id: 2, name: 'Bút chì cao cấp', type: 'physical', pointCost: 200, stock: 50, status: 'available', image: '✏️' },
  { id: 3, name: 'Thẻ cào 100k', type: 'voucher', pointCost: 1000, stock: 0, status: 'out-of-stock', image: '💳' },
  { id: 4, name: 'Túi canvas', type: 'physical', pointCost: 800, stock: 15, status: 'available', image: '👜' },
  { id: 5, name: 'Avatar VIP', type: 'virtual', pointCost: 300, stock: 999, status: 'available', image: '🎨' },
  { id: 6, name: 'Sổ tay học tập', type: 'physical', pointCost: 350, stock: 30, status: 'available', image: '📓' }
]

export const RewardConversionSettings = () => {
  const [selectedTab, setSelectedTab] = useState<'rates' | 'items'>('rates')

  const getTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactElement> = {
      physical: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      virtual: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      voucher: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      )
    }
    return icons[type] || icons.physical
  }

  return (
    <div className="animate-fade-slide animate-delay-1000">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Thiết lập Quy đổi Thưởng
          </h2>
          <p className="text-gray-600">
            Quản lý tỷ lệ quy đổi và danh sách phần thưởng
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setSelectedTab('rates')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                selectedTab === 'rates'
                  ? 'bg-white text-[#6E55FB] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tỷ lệ quy đổi
            </button>
            <button
              onClick={() => setSelectedTab('items')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                selectedTab === 'items'
                  ? 'bg-white text-[#6E55FB] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Danh sách thưởng
            </button>
          </div>
        </div>

        {/* Conversion Rates Tab */}
        {selectedTab === 'rates' && (
          <div className="space-y-6">
            {/* Add New Rate Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Thêm tỷ lệ quy đổi mới
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Từ loại
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent">
                    <option>Điểm</option>
                    <option>VNĐ</option>
                    <option>Coin Game</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sang loại
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent">
                    <option>VNĐ</option>
                    <option>Điểm</option>
                    <option>Coin Game</option>
                    <option>Thẻ cào</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tỷ lệ quy đổi
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số lượng tối thiểu
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số lượng tối đa
                  </label>
                  <input
                    type="number"
                    placeholder="10000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                  />
                </div>

                <div className="flex items-end">
                  <button className="w-full bg-[#6E55FB] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5d47d4] transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Thêm mới
                  </button>
                </div>
              </div>
            </div>

            {/* Rates List */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Danh sách tỷ lệ quy đổi
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Quy đổi
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Tỷ lệ
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Giới hạn
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
                    {conversionRates.map((rate) => (
                      <tr key={rate.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="text-sm">
                              <span className="font-semibold text-gray-900">{rate.fromType}</span>
                              <svg className="inline mx-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                              <span className="font-semibold text-gray-900">{rate.toType}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <span className="font-bold text-[#6E55FB]">1 : {rate.rate.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">
                            <div>Min: <span className="font-semibold">{rate.minAmount.toLocaleString()}</span></div>
                            <div>Max: <span className="font-semibold">{rate.maxAmount.toLocaleString()}</span></div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
                            rate.status === 'active'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-gray-50 text-gray-700 border-gray-200'
                          }`}>
                            {rate.status === 'active' ? 'Đang hoạt động' : 'Tạm dừng'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Chỉnh sửa">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Bật/Tắt">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
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

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-purple-100">Tổng quy đổi</h4>
                  <svg className="w-8 h-8 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <p className="text-3xl font-bold">4 loại</p>
                <p className="text-sm text-purple-100 mt-1">Đang hoạt động: 3</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-green-100">Giao dịch hôm nay</h4>
                  <svg className="w-8 h-8 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-3xl font-bold">156</p>
                <p className="text-sm text-green-100 mt-1">+23% so với hôm qua</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-orange-100">Tổng giá trị</h4>
                  <svg className="w-8 h-8 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-3xl font-bold">2.4M VNĐ</p>
                <p className="text-sm text-orange-100 mt-1">Trong tháng này</p>
              </div>
            </div>
          </div>
        )}

        {/* Reward Items Tab */}
        {selectedTab === 'items' && (
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
