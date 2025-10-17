import React from 'react'
import type { GameScreen } from '../../types'

interface Props {
  onNavigate: (screen: GameScreen, questionIndex?: number) => void
}

export const AchievementsSection: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-slide animate-delay-750">
      <div className="text-center mb-6 md:mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Thành tựu của bạn</h2>
        <p className="text-sm md:text-base text-gray-600 mb-4">Khám phá các cột mốc bạn đã đạt được và những thử thách đang chờ phía trước</p>

        <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
          <button className="px-4 md:px-6 py-2 rounded-full bg-[#6E55FB] text-white font-semibold text-xs md:text-sm shadow-md hover:bg-[#5d47d4] transition-all">Tất cả</button>
          <button className="px-4 md:px-6 py-2 rounded-full bg-white text-gray-700 font-semibold text-xs md:text-sm border border-gray-200 hover:border-[#6E55FB] transition-all">Đã đạt được</button>
          <button className="px-4 md:px-6 py-2 rounded-full bg-white text-gray-700 font-semibold text-xs md:text-sm border border-gray-200 hover:border-[#6E55FB] transition-all">Chưa đạt được</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Card examples - keep simple and data-driven later */}
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-[#6E55FB] hover:scale-105 transition-all cursor-pointer relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-[#6E55FB] text-white px-3 py-1 rounded-bl-xl text-xs font-bold">✓ Đã đạt</div>
            <div className="text-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-pulse" />
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Hoàn thành bài đầu tiên</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-3">Chúc mừng! Bạn đã hoàn thành bài kiểm tra đầu tiên</p>
            </div>
            <div className="bg-green-50 rounded-lg p-2 md:p-3 mb-3 border border-green-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs md:text-sm font-semibold text-green-700">Hoàn thành</span>
                <span className="text-xs md:text-sm font-bold text-green-700">1/1</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <span className="bg-purple-100 text-[#6E55FB] px-3 py-1 rounded-full font-bold">+50 điểm</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">3 ngày trước</span>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-200 hover:scale-105 hover:border-[#6E55FB] transition-all cursor-pointer group">
            <div className="text-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full shadow-md" />
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Chuỗi học 7 ngày</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-3">Học liên tục trong 7 ngày để mở khóa thành tựu này</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-2 md:p-3 mb-3 border border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs md:text-sm font-semibold text-blue-700">Tiến độ</span>
I```