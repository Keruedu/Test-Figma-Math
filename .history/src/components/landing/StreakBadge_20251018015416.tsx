interface StreakBadgeProps {
  streak: number
  isHot?: boolean
}

export const StreakBadge = ({ streak, isHot }: StreakBadgeProps) => (
  <div className="flex justify-center mb-3 md:mb-4">
    <div className={`bg-gradient-to-r from-orange-400 to-red-500 px-3 md:px-4 py-1 rounded-full shadow-lg border-2 border-orange-300 ${isHot ? 'animate-pulse' : ''}`}>
      <p className="text-white font-bold text-xs">
        🔥 Streak x{streak}{isHot ? ' - Đang cháy!' : ''}
      </p>
    </div>
  </div>
)
