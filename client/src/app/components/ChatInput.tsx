"use client";

import { useEffect, useState, useCallback } from "react";
import { useChatStore } from "../../hook/useChatStore";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { ASK_AI, AI_RESPONSE_SUBSCRIPTION,OPENAI_RESPONSE_SUBSCRIPTION,GROK_RESPONSE_SUBSCRIPTION,CLAUDE_RESPONSE_SUBSCRIPTION } from "../../graphql/queries/askAi";
import { SAVE_ANS } from "../../graphql/queries/save";
import { CREATETITLE } from "../../graphql/queries/createChat";
import { v4 as uuidv4 } from "uuid";
import client from "@lib/axiosInstance";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getLocalStorage } from "@lib/storage";


export default function ChatInput() {
  const [input, setInput] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { addChat, addMessage, setShouldScroll, updateMessage,isMobile ,selectedOption,getModelType} = useChatStore();
  const [askAI] = useMutation(ASK_AI);
  const [saveAns] = useMutation(SAVE_ANS);
  const [createTitle] = useMutation(CREATETITLE);
  const [newChatId, setNewChatId] = useState<string | null>(null);

  const chatId = pathname.split("/c/")[1];
  

    

  const handleSend = useCallback(async (chatID?: string) => {
  
    if (!input.trim()) return;
    const targetChatId = chatID || chatId;

    if (targetChatId) {
      const newMessage = {
        id: uuidv4(),
        content: input,
        childMessages: [],
      };

      addMessage(targetChatId, newMessage);
      setShouldScroll(true);
      setInput("");

      try {
       let subscription;
const modelType = getModelType(selectedOption).toLowerCase();

if (modelType === 'gemini') {
  subscription = client.subscribe({
    query: AI_RESPONSE_SUBSCRIPTION,
    variables: {
      message: input,
      chatId: targetChatId,
      model: selectedOption.toLowerCase()
      
    }
  });
} else if (modelType === 'gpt') {
  subscription = client.subscribe({
    query: OPENAI_RESPONSE_SUBSCRIPTION,
    variables: {
      message: input,
      chatId: targetChatId,
      model:selectedOption.toLowerCase()
   
    }
  });
} else if (modelType === 'claude') {
  subscription = client.subscribe({
    query: CLAUDE_RESPONSE_SUBSCRIPTION,
    variables: {
      message: input,
      chatId: targetChatId,
      model: selectedOption.toLowerCase()
     
    }
  });
} else if (modelType === 'grok') {
  subscription = client.subscribe({
    query: GROK_RESPONSE_SUBSCRIPTION,
    variables: {
      message: input,
      chatId: targetChatId,
      model: selectedOption.toLowerCase()
     
    }
  });
} else {
  // Fallback to default subscription
  subscription = client.subscribe({
    query: AI_RESPONSE_SUBSCRIPTION,
    variables: {
      message: input,
      chatId: targetChatId,
      model: 'default'
    }
  });
}
         console.log(selectedOption);
        let accumulatedResponse = "";

        subscription.subscribe({
          next({ data }) {
            const response = data?.aiResponse;
            if (response) {
              accumulatedResponse += " " + response;
              updateMessage(targetChatId, newMessage.id, {
                childMessages: [{ id: "ai-response", content: accumulatedResponse.trim() }],
              });
            }
          },
          error(err) {
            console.error("Subscription error:", err);
          },
          complete() {
            saveAns({
              variables: {
                content: input,
                role: "USER",
                chatId: targetChatId,
                childMessage: {
                  content: accumulatedResponse.trim(),
                  role: "SYSTEM",
                  chatId: targetChatId,
                },
              },
            });
          },
        });
      } catch (error) {
        console.error("Error receiving AI response: ", error);
      }
    }
  }, [input, chatId, addMessage, setShouldScroll, updateMessage, saveAns]);

  const handleCreateChatAndSend = useCallback(async () => {
    if (!input.trim()) return;

    try {
      const titlePrompt = `"${input}" but do not answer it. Instead, provide a concise title for it in exactly three or four words, nothing more.`;
      const { data: titleData } = await askAI({ variables: { message: titlePrompt, chatId: "" } });

      const title = titleData?.askAI?.response?.split(" ").slice(0, 4).join(" ");
      if (!title) {
        console.error("Error: AI did not return a valid 3-4 word title");
        return;
      }
         
      const { data: chatData } = await createTitle({
        variables: { title, userId:getLocalStorage("userId") },
      });

      const newChatId = chatData?.createChat?.id;
      if (!newChatId) {
        console.error("Error creating chat");
        return;
      }

      addChat({ id: newChatId, title });
      setNewChatId(newChatId);
      router.push(`/c/${newChatId}`);
    } catch (error) {
      console.error("Error creating chat: ", error);
    }
  }, [input, askAI, createTitle, addChat, router]);

  useEffect(() => {
    if (newChatId && pathname === `/c/${newChatId}`) {
      handleSend(newChatId);
      setNewChatId(null);
    }
  }, [newChatId, pathname, handleSend]);

  useEffect(() => {
    setInput("");
  }, [chatId]);

  return (
 <div
  className={`fixed bottom-6 flex items-center gap-3 ${
    isMobile ? "left-20 right-6" : "left-[33%] right-0"
  }`}
>


      <div className={`relative flex items-center  bg-gradient-to-br from-gray-900 via-gray-950 to-black bg-opacity-60 backdrop-blur-2xl text-white rounded-full px-8 py-4 shadow-[0px_0px_20px_rgba(0,0,255,0.3)] border border-gray-700 focus-within:border-blue-600 transition-all duration-500 hover:shadow-blue-600/50 hover:scale-105 
        ${
            isMobile ? " w-[100%] " : "w-[70%]"
  }`}>
        <FaMicrophone className="text-gray-400 cursor-pointer hover:text-blue-400 transition duration-200 mr-4 text-2xl hover:scale-110 active:scale-95 animate-pulse" />
        <ScrollArea className="w-full h-auto max-h-24 overflow-hidden">
          <textarea
            placeholder="Ask Gemini..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (chatId ? handleSend() : handleCreateChatAndSend())}
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none resize-none pr-16 text-lg transition-all duration-200 focus:placeholder-gray-500 focus:text-gray-100"
            rows={1}
          />
        </ScrollArea>
        <button
          onClick={() => chatId ? handleSend() : handleCreateChatAndSend()}
          className="absolute right-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-125 active:scale-95 flex items-center justify-center animate-glow ring-2 ring-blue-500/50 hover:ring-purple-500/50"
        >
          <FaPaperPlane className="text-white text-lg" />
        </button>
      </div>
    </div>
  );
}