export const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="confetti-piece absolute w-3 h-3 rounded"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ['#6E55FB', '#FF6B9D', '#FFC837', '#4ECDC4'][
              Math.floor(Math.random() * 4)
            ],
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  )
}
