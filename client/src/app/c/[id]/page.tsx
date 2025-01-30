"use client"; 

import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation"; 
import { GET_MESSAGES } from "../../../graphql/queries/messages";

const QAPage: React.FC = () => {
  const params = useParams();
  const chatId = params?.id as string; 

  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { chatId },
    skip: !chatId,
  });


  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;



  const messagesWithAnswers = data?.messages?.filter(
    (message: any) => message.childMessages.length > 0
  ) || [];


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-6 py-12 flex flex-col items-center">
      {messagesWithAnswers.map((message: any) => (
        <div key={message.id} className="w-full max-w-4xl mb-10">
          {/* Question Section */}
          <div className="bg-gray-800 text-sky-300 p-6 shadow-lg ml-96 mb-6" style={{ borderRadius: '1.5rem' }}>
            <h1 className="text-lg">{message.content}</h1>
          </div>

          {/* Answer Section */}
          <div className="p-6">
            <div className="mb-6 flex">
              <span className="text-yellow-400 text-xl py-1">★</span>
              <p className="text-lg leading-relaxed mt-2 pl-1">
                {message.childMessages[0].content}
              </p>
            </div>

            {message.childMessages.length > 1 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-sky-400 mb-3">
                  Additional Answers:
                </h4>
                <ul className="list-disc ml-5">
                  {message.childMessages.slice(1).map((child: any, index: number) => (
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
