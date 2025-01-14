export default function Header() {
    return (
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="text-lg font-semibold text-gray-300">Gemini 1.5 Flash</h1>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-sm bg-yellow-500 text-black rounded">
            Try Gemini Advanced
          </button>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    );
  }
  