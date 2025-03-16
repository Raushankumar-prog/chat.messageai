// Sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { GET_CHATS } from "../../graphql/queries/chats";
import Link from "next/link";
import SidebarFooter from "./SidebarFooter";
import { useChatStore } from "../../hook/useChatStore";
import Cookies from "js-cookie";

type Chat = {
  id: string;
  title: string;
};

type GetChatsResponse = {
  chats: Chat[];
};

export default function Sidebar() {
  const { isSidebarOpen, isMobile, toggleSidebar } = useChatStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const { chats, updateChats } = useChatStore();

  const { data, loading, error } = useQuery<GetChatsResponse>(GET_CHATS, {
    variables: { userId: Cookies.get("userId") },
  });

  useEffect(() => {
    if (data?.chats) {
      updateChats(data.chats);
    }
  }, [data, updateChats]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      useChatStore.getState().setIsMobile(mobile);
      useChatStore.setState({ isSidebarOpen: !mobile });
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleShowMore = () => setIsExpanded(!isExpanded);

  if (isMobile && !isSidebarOpen) return null; // Completely remove sidebar from DOM on mobile

  return (
    <div
      className={`sm:relative h-screen bg-gray-800 text-gray-300 flex flex-col justify-between p-4 shadow-lg transition-all duration-300 ${
       isMobile
  ? isSidebarOpen
    ? "translate-x-0 w-64"
    : "-translate-x-full w-0"
  : isSidebarOpen
    ? "translate-x-0 w-full sm:w-72"
    : "translate-x-full sm:translate-x-0 sm:w-16"
      }`}
    >
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Chat
            </button>
          </Link>
        </div>
      )}

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

            {isSidebarOpen && chats.length > 5 && (
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
          className="flex select-none touch-none p-0.5 bg-gray-800 transition-colors duration-[160ms] ease-out hover:bg-gray-700 data-[orientation=vertical]:w-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-gray-600 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>

        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-gray-800 transition-colors duration-[160ms] ease-out hover:bg-gray-700 data-[orientation=horizontal]:h-2.5"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="flex-1 bg-gray-600 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>

        <ScrollArea.Corner className="bg-gray-800" />
      </ScrollArea.Root>

      <div className="border-t border-gray-700 pt-4">
        <SidebarFooter isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
}