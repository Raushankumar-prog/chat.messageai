"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const [selectedOption, setSelectedOption] = useState("Gemini-1.5-pro");

  const groupedOptions = {
    "Gemini Models": [
      { name: "Gemini-1.5-pro", tokens: "150", type: "Advanced" },
      { name: "Gemini-1.5-flash-8b", tokens: "120", type: "Efficient" },
      { name: "Gemini-1.5-flash", tokens: "110", type: "Efficient" },
      { name: "Gemini-2.0-flash-lite", tokens: "90", type: "Lite" }
    ],
    "GPT Models": [
      { name: "GPT-1", tokens: "50", type: "Legacy" },
      { name: "GPT-2", tokens: "70", type: "Legacy" },
      { name: "GPT-3", tokens: "100", type: "Standard" },
      { name: "GPT-3.5", tokens: "130", type: "Advanced" },
      { name: "GPT-4", tokens: "180", type: "Premium" },
      { name: "GPT-4o", tokens: "200", type: "Ultra" },
      { name: "GPT-4o Mini", tokens: "160", type: "Compact" }
    ],
    "Claude Models": [
      { name: "Claude-1", tokens: "90", type: "Standard" },
      { name: "Claude-2", tokens: "120", type: "Advanced" },
      { name: "Claude-3", tokens: "150", type: "Premium" }
    ],
  };

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900 shadow-lg">
      <motion.div className="relative" whileHover={{ scale: 1.05 }}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="text-sm md:text-lg font-semibold text-white flex items-center border border-gray-600 px-3 md:px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300">
            {selectedOption} <ChevronDown className="ml-2" size={16} />
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              asChild
              className="bg-gray-900 text-white rounded-lg shadow-lg p-3 w-[90vw] md:w-auto max-w-7xl overflow-y-auto md:overflow-x-auto max-h-[80vh] md:max-h-none flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 border border-gray-700 backdrop-blur-lg"
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
                    <div className="font-semibold text-sm md:text-base text-gray-400 border-b border-gray-700 mb-2 pb-1">
                      {group}
                    </div>
                    {options.map((option) => (
                      <DropdownMenu.Item
                        key={option.name}
                        className="px-3 md:px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer rounded-md transition-all duration-300 text-sm md:text-base"
                        onSelect={() => setSelectedOption(option.name)}
                      >
                        <div>
                          <div className="font-medium">{option.name}</div>
                          <div className="text-xs md:text-sm text-gray-400">
                            {option.type} - {option.tokens} tokens
                          </div>
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
  );
}