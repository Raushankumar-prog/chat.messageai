"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export default function Header() {
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState("Gemini");

  // Options for the dropdown
  const options = ["Gemini", "GPT-4 Turbo", "GPT-3.5"];

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-800">
      <div className="relative">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="text-lg font-semibold text-gray-300 flex items-center">
            {selectedOption} <span className="ml-1">▼</span>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-gray-800 text-gray-300 rounded-md shadow-md p-2"
              sideOffset={5}
              align="start"
            >
              {options.map((option) => (
                <DropdownMenu.Item
                  key={option}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onSelect={() => setSelectedOption(option)}
                >
                  {option}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>


    </div>
  );
}
