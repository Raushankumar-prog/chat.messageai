import { FaMicrophone } from "react-icons/fa";

export default function ChatInput() {
  return (
    <div className="fixed bottom-4 left-80 right-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full w-3/4">
        <input
          type="text"
          placeholder="Ask Gemini"
          className="bg-transparent flex-1 text-gray-300 focus:outline-none"
        />
        <FaMicrophone className="text-gray-400 cursor-pointer" />
      </div>
     
    </div>
  );
}
