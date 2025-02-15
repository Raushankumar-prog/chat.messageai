"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { GET_CHATS } from "../../graphql/queries/chats";
import Link from "next/link";
import SidebarFooter from "./SidebarFooter";
import { useChatStore } from "../../hook/useChatStore"; // Zustand store


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

  // Check screen size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // Small screen (e.g., mobile)
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { addChat, chats, updateChats } = useChatStore();

  const { data, loading, error } = useQuery<GetChatsResponse>(GET_CHATS, {
    variables: { userId: "cm71vb07o0000tsc09ro3wotc" },
  });

  useEffect(() => {
    if (data?.chats) {
      updateChats(data.chats);
    }
  }, [data, updateChats, addChat]);

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

      {/* New Chat Button */}
      {isSidebarOpen && (
        <div className="mb-4">
          <Link href="/">
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
          </Link>
        </div>
      )}

      {/* Scrollable Area */}
      <ScrollArea.Root className="flex-1 overflow-hidden rounded-lg">
        <ScrollArea.Viewport className="w-full h-full">
          <div className="pr-2">
            {isSidebarOpen && <h3 className="text-sm tracking-wide text-sky-200 mb-2">Recent</h3>}
            <ul>
              {loading ? (
                <p className="text-gray-400">Loading chats...</p>
              ) : error ? (
                <p className="text-red-500">Error loading chats</p>
              ) : (
                chats.slice(0, isExpanded ? chats.length : 5).map((chat: Chat) => (
                  <li key={chat.id}>
                    <Link
                      href={chat.id ? `/c/${chat.id}` : "#"}
                      className={`block mb-2 p-2 rounded ${
                        isSidebarOpen
                          ? "text-slate-500 hover:bg-gray-800 hover:text-sky-400"
                          : "text-gray-400 text-center"
                      } transition-colors`}
                    >
                      {isSidebarOpen ? chat.title : "•"}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>

      {/* Footer Section */}
      <div className="border-t border-gray-700 pt-4">
        <SidebarFooter isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
}
