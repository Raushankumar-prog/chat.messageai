import { create } from "zustand";

type Chat = {
  id: string;
  title: string;
};

type Message = {
  id: string;
  content: string;
  childMessages: string[];
};

type ChatStore = {
  messagesByChatId: Record<string, Record<string, Message>>;
  chats: Chat[]; // Store chat titles
  addMessage: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => void;
  getMessages: (chatId: string) => Message[];
  shouldScroll: boolean;
  setShouldScroll: (shouldScroll: boolean) => void;
  addChat: (chat: Chat) => void; // Add new chat at the top
  updateChats: (chats: Chat[]) => void; // Update chats list when GET_CHATS runs
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
      chats: [chat, ...state.chats], // Prepend new chat at the top
    }));
  },

  updateChats: (chats) => {
    set({ chats });
  },
}));
