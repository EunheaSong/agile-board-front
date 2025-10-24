import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Agile Board</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            카운트: {count}
          </button>
          <p className="mt-4 text-gray-600">
            <code className="bg-gray-200 px-2 py-1 rounded">src/App.tsx</code>를
            수정하여 HMR을 테스트해보세요
          </p>
        </div>
        <p className="mt-6 text-gray-500">
          TypeScript + React + Vite + TailwindCSS로 구축된 SPA 프로젝트입니다
        </p>
      </div>
    </div>
  );
}

export default App;
