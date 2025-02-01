import { create } from "zustand";

type Message = {
  id: string;
  content: string;
  childMessages: Message[];
};

type ChatStore = {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateMessage:(id, updates)=>void;
  clearMessages: () => void;  
  shouldScroll: boolean;
  setShouldScroll: (shouldScroll: boolean) => void;
};




export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
 updateMessage: (id, updates) =>
  set((state) => ({
    messages: state.messages.map((msg) =>
      msg.id === id ? { ...msg, ...updates } : msg
    ),
  })),

  clearMessages: () => set({ messages: [] }),
  shouldScroll: true,
  setShouldScroll: (shouldScroll) => set({ shouldScroll }),
}));


