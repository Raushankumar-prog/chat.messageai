"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { GET_CHATS } from "../../graphql/queries/chats";

// Define TypeScript types for the GraphQL response
type Chat = {
  id: string;
  title: string;
};

type GetChatsResponse = {
  chats: Chat[];
};

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, loading, error } = useQuery<GetChatsResponse>(GET_CHATS, {
    variables: { userId: "cm61o3dwk0000slrh6747uhif" },
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleShowMore = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`${
        isSidebarOpen ? "w-72" : "w-16"
      } h-screen bg-gray-800 text-gray-300 flex flex-col justify-between p-4 shadow-lg transition-all duration-300`}
    >
      {/* Collapse Icon */}
      <div className="mb-4">
        <button
          className="text-gray-300 focus:outline-none hover:text-sky-400 transition-colors"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Fixed "New Chat" Button */}
      {isSidebarOpen && (
        <div className="mb-4">
          <button className="flex items-center w-full bg-gray-700 text-gray-300 py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
        </div>
      )}

      {/* Scrollable Area */}
      <ScrollArea.Root className="flex-1 overflow-hidden rounded-lg">
        <ScrollArea.Viewport className="w-full h-full">
          <div className="pr-2">
            {/* Recent Chats Section */}
            {isSidebarOpen && <h3 className="text-sm tracking-wide text-sky-200 mb-2">Recent</h3>}
            <ul>
              {loading ? (
                <p className="text-gray-400">Loading chats...</p>
              ) : error ? (
                <p className="text-red-500">Error loading chats</p>
              ) : (
                data?.chats?.slice(0, isExpanded ? data.chats.length : 5).map((chat: Chat) => (
                  <li key={chat.id}>
                    <a
                      href="#"
                      className={`block mb-2 p-2 rounded ${
                        isSidebarOpen
                          ? "text-slate-500 hover:bg-gray-800 hover:text-sky-400"
                          : "text-gray-400 text-center"
                      } transition-colors`}
                    >
                      {isSidebarOpen ? chat.title : "•"}
                    </a>
                  </li>
                ))
              )}
            </ul>

            {/* Show More/Show Less Button */}
            {isSidebarOpen && data?.chats?.length > 5 && (
              <button
                onClick={toggleShowMore}
                className="flex items-center text-sm font-serif text-gray-500 hover:text-gray-300 transition-colors mt-2"
              >
                <span>{isExpanded ? "Show less" : "Show more"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 ml-1 transform transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
        >
          <ScrollArea.Thumb className="bg-gray-500 rounded-full" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="bg-gray-700" />
      </ScrollArea.Root>

      {/* Footer Section */}
      <div className="border-t border-gray-700 pt-4">
        <ul className={`${isSidebarOpen ? "space-y-4" : "space-y-2"}`}>
          {[
            { label: "Gem manager", icon: "💎" },
            { label: "Help", icon: "❓" },
            { label: "Activity", icon: "🔄" },
            { label: "Settings", icon: "⚙️" },
          ].map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="text-lg mr-3">{item.icon}</span>
              {isSidebarOpen && (
                <a href="#" className="text-sm hover:text-gray-300 transition-colors">
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        {isSidebarOpen && (
          <div className="mt-4 text-sm text-gray-500">
            <p>Patna, Bihar, India</p>
            <a href="#" className="hover:underline hover:text-gray-300 transition-colors">
              Update location
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
