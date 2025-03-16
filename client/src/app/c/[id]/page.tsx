"use client";

import React, { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { GET_MESSAGES } from "../../../graphql/queries/messages";
import { useChatStore } from "../../../hook/useChatStore";

import UsingReactMarkdown from "../../components/reactmarkdown";

const QAPage: React.FC = () => {
  const params = useParams();
  const chatId = params?.id as string;
  const { addMessage, getMessages, shouldScroll, setShouldScroll ,isMobile} = useChatStore();
  const latestMessageRef = useRef<HTMLDivElement>(null);

  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { chatId },
    skip: !chatId,
  });


  const messages = getMessages(chatId);

  type Message = {
  id: string;
  content: string;
  childMessages: Array<{  
    id: string;
    content: string;
  }>;
};

  useEffect(() => {
    if (data?.messages) {
      data.messages.forEach((msg:Message) => addMessage(chatId, msg));
    }
  }, [data, addMessage, chatId]);

  useEffect(() => {
    if (shouldScroll && latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      setShouldScroll(false);
    }
  }, [shouldScroll, setShouldScroll, messages]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className={`min-h-screen bg-gray-900 text-gray-200  py-12 flex flex-col items-start ${isMobile ? "px-0" :"px-6"}`}>
      {messages.map((message, index) => (
        <div
          key={message.id}
          ref={index === messages.length - 1 ? latestMessageRef : null}
          className="w-full max-w-4xl mb-10"
        >
          {/* Question */}
          <div className="flex justify-end">
            <div className="bg-black-900 text-white p-6 shadow-xl border border-gray-600 rounded-2xl max-w-xl ml-auto my-6">
              <h1 className="text-lg leading-relaxed whitespace-pre-wrap break-words">{message.content}</h1>
            </div>
          </div>

          {/* Answer Section */}
          <div className="p-6">
            <div className="mb-6 flex">
              <span className={`relative text-yellow-400  py-2 ${
                isMobile ? "text-2xl" : "text-4xl"
              }`}>
              
                <span className="animate-bounce">🌟</span>
              
              </span>

              {/* Render Markdown using UsingReactMarkdown */}
              <div className="ml-4">
                <UsingReactMarkdown markdown={message.childMessages[0]?.content || ""} />
              </div>
            </div>

            {message.childMessages.length > 1 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-sky-400 mb-3">Additional Answers:</h4>
                <ul className="list-disc ml-5">
                  {message.childMessages.slice(1).map((child, index) => (
                    <li key={index} className="mb-4">
                      <strong className="text-lg text-gray-100">Answer {index + 2}:</strong>{" "}
                      <span className="text-gray-300">
                        <UsingReactMarkdown markdown={child.content} />
                      </span>
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
