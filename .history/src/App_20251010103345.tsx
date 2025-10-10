import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6E55FB] to-[#4a36c7] flex items-center justify-center p-8">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 max-w-md">
        <h1 className="text-3xl font-bold text-[#6E55FB] mb-4">
          🎯 Tailwind CSS đã hoạt động!
        </h1>
        <p className="text-gray-600 mb-6">
          Nếu bạn thấy màu tím (#6E55FB) và styling đẹp như này, Tailwind đã sẵn sàng!
        </p>
        <button className="w-full bg-[#6E55FB] hover:bg-[#5a44d9] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
          Bắt đầu xây dựng Math Battle Arena 🚀
        </button>
      </div>
    </div>
  )
}

export default App
    </>
  )
}

export default App
