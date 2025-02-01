"use client";

import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../../hook/useChatStore";
import { FaMicrophone } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useMutation } from "@apollo/client";
import { ASK_AI } from "../../graphql/queries/askAi";




export default function ChatInput() {
  const [input, setInput] = useState("");
  const pathname = usePathname();
 const { addMessage, setShouldScroll, messages, updateMessage } = useChatStore();
;
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const [askAI] = useMutation(ASK_AI);
  const [waitingForResponseMessageId, setWaitingForResponseMessageId] = useState<string | null>(null);




const handleSend = async () => {
  if (!input.trim()) return;

  const newMessage = {
    id: Date.now().toString(),
    content: input,
    childMessages: [],
  };



  addMessage(newMessage);
  setShouldScroll(true);
  setInput("");



  // Query AI
  setWaitingForResponseMessageId(newMessage.id);
  try {
    const { data } = await askAI({ variables: { message: input } });
    const response = data?.askAI?.response;

    
    if (response) {
      // Update the message in the store
      updateMessage(newMessage.id, {
        childMessages: [{ id: "ai-response", content: response }],
      });
    }
  } catch (error) {
    console.error("Error asking AI: ", error);
  } finally {
    setWaitingForResponseMessageId(null);
  }
};







  useEffect(() => {
    setInput("");
  }, [pathname]);





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
