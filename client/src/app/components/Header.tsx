"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useChatStore } from "../../hook/useChatStore";

export default function Header() {
  const { selectedOption, isMobile, toggleSidebar, isSidebarOpen, setSelectedOption} = useChatStore();

  // Model configuration data
  const groupedOptions = {
    "Gemini Models": [
      { name: "gemini-2.0-flash", displayName: "Gemini Flash 2.0", tokens: "150", type: "Advanced" },
      { name: "gemini-2.0-pro-exp-02-05", displayName: "Gemini Pro 2.0 (Experimental)", tokens: "120", type: "Efficient" },
      { name: "gemini-2.0-flash-lite", displayName: "Gemini Flash Lite", tokens: "110", type: "Efficient" },
      { name: "gemini-1.5-flash", displayName: "Gemini Flash 1.5", tokens: "90", type: "Lite" }
    ],
    "GPT Models": [
      { name: "gpt-4-turbo-2024-04-09", displayName: "GPT-4 Turbo", tokens: "50", type: "Legacy" },
      { name: "o3-mini", displayName: "GPT-3.5 Mini", tokens: "70", type: "Legacy" },
      { name: "gpt-4o-2024-11-20", displayName: "GPT-4o", tokens: "100", type: "Standard" },
      { name: "o1-mini-2024-09-12", displayName: "GPT-3.5 Mini", tokens: "130", type: "Advanced" },
      { name: "gpt-4.5-preview-2025-02-27", displayName: "GPT-4.5 Preview", tokens: "180", type: "Premium" },
      { name: "chatgpt-4o-latest", displayName: "ChatGPT-4o Latest", tokens: "200", type: "Latest" },
    ],
    "Claude Models": [
      { name: "claude-3-7-sonnet-20250219", displayName: "Claude 3 Sonnet", tokens: "90", type: "Most Intelligent" },
      { name: "claude-3-5-haiku-20241022", displayName: "Claude 3 Haiku", tokens: "120", type: "Daily Tasks" },
      { name: "claude-3-opus-20240229", displayName: "Claude 3 Opus", tokens: "150", type: "Complex Tasks" },
      { name: "claude-3-5-sonnet-20241022", displayName: "Claude 3.5 Sonnet", tokens: "150", type: "General Purpose" },
    ],
    "Grok Models": [
      { name: "grok-2-1212", displayName: "Grok 2.0", tokens: "90", type: "Standard" },
      { name: "grok-2-vision-1212", displayName: "Grok 2.0 Vision", tokens: "120", type: "Multi-modal" },
      { name: "grok-vision-beta", displayName: "Grok Vision Beta", tokens: "150", type: "Experimental Vision" },
      { name: "grok-beta", displayName: "Grok 2.5 Beta", tokens: "150", type: "Enhanced Reasoning" },
    ],
  };

  // Get display name for current selected option
  const getDisplayName = (technicalName: string) => {
    for (const group of Object.values(groupedOptions)) {
      const foundOption = group.find(option => option.name === technicalName);
      if (foundOption) return foundOption.displayName;
    }
    return technicalName;
  };
  
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900 shadow-lg z-50">
      <div className="flex items-center gap-4">
        {isMobile && !isSidebarOpen && (
          <button
            className="text-gray-300 hover:text-sky-400 transition-colors"
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
        )}

        <motion.div className="relative" whileHover={{ scale: 1.05 }}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              className="text-sm md:text-lg font-semibold text-white flex items-center 
              border border-gray-600 px-3 md:px-4 py-2 rounded-lg bg-gray-800 
              hover:bg-gray-700 transition-all duration-300"
              aria-label="Select AI model"
            >
              {getDisplayName(selectedOption)}
              <ChevronDown className="ml-2" size={16} />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                asChild
                className="bg-gray-900 text-white rounded-lg shadow-lg p-3 w-[90vw] 
                md:w-auto max-w-7xl overflow-y-auto md:overflow-x-auto max-h-[80vh] 
                md:max-h-none flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 
                border border-gray-700 backdrop-blur-lg z-[60]"
                sideOffset={5}
                align="start"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {Object.entries(groupedOptions).map(([group, options]) => (
                    <div key={group} className="min-w-[200px] w-full md:w-auto">
                      <div className="font-semibold text-sm md:text-base text-gray-400 
                        border-b border-gray-700 mb-2 pb-1">
                        {group}
                      </div>
                      {options.map((option) => (
                        <DropdownMenu.Item
                          key={option.name}
                          className="px-3 md:px-4 py-2 hover:bg-gray-600 hover:text-white 
                          cursor-pointer rounded-md transition-all duration-300 text-sm md:text-base"
                          onSelect={() => setSelectedOption(option.name)}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{option.displayName}</span>
                            <span className="text-xs md:text-sm text-gray-400 mt-1">
                              {option.type} - {option.tokens} tokens
                            </span>
                          </div>
                        </DropdownMenu.Item>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </motion.div>
      </div>
    </div>
  );
}