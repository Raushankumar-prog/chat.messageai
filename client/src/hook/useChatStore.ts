import { create } from "zustand";

type Message = {
  id: string;
  content: string;
  childMessages: string[]; // Store only child message IDs
};

type ChatStore = {
  messagesByChatId: Record<string, Record<string, Message>>; // Store messages by ID
  addMessage: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => void;
  getMessages: (chatId: string) => Message[];
  shouldScroll: boolean;
  setShouldScroll: (shouldScroll: boolean) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messagesByChatId: {},

  addMessage: (chatId, message) => {
    console.log(`Adding message ${message.id} to chat ${chatId}`);
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
    console.log(`Updating message ${messageId} in chat ${chatId}:`, updates);
    set((state) => {
      const chatMessages = state.messagesByChatId[chatId] || {};
      if (!chatMessages[messageId]) return state; // Message not found

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
    console.log("Setting shouldScroll:", shouldScroll);
    set({ shouldScroll });
  },
}));
