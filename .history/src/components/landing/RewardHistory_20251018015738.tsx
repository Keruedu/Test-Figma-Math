interface Transaction {
  id: number
  date: string
  type: 'earn' | 'redeem'
  description: string
  points: number
  icon: string
  category: string
}

const transactions: Transaction[] = [
  {
    id: 1,
    date: '2025-10-18',
    type: 'earn',
    description: 'Hoàn thành bài kiểm tra đầu tiên',
    points: 50,
    icon: '🎯',
    category: 'achievement'
  },
  {
    id: 2,
    date: '2025-10-17',
    type: 'earn',
    description: 'Thắng trận đấu Math Battle',
    points: 100,
    icon: '🏆',
    category: 'game'
  },
  {
    id: 3,
    date: '2025-10-17',
    type: 'redeem',
    description: 'Đổi 5 Token AI',
    points: -100,
    icon: '🤖',
    category: 'redeem'
  },
  {
    id: 4,
    date: '2025-10-16',
    type: 'earn',
    description: 'Streak 5 câu đúng liên tiếp',
    points: 50,
    icon: '🔥',
    category: 'streak'
  },
  {
    id: 5,
    date: '2025-10-16',
    type: 'earn',
    description: 'Top 1 Bảng xếp hạng',
    points: 200,
    icon: '👑',
    category: 'ranking'
  },
  {
    id: 6,
    date: '2025-10-15',
    type: 'redeem',
    description: 'Đổi 15 Token AI (Gói Tiết kiệm)',
    points: -250,
    icon: '🤖',
    category: 'redeem'
  },
  {
    id: 7,
    date: '2025-10-15',
    type: 'earn',
    description: 'Hoàn thành nhiệm vụ hàng ngày',
    points: 25,
    icon: '✅',
    category: 'daily'
  },
  {
    id: 8,
    date: '2025-10-14',
    type: 'earn',
    description: 'Điểm số hoàn hảo 10/10',
    points: 75,
    icon: '⭐',
    category: 'achievement'
  }
]

export const RewardHistory = () => {
  const totalPoints = 1250
  const earnedThisMonth = 500
  const spentThisMonth = 350
  const currentBalance = totalPoints

  return (
    <div className="animate-fade-slide animate-delay-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            💎 Lịch sử Điểm thưởng
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Theo dõi chi tiết các giao dịch điểm thưởng của bạn
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 px-4">
          {/* Total Balance Card */}
          <div className="bg-gradient-to-br from-[#6E55FB] to-[#8b6fff] rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm md:text-base opacity-90">Tổng điểm hiện có</span>
              <span className="text-2xl md:text-3xl">💰</span>
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
              <span className="text-2xl md:text-3xl">📈</span>
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
              <span className="text-2xl md:text-3xl">📉</span>
            </div>
            <div className="text-3xl md:text-4xl font-black text-orange-600 mb-2">
              -{spentThisMonth.toLocaleString()}
            </div>
            <div className="text-xs md:text-sm text-gray-500">điểm thưởng</div>
          </div>
        </div>

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
