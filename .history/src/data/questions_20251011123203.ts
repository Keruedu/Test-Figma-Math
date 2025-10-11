import type { Question } from '../types'

export const questions: Question[] = [
  // Trắc nghiệm
  {
    type: 'multiple-choice',
    text: '125 + 47 = ?',
    answers: [
      { id: 'A', text: '162', isCorrect: false },
      { id: 'B', text: '172', isCorrect: true },
      { id: 'C', text: '182', isCorrect: false },
      { id: 'D', text: '152', isCorrect: false },
    ],
  },
  // Tự luận
  {
    type: 'text-input',
    text: 'Nếu x + 15 = 42, thì x = ?',
    correctAnswer: '27',
    placeholder: 'Nhập đáp án của bạn...',
  },
  // Đúng/Sai
  {
    type: 'true-false',
    text: 'Tổng các góc trong tam giác luôn bằng 180 độ',
    correctAnswer: true,
  },
  // Ghép cột
  {
    type: 'matching',
    text: 'Ghép các phép tính với kết quả đúng',
    leftColumn: [
      { id: 'L1', text: '5 × 6' },
      { id: 'L2', text: '8 × 7' },
      { id: 'L3', text: '9 × 4' },
      { id: 'L4', text: '12 × 3' },
    ],
    rightColumn: [
      { id: 'R1', text: '36' },
      { id: 'R2', text: '56' },
      { id: 'R3', text: '30' },
      { id: 'R4', text: '48' },
    ],
    correctPairs: [
      { left: 'L1', right: 'R3' },
      { left: 'L2', right: 'R2' },
      { left: 'L3', right: 'R1' },
      { left: 'L4', right: 'R1' },
    ],
  },
  // Sắp xếp
  {
    type: 'ordering',
    text: 'Sắp xếp các số sau theo thứ tự tăng dần',
    items: [
      { id: 'O1', text: '125', correctOrder: 2 },
      { id: 'O2', text: '47', correctOrder: 0 },
      { id: 'O3', text: '89', correctOrder: 1 },
      { id: 'O4', text: '256', correctOrder: 3 },
    ],
  },
  // Trắc nghiệm 2
  {
    type: 'multiple-choice',
    text: 'Chu vi hình vuông cạnh 5cm là:',
    answers: [
      { id: 'A', text: '10 cm', isCorrect: false },
      { id: 'B', text: '15 cm', isCorrect: false },
      { id: 'C', text: '20 cm', isCorrect: true },
      { id: 'D', text: '25 cm', isCorrect: false },
    ],
  },
  // Tự luận 2
  {
    type: 'text-input',
    text: 'Tính diện tích hình chữ nhật có chiều dài 8m và chiều rộng 5m (đơn vị: m²)',
    correctAnswer: '40',
    placeholder: 'Nhập đáp án...',
  },
  // Đúng/Sai 2
  {
    type: 'true-false',
    text: 'Số 2025 là số nguyên tố',
    correctAnswer: false,
  },
  // Ghép cột 2
  {
    type: 'matching',
    text: 'Ghép các phân số với giá trị thập phân tương ứng',
    leftColumn: [
      { id: 'L1', text: '1/2' },
      { id: 'L2', text: '1/4' },
      { id: 'L3', text: '3/4' },
    ],
    rightColumn: [
      { id: 'R1', text: '0.5' },
      { id: 'R2', text: '0.75' },
      { id: 'R3', text: '0.25' },
    ],
    correctPairs: [
      { left: 'L1', right: 'R1' },
      { left: 'L2', right: 'R3' },
      { left: 'L3', right: 'R2' },
    ],
  },
  // Sắp xếp 2
  {
    type: 'ordering',
    text: 'Sắp xếp các bước giải phương trình x + 5 = 12',
    items: [
      { id: 'O1', text: 'x = 7', correctOrder: 2 },
      { id: 'O2', text: 'x + 5 = 12', correctOrder: 0 },
      { id: 'O3', text: 'x = 12 - 5', correctOrder: 1 },
    ],
  },
]
