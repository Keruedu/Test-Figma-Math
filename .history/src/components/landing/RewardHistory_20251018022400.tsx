import { useState } from 'react'

interface RewardHistoryProps {
  defaultTab?: 'points' | 'money'
}

interface PointTransaction {
  id: number
  date: string
  type: 'earn' | 'spend'
  description: string
  points: number
  category: string
}

interface MoneyTransaction {
  id: number
  date: string
  type: 'payment' | 'refund'
  description: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  paymentMethod: string
}

const pointTransactions: PointTransaction[] = [
  {
    id: 1,
    date: '2025-10-18',
    type: 'earn',
    description: 'Hoàn thành bài kiểm tra đầu tiên',
    points: 50,
    category: 'achievement'
  },
  {
    id: 2,
    date: '2025-10-17',
    type: 'earn',
    description: 'Thắng trận đấu Math Battle',
    points: 100,
    category: 'game'
  },
  {
    id: 3,
    date: '2025-10-17',
    type: 'spend',
    description: 'Đổi 5 Token AI',
    points: -100,
    category: 'redeem'
  },
  {
    id: 4,
    date: '2025-10-16',
    type: 'earn',
    description: 'Streak 5 câu đúng liên tiếp',
    points: 50,
    category: 'streak'
  },
  {
    id: 5,
    date: '2025-10-16',
    type: 'earn',
    description: 'Top 1 Bảng xếp hạng',
    points: 200,
    category: 'ranking'
  },
  {
    id: 6,
    date: '2025-10-15',
    type: 'spend',
    description: 'Đổi 15 Token AI (Gói Tiết kiệm)',
    points: -250,
    category: 'redeem'
  },
  {
    id: 7,
    date: '2025-10-15',
    type: 'earn',
    description: 'Hoàn thành nhiệm vụ hàng ngày',
    points: 25,
    category: 'daily'
  },
  {
    id: 8,
    date: '2025-10-14',
    type: 'earn',
    description: 'Điểm số hoàn hảo 10/10',
    points: 75,
    category: 'achievement'
  }
]

const moneyTransactions: MoneyTransaction[] = [
  {
    id: 1,
    date: '2025-10-15',
    type: 'payment',
    description: 'Hoàn tiền gói Premium',
    amount: 99000,
    status: 'completed',
    paymentMethod: 'PayOS'
  },
  {
    id: 2,
    date: '2025-10-10',
    type: 'payment',
    description: 'Nâng cấp gói Ultimate (3 tháng)',
    amount: 249000,
    status: 'completed',
    paymentMethod: 'SePay'
  },
  {
    id: 3,
    date: '2025-10-05',
    type: 'payment',
    description: 'Mua gói Basic (1 tháng)',
    amount: 99000,
    status: 'completed',
    paymentMethod: 'PayOS'
  },
  {
    id: 4,
    date: '2025-09-28',
    type: 'refund',
    description: 'Hoàn tiền gói Premium',
    amount: 99000,
    status: 'completed',
    paymentMethod: 'PayOS'
  }
]

export const RewardHistory = ({ defaultTab = 'points' }: RewardHistoryProps) => {
  const [activeTab, setActiveTab] = useState<'points' | 'money'>(defaultTab)
  const totalPoints = 1250
  const earnedThisMonth = 500
  const spentThisMonth = 350

  const currentTransactions = activeTab === 'points' ? pointTransactions : []
  const currentMoneyTransactions = activeTab === 'money' ? moneyTransactions : []

  const getPointIcon = (category: string) => {
    const iconClass = "w-6 h-6"
    switch (category) {
      case 'achievement':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'game':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'redeem':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
    }
  }

  return (
    <div className="animate-fade-slide animate-delay-900">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Lịch sử thưởng
          </h2>
          <p className="text-gray-600">
            Theo dõi chi tiết các giao dịch và điểm thưởng của bạn
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-3 mb-8 bg-gray-100 p-1.5 rounded-2xl max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('points')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'points'
                ? 'bg-[#6E55FB] text-white shadow-md'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Lịch sử điểm
          </button>
          <button
            onClick={() => setActiveTab('money')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'money'
                ? 'bg-[#6E55FB] text-white shadow-md'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Lịch sử giao dịch
          </button>
        </div>

        {/* Summary Cards - Only for Points */}
        {activeTab === 'points' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-[#6E55FB] to-[#8b6fff] rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-1">Tổng điểm</div>
              <div className="text-4xl font-black mb-1">{totalPoints.toLocaleString()}</div>
              <div className="text-xs opacity-75">điểm thưởng</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Kiếm được</div>
              <div className="text-4xl font-black text-green-600 mb-1">+{earnedThisMonth}</div>
              <div className="text-xs text-gray-500">tháng này</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Đã sử dụng</div>
              <div className="text-4xl font-black text-orange-600 mb-1">-{spentThisMonth}</div>
              <div className="text-xs text-gray-500">tháng này</div>
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Tìm kiếm giao dịch..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Date Range Filters */}
            <div className="flex gap-3">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="date"
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent text-sm min-w-[140px]"
                />
              </div>
              
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="date"
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent text-sm min-w-[140px]"
                />
              </div>

              <button className="px-4 py-2.5 bg-[#6E55FB] text-white rounded-xl font-semibold text-sm hover:bg-[#5d47d4] transition-colors">
                Lọc
              </button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">
              {activeTab === 'points' ? 'Lịch sử điểm' : 'Lịch sử giao dịch'}
            </h3>
          </div>

          <div className="divide-y divide-gray-100">
            {activeTab === 'points' ? (
              currentTransactions.map((transaction) => (
                <div key={transaction.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    {/* Left: Icon + Description */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        transaction.type === 'earn' 
                          ? 'bg-green-50 text-green-600' 
                          : 'bg-orange-50 text-orange-600'
                      }`}>
                        {getPointIcon(transaction.category)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-base truncate">
                          {transaction.description}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="inline-block px-2 py-0.5 bg-purple-50 text-[#6E55FB] text-xs font-semibold rounded-full">
                            {transaction.category === 'achievement' && 'Thành tựu'}
                            {transaction.category === 'game' && 'Trò chơi'}
                            {transaction.category === 'redeem' && 'Đổi quà'}
                            {transaction.category === 'streak' && 'Streak'}
                            {transaction.category === 'ranking' && 'Xếp hạng'}
                            {transaction.category === 'daily' && 'Hàng ngày'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Amount Badge */}
                    <div className={`px-5 py-2.5 rounded-xl font-bold text-lg flex-shrink-0 ${
                      transaction.type === 'earn'
                        ? 'bg-green-50 text-green-600 border border-green-200'
                        : 'bg-orange-50 text-orange-600 border border-orange-200'
                    }`}>
                      {transaction.points > 0 ? '+' : ''}{transaction.points}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              currentMoneyTransactions.map((transaction) => (
                <div key={transaction.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    {/* Left: Icon + Description */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        transaction.type === 'payment' 
                          ? 'bg-red-50 text-red-600' 
                          : 'bg-green-50 text-green-600'
                      }`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {transaction.type === 'payment' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          )}
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-base truncate">
                          {transaction.description}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </span>
                          <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                            transaction.status === 'completed' 
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                          }`}>
                            {transaction.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                          </span>
                          <span className="inline-block px-2 py-0.5 bg-purple-50 text-[#6E55FB] text-xs font-semibold rounded-full border border-purple-200">
                            {transaction.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Amount Badge */}
                    <div className={`px-5 py-2.5 rounded-xl font-bold text-lg flex-shrink-0 ${
                      transaction.type === 'payment'
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : 'bg-green-50 text-green-600 border border-green-200'
                    }`}>
                      {transaction.type === 'payment' ? '-' : '+'}
                      {transaction.amount.toLocaleString()}đ
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More */}
          <div className="p-4 border-t border-gray-200">
            <button className="w-full py-3 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Xem thêm
            </button>
          </div>
        </div>

        {/* Bottom Info - Points only */}
        {activeTab === 'points' && (
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
              <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6E55FB]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Cách tích điểm nhanh
              </h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#6E55FB] mt-0.5">✓</span>
                  <span>Hoàn thành nhiệm vụ hàng ngày (+25 điểm)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6E55FB] mt-0.5">✓</span>
                  <span>Thắng trận Math Battle (+100 điểm)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6E55FB] mt-0.5">✓</span>
                  <span>Đạt Top 1 bảng xếp hạng (+200 điểm)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h5 className="font-bold text-gray-900 mb-4">Tổng quan tháng này</h5>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Kiếm được</span>
                    <span className="font-bold text-green-600">+{earnedThisMonth}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-600"
                      style={{ width: `${(earnedThisMonth / (earnedThisMonth + spentThisMonth)) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Đã dùng</span>
                    <span className="font-bold text-orange-600">-{spentThisMonth}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
                      style={{ width: `${(spentThisMonth / (earnedThisMonth + spentThisMonth)) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Tổng tăng/giảm</span>
                    <span className="text-2xl font-black text-green-600">
                      +{earnedThisMonth - spentThisMonth}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
