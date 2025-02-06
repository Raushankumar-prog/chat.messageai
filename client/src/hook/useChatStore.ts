import { create } from "zustand";

type Message = {
  id: string;
  content: string;
  childMessages: Message[];
};

type ChatStore = {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  clearMessages: () => void;
  shouldScroll: boolean;
  setShouldScroll: (shouldScroll: boolean) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],

  addMessage: (message) => {
    console.log("Adding message:", message);
    set((state) => ({ messages: [...state.messages, message] }));
  },

  updateMessage: (id, updates) => {
    console.log("Updating message:", id, updates);
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, ...updates } : msg
      ),
    }));
  },

  clearMessages: () => {
    console.log("Clearing all messages");
    set({ messages: [] });
  },

  shouldScroll: true,

  setShouldScroll: (shouldScroll) => {
    console.log("Setting shouldScroll:", shouldScroll);
    set({ shouldScroll });
  },
}));
