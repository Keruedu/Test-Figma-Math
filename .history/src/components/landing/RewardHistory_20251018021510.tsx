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
    description: 'Mua gói Premium (1 tháng)',
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
    const iconClass = "w-10 h-10"
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
                  <div className="flex items-center gap-4">
                    {/* Icon Circle */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      transaction.type === 'earn' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-orange-50 text-orange-600'
                    }`}>
                      {getPointIcon(transaction.category)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-base mb-1">
                        {transaction.description}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString('vi-VN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 bg-purple-50 text-[#6E55FB] text-xs font-semibold rounded-full">
                          {transaction.category === 'achievement' && 'Thành tựu'}
                          {transaction.category === 'game' && 'Trò chơi'}
                          {transaction.category === 'redeem' && 'Đổi quà'}
                          {transaction.category === 'streak' && 'Streak'}
                          {transaction.category === 'ranking' && 'Xếp hạng'}
                          {transaction.category === 'daily' && 'Hàng ngày'}
                        </span>
                      </div>
                    </div>

                    {/* Amount Badge */}
                    <div className={`px-4 py-2 rounded-full font-bold text-lg flex-shrink-0 ${
                      transaction.type === 'earn'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-orange-50 text-orange-600'
                    }`}>
                      {transaction.points > 0 ? '+' : ''}{transaction.points}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              currentMoneyTransactions.map((transaction) => (
                <div key={transaction.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Icon Circle */}
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

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-base mb-1">
                        {transaction.description}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(transaction.date).toLocaleDateString('vi-VN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                      <div className="flex gap-2">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          transaction.status === 'completed' 
                            ? 'bg-green-50 text-green-700'
                            : 'bg-yellow-50 text-yellow-700'
                        }`}>
                          {transaction.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                        </span>
                        <span className="inline-block px-3 py-1 bg-purple-50 text-[#6E55FB] text-xs font-semibold rounded-full">
                          {transaction.paymentMethod}
                        </span>
                      </div>
                    </div>

                    {/* Amount Badge */}
                    <div className={`px-4 py-2 rounded-full font-bold text-lg flex-shrink-0 ${
                      transaction.type === 'payment'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-green-50 text-green-600'
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

        {/* Summary Cards - Only show for Points tab */}
        {activeTab === 'points' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 px-4">
            {/* Total Balance Card */}
            <div className="bg-gradient-to-br from-[#6E55FB] to-[#8b6fff] rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm md:text-base opacity-90">Tổng điểm hiện có</span>
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                  <CoinIcon />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2">
                {currentBalance.toLocaleString()}
              </div>
              <div className="text-xs md:text-sm opacity-75">điểm thưởng</div>
            </div>

            {/* Earned This Month Card */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm md:text-base text-gray-600">Kiếm được tháng này</span>
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-green-600">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-black text-green-600 mb-2">
                +{earnedThisMonth.toLocaleString()}
              </div>
              <div className="text-xs md:text-sm text-gray-500">điểm thưởng</div>
            </div>

            {/* Spent This Month Card */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm md:text-base text-gray-600">Đã sử dụng tháng này</span>
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-orange-600">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-black text-orange-600 mb-2">
                -{spentThisMonth.toLocaleString()}
              </div>
              <div className="text-xs md:text-sm text-gray-500">điểm thưởng</div>
            </div>
          </div>
        )}

        {/* Filter Bar - Only show for Points tab */}
        {activeTab === 'points' && (
          <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg border border-gray-200 mb-6 md:mb-8 mx-4">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm giao dịch..."
                    className="w-full px-4 md:px-5 py-2.5 md:py-3 pl-11 md:pl-12 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 text-sm md:text-base placeholder-gray-400 focus:outline-none focus:border-[#6E55FB] transition-all"
                  />
                  <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 md:gap-3 overflow-x-auto">
                <button className="px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-[#6E55FB] text-white font-semibold text-sm md:text-base whitespace-nowrap shadow-md hover:bg-[#5d47d4] transition-all">
                  Tất cả
                </button>
                <button className="px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-white text-gray-700 font-semibold text-sm md:text-base border-2 border-gray-200 whitespace-nowrap hover:border-[#6E55FB] transition-all">
                  Kiếm được
                </button>
                <button className="px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-white text-gray-700 font-semibold text-sm md:text-base border-2 border-gray-200 whitespace-nowrap hover:border-[#6E55FB] transition-all">
                  Đã sử dụng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transactions List */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg border border-gray-200 mx-4">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-6 h-6 md:w-7 md:h-7 text-[#6E55FB]">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{activeTab === 'points' ? 'Lịch sử điểm' : 'Lịch sử giao dịch'}</span>
            </h3>
          </div>

          <div className="divide-y divide-gray-200">
            {activeTab === 'points' ? (
              // Points Transactions
              currentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 md:p-6 hover:bg-gray-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Icon */}
                    <div className={`
                      w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-md
                      ${transaction.type === 'earn' 
                        ? 'bg-green-50 text-green-600 border-2 border-green-200 group-hover:scale-110' 
                        : 'bg-orange-50 text-orange-600 border-2 border-orange-200 group-hover:scale-110'
                      }
                      transition-all
                    `}>
                      {getPointIcon(transaction.category)}
                    </div>

                    {/* Transaction Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base md:text-lg font-bold text-gray-900 truncate">
                            {transaction.description}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-500 mt-1">
                            {new Date(transaction.date).toLocaleDateString('vi-VN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>

                        {/* Points Badge */}
                        <div className={`
                          px-3 md:px-4 py-1.5 md:py-2 rounded-full font-black text-base md:text-lg whitespace-nowrap
                          ${transaction.type === 'earn'
                            ? 'bg-green-100 text-green-700 border-2 border-green-300'
                            : 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                          }
                        `}>
                          {transaction.points > 0 ? '+' : ''}{transaction.points.toLocaleString()}
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="mt-2">
                        <span className="inline-block px-2 md:px-3 py-0.5 md:py-1 bg-purple-50 text-[#6E55FB] text-xs font-semibold rounded-full border border-purple-200">
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
                </div>
              ))
            ) : (
              // Money Transactions
              currentMoneyTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 md:p-6 hover:bg-gray-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Icon */}
                    <div className={`
                      w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-md
                      ${transaction.type === 'payment' 
                        ? 'bg-blue-50 text-blue-600 border-2 border-blue-200 group-hover:scale-110' 
                        : 'bg-green-50 text-green-600 border-2 border-green-200 group-hover:scale-110'
                      }
                      transition-all
                    `}>
                      {getMoneyIcon(transaction.type)}
                    </div>

                    {/* Transaction Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base md:text-lg font-bold text-gray-900 truncate">
                            {transaction.description}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-500 mt-1">
                            {new Date(transaction.date).toLocaleDateString('vi-VN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>

                        {/* Amount Badge */}
                        <div className={`
                          px-3 md:px-4 py-1.5 md:py-2 rounded-full font-black text-base md:text-lg whitespace-nowrap
                          ${transaction.type === 'payment'
                            ? 'bg-red-100 text-red-700 border-2 border-red-300'
                            : 'bg-green-100 text-green-700 border-2 border-green-300'
                          }
                        `}>
                          {transaction.type === 'payment' ? '-' : '+'}{transaction.amount.toLocaleString()}đ
                        </div>
                      </div>

                      {/* Status and Payment Method */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-block px-2 md:px-3 py-0.5 md:py-1 text-xs font-semibold rounded-full border ${
                          transaction.status === 'completed' 
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {transaction.status === 'completed' && 'Hoàn thành'}
                          {transaction.status === 'pending' && 'Đang xử lý'}
                          {transaction.status === 'failed' && 'Thất bại'}
                        </span>
                        <span className="inline-block px-2 md:px-3 py-0.5 md:py-1 bg-purple-50 text-[#6E55FB] text-xs font-semibold rounded-full border border-purple-200">
                          {transaction.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More Button */}
          <div className="p-4 md:p-6 border-t border-gray-200">
            <button className="w-full bg-gray-50 text-gray-700 font-bold py-3 md:py-4 rounded-xl hover:bg-gray-100 transition-all border-2 border-gray-200 hover:border-[#6E55FB] text-sm md:text-base">
              Xem thêm {activeTab === 'points' ? 'giao dịch điểm' : 'giao dịch'}
            </button>
          </div>
        </div>

        {/* Info Card - Only show for Points tab */}
        {activeTab === 'points' && (
          <>
            <div className="mt-6 md:mt-8 bg-purple-50 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-purple-100 mx-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 text-[#6E55FB]">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
                    Cách tích điểm thưởng nhanh nhất:
                  </h5>
                  <ul className="space-y-2 text-xs md:text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-[#6E55FB] font-bold">✓</span>
                      <span>Hoàn thành nhiệm vụ hàng ngày (+25 điểm)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#6E55FB] font-bold">✓</span>
                      <span>Đạt Top 1 bảng xếp hạng (+200 điểm)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#6E55FB] font-bold">✓</span>
                      <span>Thắng trận Math Battle (+100 điểm)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#6E55FB] font-bold">✓</span>
                      <span>Đạt Streak 5 câu đúng liên tiếp (+50 điểm)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Monthly Summary Chart */}
            <div className="mt-6 md:mt-8 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg border border-gray-200 mx-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                <div className="w-6 h-6 text-[#6E55FB]">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <span>Tổng quan tháng này</span>
              </h3>
              
              <div className="space-y-4">
                {/* Earned Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm md:text-base font-semibold text-gray-700">Điểm kiếm được</span>
                    <span className="text-sm md:text-base font-bold text-green-600">+{earnedThisMonth}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all"
                      style={{ width: `${(earnedThisMonth / (earnedThisMonth + spentThisMonth)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Spent Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm md:text-base font-semibold text-gray-700">Điểm đã dùng</span>
                    <span className="text-sm md:text-base font-bold text-orange-600">-{spentThisMonth}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full transition-all"
                      style={{ width: `${(spentThisMonth / (earnedThisMonth + spentThisMonth)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Net Balance */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-base md:text-lg font-bold text-gray-900">Tổng tăng/giảm</span>
                    <span className={`text-xl md:text-2xl font-black ${
                      (earnedThisMonth - spentThisMonth) > 0 ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {(earnedThisMonth - spentThisMonth) > 0 ? '+' : ''}
                      {(earnedThisMonth - spentThisMonth).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
