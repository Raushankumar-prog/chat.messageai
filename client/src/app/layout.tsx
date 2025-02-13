"use client";
import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import ChatInput from "./components/ChatInput";
import Providers from "@components/Providers";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname === "/sign_in"  || pathname === "/sign_up"   || pathname === "/editprofile"  || pathname === "/account" || pathname === "/settings" || pathname === "/payment" || pathname === "/reset_password" || pathname==="/forget_password") {
    return (
      <html lang="en" className="font-serif">
        
        <body className="font-serif antialiased bg-gray-900 text-gray-300 h-screen flex items-center justify-center">
            <Providers>{children}</Providers> 
           {/* Render the sign-in page */}
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="font-serif">
      <body className="font-serif antialiased bg-gray-900 text-gray-300 h-screen">
        <Providers>
          <div className="flex h-full">
            {/* Sidebar */}
            <ScrollArea.Root className="h-full bg-gray-800">
              <ScrollArea.Viewport className="h-full">
                <Sidebar />
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                orientation="vertical"
                className="flex w-2 bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <ScrollArea.Thumb className="bg-gray-500 rounded-full" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-gray-900 text-gray-100">
              {/* Header */}
              <Header />
              {/* Scrollable Content */}
              <ScrollArea.Root className="flex-1 overflow-hidden">
                <ScrollArea.Viewport className="h-full p-6">
                  {children}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  orientation="vertical"
                  className="flex w-2 bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <ScrollArea.Thumb className="bg-gray-500 rounded-full" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
              <ChatInput />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
