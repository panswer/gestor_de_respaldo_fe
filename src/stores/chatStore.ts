import { create } from "zustand";
import { getBotResponse } from "../services/chat";

export interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

interface ChatState {
    messages: Message[];
    loading: boolean;
    sendMessage: (text: string) => Promise<void>;
}

function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    loading: false,
    sendMessage: async (text: string) => {
        const userMsg: Message = {
            id: generateId(),
            text,
            sender: "user",
            timestamp: new Date(),
        };

        set((state) => ({
            messages: [...state.messages, userMsg],
            loading: true,
        }));

        const botMsg = await getBotResponse(text);

        set((state) => ({
            messages: [...state.messages, botMsg],
            loading: false,
        }));
    },
}));
