import { useState } from 'react'

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

export const RewardHistory = () => {
  const [activeTab, setActiveTab] = useState<'points' | 'money'>('points')
  const totalPoints = 1250
  const earnedThisMonth = 500
  const spentThisMonth = 350
  const currentBalance = totalPoints

  // Get transactions based on active tab
  const currentTransactions = activeTab === 'points' ? pointTransactions : []
  const currentMoneyTransactions = activeTab === 'money' ? moneyTransactions : []

  // Icon components
  const TrophyIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8a1 1 0 00-.553.894l.553-.894zm-2.553.894a1 1 0 01.553-.894l-.553.894zM10 11.732l.659-.753a1 1 0 00-1.318 0l.659.753z" />
    </svg>
  )

  const CoinIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
    </svg>
  )

  const FireIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
    </svg>
  )

  const TargetIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
  )

  const RobotIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2z" />
      <path fillRule="evenodd" d="M4.25 7a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H4.25zM3 11.25a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
  )

  const CheckIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )

  const StarIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )

  const CrownIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
    </svg>
  )

  const CreditCardIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
    </svg>
  )

  const RefreshIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
    </svg>
  )

  const getPointIcon = (category: string) => {
    switch (category) {
      case 'achievement': return <TargetIcon />
      case 'game': return <TrophyIcon />
      case 'redeem': return <RobotIcon />
      case 'streak': return <FireIcon />
      case 'ranking': return <CrownIcon />
      case 'daily': return <CheckIcon />
      default: return <StarIcon />
    }
  }

  const getMoneyIcon = (type: string) => {
    return type === 'payment' ? <CreditCardIcon /> : <RefreshIcon />
  }

  return (
    <div className="animate-fade-slide animate-delay-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Lịch sử thưởng
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Theo dõi chi tiết các giao dịch và điểm thưởng của bạn
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 px-4 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('points')}
            className={`flex-1 py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-sm md:text-base transition-all ${
              activeTab === 'points'
                ? 'bg-[#6E55FB] text-white shadow-lg shadow-[#6E55FB]/30'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#6E55FB]'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <CoinIcon />
              <span>Lịch sử điểm</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('money')}
            className={`flex-1 py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-sm md:text-base transition-all ${
              activeTab === 'money'
                ? 'bg-[#6E55FB] text-white shadow-lg shadow-[#6E55FB]/30'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#6E55FB]'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <CreditCardIcon />
              <span>Lịch sử giao dịch</span>
            </div>
          </button>
        </div>

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

        {/* Filter Bar */}
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
                <span className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg md:text-xl">
                  🔍
                </span>
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
                Đã đổi
              </button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg border border-gray-200 mx-4">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span>📋</span>
              <span>Lịch sử giao dịch</span>
            </h3>
          </div>

          <div className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 md:p-6 hover:bg-gray-50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Icon */}
                  <div className={`
                    w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-md
                    ${transaction.type === 'earn' 
                      ? 'bg-green-50 border-2 border-green-200 group-hover:scale-110' 
                      : 'bg-orange-50 border-2 border-orange-200 group-hover:scale-110'
                    }
                    transition-all
                  `}>
                    {transaction.icon}
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
                        {transaction.category === 'achievement' && '🏅 Thành tựu'}
                        {transaction.category === 'game' && '🎮 Trò chơi'}
                        {transaction.category === 'redeem' && '🎁 Đổi quà'}
                        {transaction.category === 'streak' && '🔥 Streak'}
                        {transaction.category === 'ranking' && '📊 Xếp hạng'}
                        {transaction.category === 'daily' && '📅 Hàng ngày'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="p-4 md:p-6 border-t border-gray-200">
            <button className="w-full bg-gray-50 text-gray-700 font-bold py-3 md:py-4 rounded-xl hover:bg-gray-100 transition-all border-2 border-gray-200 hover:border-[#6E55FB] text-sm md:text-base">
              Xem thêm giao dịch
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 md:mt-8 bg-purple-50 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-purple-100 mx-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl md:text-3xl">💡</span>
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
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
            📊 Tổng quan tháng này
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
      </div>
    </div>
  )
}
