export default function ChatInput() {
    return (
      <div className="fixed bottom-4 left-80 right-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Ask Gemini"
          className="flex-1 px-4 py-3 bg-gray-800 text-gray-300 rounded-full focus:outline-none"
        />
        <button className="px-6 py-3 bg-yellow-500 text-black rounded-full">
          Send
        </button>
      </div>
    );
  }
  