"use client";

import { useEffect, useState } from "react";
import { useChatStore } from "../../hook/useChatStore";
import { FaMicrophone } from "react-icons/fa";
import { usePathname } from "next/navigation";


export default function ChatInput() {
  const [input, setInput] = useState("");
   const pathname = usePathname();
  const { addMessage, setShouldScroll } = useChatStore();


  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {

      id: Date.now().toString(),
      content: input,
      childMessages: [], 
    };

    addMessage(newMessage);
    setShouldScroll(true);
    setInput("");
   

  };

  useEffect(()=>{
     setInput("");
  },[pathname])


  return (
    <div className="fixed bottom-4 left-80 right-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full w-3/4">
        <input
          type="text"
          placeholder="Ask Gemini"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="bg-transparent flex-1 text-gray-300 focus:outline-none"
        />
        <FaMicrophone className="text-gray-400 cursor-pointer" />
      </div>
    </div>
  );
}
