interface GameHeaderProps {
  questionNum: number
  timer: string
  timerColor: string
  score: number
}

export const GameHeader = ({ questionNum, timer, timerColor, score }: GameHeaderProps) => (
  <div className="flex justify-between items-center gap-2 mb-3 md:mb-4">
    <div className="bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-md border border-gray-200">
      <p className="text-gray-900 font-bold text-xs md:text-sm">Câu {questionNum}/10</p>
    </div>
    <div className={`bg-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg md:rounded-xl border-2 border-${timerColor} shadow-md ${timerColor === 'red-500' ? 'animate-pulse' : ''}`}>
      <p className={`font-bold text-base md:text-lg text-${timerColor}`}>⏱️ {timer}</p>
    </div>
    <div className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-md">
      <p className="text-white font-bold text-xs md:text-sm">🏆 {score}</p>
    </div>
  </div>
)
