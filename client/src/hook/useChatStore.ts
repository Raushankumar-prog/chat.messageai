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
  addMessage: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => Promise<void>;
  getMessages: (chatId: string) => Message[];
  shouldScroll: boolean;
  setShouldScroll: (shouldScroll: boolean) => void;
  addChat: (chat: Chat) => void;
  updateChats: (chats: Chat[]) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messagesByChatId: {},
  chats: [],

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

      resolve(); // Ensure Promise resolves
    });
  },

  getMessages: (chatId) => {
    const messagesById = get().messagesByChatId[chatId] || {};
    return Object.values(messagesById);
  },

  shouldScroll: true,
  setShouldScroll: (shouldScroll) => {
    set({ shouldScroll });
  },

  addChat: (chat) => {
    set((state) => ({
      chats: [chat, ...state.chats],
    }));
  },

  updateChats: (chats) => {
    set({ chats });
  },
}));
