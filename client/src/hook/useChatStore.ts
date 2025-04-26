"use client";
import { create } from "zustand";

type Chat = {
  id: string;
  title: string;
};

type Message = {
  id: string;
  content: string;
  childMessages: Array<{  
    id: string;
    content: string;
  }>;
};

type ChatStore = {
  messagesByChatId: Record<string, Record<string, Message>>;
  chats: Chat[];
  isSidebarOpen: boolean;
  isMobile: boolean;
  selectedOption: string;
  addMessage: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => Promise<void>;
  getMessages: (chatId: string) => Message[];
  shouldScroll: boolean;
  setShouldScroll: (shouldScroll: boolean) => void;
  addChat: (chat: Chat) => void;
  updateChats: (chats: Chat[]) => void;
  toggleSidebar: () => void;
  setIsMobile: (isMobile: boolean) => void;
  setSelectedOption: (option: string) => void;
  getModelType: (selectedOption:string) => string;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messagesByChatId: {},
  chats: [],
  isSidebarOpen: true,
  isMobile: false,
  selectedOption: "Gemini-1.5-pro",
  shouldScroll: true,

  addMessage: (chatId, message) => {
    set((state) => ({
      messagesByChatId: {
        ...state.messagesByChatId,
        [chatId]: {
          ...(state.messagesByChatId[chatId] || {}),
          [message.id]: message,
        },
      },
    }));
  },

  updateMessage: (chatId, messageId, updates) => {
    return new Promise<void>((resolve) => {
      set((state) => {
        const chatMessages = state.messagesByChatId[chatId] || {};
        if (!chatMessages[messageId]) return state;

        return {
          messagesByChatId: {
            ...state.messagesByChatId,
            [chatId]: {
              ...chatMessages,
              [messageId]: { ...chatMessages[messageId], ...updates },
            },
          },
        };
      });
      resolve();
    });
  },

  getMessages: (chatId) => {
    const messagesById = get().messagesByChatId[chatId] || {};
    return Object.values(messagesById);
  },

  setShouldScroll: (shouldScroll) => set({ shouldScroll }),
  addChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
  updateChats: (chats) => set({ chats }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setIsMobile: (isMobile) => set({ isMobile }),
  setSelectedOption: (option) => set({ selectedOption: option }),
   getModelType: (selectedOption:string) => {
      const model = selectedOption.toLowerCase();
      if (model.startsWith("gemini")) return "gemini";
      if (model.startsWith("gpt")) return "gpt";
      if (model.startsWith("claude")) return "claude";
      if (model.startsWith("grok")) return "grok";
      return "gemini"; 
    }
}));