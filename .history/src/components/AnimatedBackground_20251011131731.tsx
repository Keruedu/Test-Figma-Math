export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 text-6xl opacity-10 animate-float text-[#6E55FB]">
        ∑
      </div>
      <div
        className="absolute top-32 right-20 text-5xl opacity-10 animate-float text-[#6E55FB]"
        style={{ animationDelay: '1s' }}
      >
        π
      </div>
      <div
        className="absolute bottom-32 left-1/4 text-7xl opacity-10 animate-float text-[#6E55FB]"
        style={{ animationDelay: '2s' }}
      >
        ∞
      </div>
      <div
        className="absolute bottom-20 right-1/3 text-5xl opacity-10 animate-float text-[#6E55FB]"
        style={{ animationDelay: '1.5s' }}
      >
        √
      </div>
    </div>
  )
}
