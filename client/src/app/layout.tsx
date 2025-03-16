// RootLayout.tsx
"use client";

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
  const authRoutes = [
    "/sign_in",
    "/sign_up",
    "/editprofile",
    "/account",
    "/settings",
    "/payment",
    "/reset_password",
    "/forget_password"
  ];

  if (authRoutes.includes(pathname)) {
    return (
      <html lang="en" className="font-serif">
        <body className="font-serif antialiased bg-gray-900 text-gray-300 h-screen flex items-center justify-center">
          <Providers>{children}</Providers>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="font-serif">
      <body className="font-serif antialiased bg-gray-900 text-gray-300 h-screen">
        <Providers>
          <div className="flex h-full">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gray-900 text-gray-100">
              <Header />
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