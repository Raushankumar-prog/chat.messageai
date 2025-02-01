"use client";

import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { GET_MESSAGES } from "../../../graphql/queries/messages";
import { ASK_AI } from "../../../graphql/queries/askAi";  // import the mutation
import { useChatStore } from "../../../hook/useChatStore";

const QAPage: React.FC = () => {
  const params = useParams();
  const chatId = params?.id as string;
  const { messages, addMessage, shouldScroll, setShouldScroll, clearMessages } = useChatStore();
  
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { chatId },
    skip: !chatId,
  });

  const [askAI, { data: aiData, loading: aiLoading, error: aiError }] = useMutation(ASK_AI);

  const latestMessageRef = useRef<HTMLDivElement>(null);
  const [waitingForResponseMessageId, setWaitingForResponseMessageId] = useState<string | null>(null);

  // Clear chat store when chatId changes
  useEffect(() => {
    clearMessages();
  }, [chatId, clearMessages]);

  useEffect(() => {
    if (data?.messages) {
      data.messages.forEach((msg: any) => addMessage(msg));
    }
  }, [data, addMessage]);

  useEffect(() => {
    if (shouldScroll && latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      setShouldScroll(false);
    }
  }, [shouldScroll, setShouldScroll, messages]);

  // Mutation handler when question is clicked
  const handleQuestionClick = async (question: string, messageId: string) => {
    // Mark this message as waiting for response
    setWaitingForResponseMessageId(messageId);

    try {
      const { data } = await askAI({ variables: { message: question } });
      const response = data?.askAI?.response;

      if (response) {
        // Once response is received, update the waiting message
        setWaitingForResponseMessageId(null);
        addMessage([
          ...messages,
          {
            ...messages.find((msg) => msg.id === messageId),
            childMessages: [
              { id: "ai-response", content: response },
            ],
          },
        ]);
      }
    } catch (error) {
      console.error("Error asking AI: ", error);
      setWaitingForResponseMessageId(null);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-6 py-12 flex flex-col items-center">
      {messages.map((message, index) => (
        <div
          key={message.id}
          ref={index === messages.length - 1 ? latestMessageRef : null}
          className="w-full max-w-4xl mb-10"
        >
          {/* Question */}
          <div
            className="bg-gray-800 text-sky-300 p-6 shadow-lg ml-96 mb-6 rounded-2xl cursor-pointer"
            onClick={() => handleQuestionClick(message.content, message.id)} // Trigger AI mutation when question is clicked
          >
            <h1 className="text-lg">{message.content}</h1>
          </div>

          {/* Answer Section */}
          <div className="p-6">
            <div className="mb-6 flex">
              <span className="text-yellow-400 text-xl py-1">★</span>
              <p className="text-lg leading-relaxed mt-2 pl-1">
                {waitingForResponseMessageId === message.id
                  ? "Waiting for response..."
                  : message.childMessages[0]?.content || ""}
              </p>
            </div>

            {message.childMessages.length > 1 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-sky-400 mb-3">Additional Answers:</h4>
                <ul className="list-disc ml-5">
                  {message.childMessages.slice(1).map((child, index) => (
                    <li key={index} className="mb-4">
                      <strong className="text-lg text-gray-100">Answer {index + 2}:</strong>{" "}
                      <span className="text-gray-300">{child.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QAPage;
