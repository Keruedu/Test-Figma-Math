import type { GameScreen } from '../types'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { LobbyPreview } from '../components/landing/LobbyPreview'
import { QuestionPreview } from '../components/landing/QuestionPreview'
import { LeaderboardPreview } from '../components/landing/LeaderboardPreview'
import { PaymentPlans } from '../components/landing/PaymentPlans'
import { TokenExchange } from '../components/landing/TokenExchange'
import { AchievementsSection } from '../components/landing/AchievementsSection'
import { ResultsPreview } from '../components/landing/ResultsPreview'
import { RewardHistory } from '../components/landing/RewardHistory'

interface LandingPageProps {
  onNavigate: (screen: GameScreen, questionIndex?: number) => void
}

// Question Type Data
const questionTypes = [
  {
    id: 0,
    number: 1,
    type: '📝 Trắc nghiệm',
    title: 'Tính giá trị của biểu thức: 15 × 8 + 52',
    timer: '00:08',
    timerColor: 'red-500',
    streak: 1,
    score: 100,
    answerType: 'multiple-choice' as const,
    answers: [
      { label: 'A', value: '162', isCorrect: false },
      { label: 'B', value: '172', isCorrect: true },
      { label: 'C', value: '182', isCorrect: false },
      { label: 'D', value: '192', isCorrect: false },
    ],
  },
  {
    id: 1,
    number: 2,
    type: '✍️ Tự luận',
    title: 'Phân tích ra thừa số nguyên tố: 72 = ?',
    timer: '00:15',
    timerColor: 'yellow-600',
    streak: 2,
    score: 200,
    answerType: 'text-input' as const,
  },
  {
    id: 2,
    number: 3,
    type: '✓✗ Đúng/Sai',
    title: 'Khẳng định sau đây đúng hay sai: "Số 17 là số nguyên tố"',
    timer: '00:05',
    timerColor: 'red-500',
    streak: 3,
    score: 300,
    answerType: 'true-false' as const,
    isStreakHot: true,
  },
  {
    id: 3,
    number: 4,
    type: '🔗 Ghép cột',
    title: 'Ghép các phép tính với kết quả tương ứng',
    timer: '00:20',
    timerColor: 'gray-900',
    streak: 4,
    score: 400,
    answerType: 'matching' as const,
  },
  {
    id: 4,
    number: 5,
    type: '🔢 Sắp xếp',
    title: 'Sắp xếp các số sau theo thứ tự tăng dần',
    timer: '00:12',
    timerColor: 'yellow-600',
    streak: 5,
    score: 500,
    answerType: 'ordering' as const,
  },
]

export const LandingPage = ({ onNavigate }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-slide">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-3 md:mb-4 drop-shadow-lg px-4">
            ⚔️ Đấu Trường Toán Học
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 px-4">
            Math Battle Arena - Nền tảng học toán tương tác như Kahoot!
          </p>
          <button
            onClick={() => onNavigate('lobby')}
            className="bg-gradient-to-r from-[#6E55FB] to-[#8b6fff] text-white text-base md:text-xl font-bold py-3 px-8 md:py-4 md:px-12 rounded-xl hover:shadow-lg hover:shadow-[#6E55FB]/50 transition-all transform hover:scale-105 active:scale-95"
          >
            🚀 Bắt đầu trải nghiệm
          </button>
        </div>

        {/* Screen Previews */}
        <div className="space-y-12 md:space-y-16">
          {/* Lobby Preview */}
          <LobbyPreview onNavigate={() => onNavigate('lobby')} />

          {/* Question Types Preview */}
          <QuestionPreview
            questions={questionTypes}
            onQuestionClick={(questionId) => onNavigate('game', questionId)}
          />

          {/* Leaderboard Preview */}
          <LeaderboardPreview onNavigate={() => onNavigate('leaderboard')} />

          {/* Payment Plans */}
          <PaymentPlans />

          {/* Token Exchange */}
          <TokenExchange />

          {/* Achievements Section */}
          <AchievementsSection />

          {/* Reward History - Default to Points tab */}
          <RewardHistory defaultTab="points" />
          <RewardHistory defaultTab="money" />
          
          {/* Results Preview */}
          <ResultsPreview onNavigate={() => onNavigate('results')} />

          
        </div>

        {/* Footer */}
        <div className="text-center mt-12 md:mt-16 pb-6 md:pb-8">
          <p className="text-gray-500 text-xs md:text-sm px-4">Thiết kế bởi Tailwind CSS • Màu chủ đạo: #6E55FB</p>
        </div>
      </div>
    </div>
  )
}
