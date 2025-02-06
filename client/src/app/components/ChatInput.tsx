"use client";

import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../../hook/useChatStore";
import { FaMicrophone } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { ASK_AI } from "../../graphql/queries/askAi";
import { SAVE_ANS } from "../../graphql/queries/save";
import { CREATETITLE } from "../../graphql/queries/createChat";
import { v4 as uuidv4 } from "uuid";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { addMessage, setShouldScroll, updateMessage } = useChatStore();
  const [askAI] = useMutation(ASK_AI);
  const [saveAns] = useMutation(SAVE_ANS);
  const [createTitle] = useMutation(CREATETITLE);
  const [waitingForResponseMessageId, setWaitingForResponseMessageId] = useState<string | null>(null);
  const [newChatId, setNewChatId] = useState<string | null>(null);

  const chatId = pathname.split("/c/")[1];

  const handleSend = async (chatID?: string) => {
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

      setWaitingForResponseMessageId(newMessage.id);
      try {
        const { data } = await askAI({ variables: { message: input } });
        const response = data?.askAI?.response;

        if (response) {
          updateMessage(targetChatId, newMessage.id, {
            childMessages: [{ id: "ai-response", content: response }],
          });

          await saveAns({
            variables: {
              content: input,
              role: "USER",
              chatId: targetChatId,
              childMessage: {
                content: response,
                role: "SYSTEM",
                chatId: targetChatId,
              },
            },
          });
        }
      } catch (error) {
        console.error("Error asking AI: ", error);
      } finally {
        setWaitingForResponseMessageId(null);
      }
    }
  };

  const handleCreateChatAndSend = async () => {
    if (!input.trim()) return;

    try {
      const titlePrompt = `"${input}" but do not answer it. Instead, provide a concise title for it in exactly three or four words, nothing more.`;
      const { data: titleData } = await askAI({ variables: { message: titlePrompt } });

      const title = titleData?.askAI?.response;
      if (!title || title.split(" ").length > 4) {
        console.error("Error: AI did not return a valid 3-4 word title");
        return;
      }

      const { data: chatData } = await createTitle({ variables: { title, userId: "cm61o3dwk0000slrh6747uhif" } });
      const newChatId = chatData?.createChat?.id;
      if (!newChatId) {
        console.error("Error creating chat");
        return;
      }

      setNewChatId(newChatId);
      router.push(`/c/${newChatId}`);
    } catch (error) {
      console.error("Error in localhost logic: ", error);
    }
  };

  useEffect(() => {
    if (newChatId && pathname === `/c/${newChatId}`) {
      handleSend(newChatId);
      setNewChatId(null);
    }
  }, [newChatId, pathname]);

  return (
    <div className="fixed bottom-4 left-80 right-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full w-3/4">
        <input
          type="text"
          placeholder="Ask Gemini"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (chatId ? handleSend() : handleCreateChatAndSend())}
          className="bg-transparent flex-1 text-gray-300 focus:outline-none"
        />
        <FaMicrophone className="text-gray-400 cursor-pointer" />
      </div>
    </div>
  );
}
