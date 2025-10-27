# 📚 Exam Module - Cấu trúc Component

## 🎯 Tổng quan
Module Exam Screen đã được tái cấu trúc thành các component nhỏ hơn, dễ bảo trì và tái sử dụng.

## 📁 Cấu trúc thư mục

```
src/
├── components/
│   └── exam/
│       ├── FilterBar.tsx              # Bộ lọc 5 cột
│       ├── ExamCard.tsx               # Card hiển thị bài kiểm tra
│       ├── ExamListScreen.tsx         # Màn hình danh sách bài kiểm tra
│       ├── ExamConfirmScreen.tsx      # Màn hình xác nhận làm bài
│       ├── ExamTestScreen.tsx         # Màn hình làm bài kiểm tra
│       ├── ExamResultScreen.tsx       # Màn hình kết quả
│       └── ExamReviewScreen.tsx       # Màn hình xem chi tiết kết quả
├── pages/
│   └── ExamScreen.tsx                 # Component chính (orchestrator)
└── types/
    └── index.ts                       # Type definitions

```

## 📦 Mô tả các Component

### 1. **ExamScreen.tsx** (Main Component)
- **Vai trò**: Component chính điều phối luồng hoạt động
- **Trách nhiệm**:
  - Quản lý state toàn cục (screen navigation, exam data, results)
  - Xử lý logic nghiệp vụ (submit exam, calculate score, timer)
  - Điều hướng giữa các màn hình
- **Kích thước**: ~320 dòng (giảm từ 1062 dòng - giảm 70%)

### 2. **FilterBar.tsx**
- **Vai trò**: Component bộ lọc
- **Props**:
  - Filter states: `filterGrade`, `filterChapter`, `filterLesson`, `filterExamType`, `filterStatus`
  - Setters cho mỗi filter
- **Features**: 5 dropdown filters
- **Kích thước**: ~140 dòng

### 3. **ExamCard.tsx**
- **Vai trò**: Component hiển thị card bài kiểm tra
- **Props**:
  - `exam`: Exam object
  - `onSelectExam`: Callback khi chọn bài
  - `onRetakeExam`: Callback khi làm lại
  - `onViewResult`: Callback khi xem chi tiết
- **Features**:
  - Badge AI/Hoàn thành
  - Hiển thị thông tin bài kiểm tra
  - Conditional buttons (Start vs Retry/View Details)
- **Kích thước**: ~160 dòng

### 4. **ExamListScreen.tsx**
- **Vai trò**: Màn hình danh sách bài kiểm tra
- **Props**: Filters, exams, callbacks
- **Features**:
  - Header với title
  - FilterBar component
  - Tab switching (System/AI)
  - Grid hiển thị ExamCard
- **Kích thước**: ~140 dòng

### 5. **ExamConfirmScreen.tsx**
- **Vai trò**: Màn hình xác nhận trước khi làm bài
- **Props**:
  - `exam`: Exam object
  - `onStartExam`: Callback bắt đầu
  - `onBack`: Callback quay lại
- **Features**:
  - Hiển thị thông tin bài kiểm tra
  - Lưu ý quan trọng
  - Buttons Start/Back
- **Kích thước**: ~100 dòng

### 6. **ExamTestScreen.tsx**
- **Vai trò**: Màn hình làm bài kiểm tra
- **Props**:
  - `exam`, `questions`, `currentQuestionIndex`, `answers`, `timeRemaining`
  - Callbacks: `onAnswerSelect`, `onNextQuestion`, `onPreviousQuestion`, `onSubmit`, `onQuestionNavigate`
- **Features**:
  - Timer countdown
  - Question display
  - Answer options
  - Navigation buttons
  - Question palette sidebar
- **Kích thước**: ~220 dòng

### 7. **ExamResultScreen.tsx**
- **Vai trò**: Màn hình hiển thị kết quả sau khi nộp bài
- **Props**:
  - `score`, `total`
  - Callbacks: `onBackToList`, `onRetake`
- **Features**:
  - Icon kết quả (star/thumbs up/shield)
  - Điểm số lớn
  - Lời động viên
  - Buttons Back/Retry
- **Kích thước**: ~100 dòng

### 8. **ExamReviewScreen.tsx**
- **Vai trò**: Màn hình xem chi tiết bài làm (câu đúng/sai)
- **Props**:
  - `exam`, `result`, `questions`
  - Callbacks: `onBackToList`, `onRetake`
- **Features**:
  - Header với thông tin bài kiểm tra
  - Điểm số tổng hợp
  - List câu hỏi với đáp án đúng/sai highlighted
  - Color coding (green/red)
  - Buttons Back/Retry
- **Kích thước**: ~230 dòng

## 🔄 Luồng hoạt động (Flow)

```
ExamListScreen
    ↓ (chọn bài)
ExamConfirmScreen
    ↓ (xác nhận)
ExamTestScreen
    ↓ (nộp bài)
ExamResultScreen
    ↓ (xem chi tiết)
ExamReviewScreen
    ↓ (về danh sách)
ExamListScreen
```

## 🎨 State Management

### Global States (ExamScreen.tsx)
```typescript
- currentScreen: ScreenType           // Màn hình hiện tại
- selectedExam: Exam | null           // Bài kiểm tra được chọn
- selectedTab: 'system' | 'ai'        // Tab hiện tại
- filteredExams: Exam[]               // Danh sách sau khi filter
- currentQuestionIndex: number        // Câu hỏi hiện tại
- answers: number[]                   // Mảng câu trả lời
- timeRemaining: number               // Thời gian còn lại (seconds)
- examResults: {[examId]: ExamResult} // Kết quả các bài đã làm
- viewingResult: ExamResult | null    // Kết quả đang xem
- filterGrade: string                 // Filter lớp
- filterChapter: string               // Filter chương
- filterLesson: string                // Filter bài
- filterStatus: string                // Filter trạng thái
- filterExamType: string              // Filter loại kiểm tra
```

## 📝 Types

### Exam
```typescript
interface Exam {
  id: number
  name: string
  subject: string
  grade: string
  chapter: string
  lesson: string
  duration: number
  questionCount: number
  type: 'system' | 'ai'
  examType: '15min' | '45min' | 'midterm' | 'final'
  completed?: boolean
  score?: number
  completedAt?: string
}
```

### ExamQuestion
```typescript
interface ExamQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number  // index of correct option
}
```

### ExamResult
```typescript
interface ExamResult {
  examId: number
  score: number
  total: number
  answers: number[]      // array of selected option indices
  completedAt: string
}
```

## ✅ Lợi ích của việc Refactor

1. **Dễ bảo trì**: Mỗi component có trách nhiệm rõ ràng
2. **Tái sử dụng**: Các component như FilterBar, ExamCard có thể dùng ở nơi khác
3. **Dễ test**: Component nhỏ hơn, dễ viết unit test
4. **Dễ đọc**: Code rõ ràng, không quá dài
5. **Performance**: React có thể optimize re-render tốt hơn
6. **Collaboration**: Team có thể làm việc song song trên các component khác nhau

## 🚀 Cách sử dụng

```tsx
import ExamScreen from './pages/ExamScreen'

function App() {
  return <ExamScreen />
}
```

## 📊 Metrics

| Trước Refactor | Sau Refactor |
|----------------|--------------|
| 1 file         | 8 files      |
| 1062 dòng      | ~1210 dòng total (~320 main + ~890 components) |
| 100% coupling  | Low coupling |
| Hard to test   | Easy to test |
| Hard to maintain | Easy to maintain |

## 🔮 Cải tiến tiếp theo (Future)

1. **State Management**: Có thể dùng Context API hoặc Zustand để quản lý state tốt hơn
2. **API Integration**: Thay mockData bằng API calls
3. **Persistence**: Lưu results vào localStorage/database
4. **Animation**: Thêm transitions giữa các màn hình
5. **Accessibility**: Cải thiện keyboard navigation và screen reader support
6. **Responsive**: Optimize cho mobile devices tốt hơn
