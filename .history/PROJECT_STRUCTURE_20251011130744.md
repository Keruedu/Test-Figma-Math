# Math Battle Arena - Cấu trúc dự án

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Các component tái sử dụng
│   ├── AnimatedBackground.tsx
│   └── Confetti.tsx
│
├── pages/              # Các trang chính
│   └── LandingPage.tsx    # Trang chủ hiển thị tất cả màn hình
│
├── types/              # TypeScript types
│   └── index.ts           # Định nghĩa tất cả types
│
├── data/               # Dữ liệu tĩnh
│   └── questions.ts       # Danh sách câu hỏi
│
├── App.tsx             # Component gốc, điều hướng
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎯 Luồng hoạt động

1. **App.tsx** - Component gốc
   - Quản lý state: `showLanding`, `currentScreen`, `currentQuestionIndex`
   - Điều hướng giữa landing page và các màn hình game
   
2. **LandingPage.tsx** - Trang chủ
   - Hiển thị preview của tất cả màn hình
   - Click vào mỗi màn hình để điều hướng

3. **Types** - Định nghĩa types
   - `GameScreen`: 'lobby' | 'game' | 'leaderboard' | 'results'
   - `Question`: Union type của 5 loại câu hỏi
   - `Player`: Thông tin người chơi

4. **Components** - Tái sử dụng
   - `AnimatedBackground`: Các ký hiệu toán học bay
   - `Confetti`: Hiệu ứng pháo giấy

## 🚀 Các màn hình cần phát triển tiếp

Hiện tại các màn hình game chưa được implement, chỉ có landing page:

- [ ] **LobbyScreen** - Màn hình sảnh chờ
- [ ] **GameScreen** - Màn hình chơi game với 5 loại câu hỏi
- [ ] **LeaderboardScreen** - Bảng xếp hạng tạm thời
- [ ] **ResultsScreen** - Kết quả chung cuộc

## 💡 Hướng phát triển

1. Tạo các component màn hình trong `src/pages/`:
   ```
   pages/
   ├── LandingPage.tsx    ✅
   ├── LobbyScreen.tsx    📝 TODO
   ├── GameScreen.tsx     📝 TODO
   ├── LeaderboardScreen.tsx  📝 TODO
   └── ResultsScreen.tsx  📝 TODO
   ```

2. Tạo các component câu hỏi trong `src/components/questions/`:
   ```
   components/questions/
   ├── MultipleChoice.tsx
   ├── TextInput.tsx
   ├── TrueFalse.tsx
   ├── Matching.tsx
   └── Ordering.tsx
   ```

3. Thêm state management (Context hoặc Zustand) nếu cần

## 🎨 Theme

- **Light Mode** (mặc định)
- Màu chủ đạo: `#6E55FB` (tím)
- Background: Gradient xám nhạt, tím, xanh pastel
