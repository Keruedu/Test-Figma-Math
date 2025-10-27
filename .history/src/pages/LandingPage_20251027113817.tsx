import ExamScreen from './ExamScreen'

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 relative overflow-hidden">

      <div className="relative z-10 container mx-auto px-4">
        {/* Mặc định hiển thị tab Hệ thống */}
        <ExamScreen />
        
        {/* Hoặc có thể chọn hiển thị tab AI */}
        <ExamScreen initialTab="ai" />
      </div>
    </div>
  )
}
