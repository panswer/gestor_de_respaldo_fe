import { create } from "zustand";

export interface NotificationItem {
    id: string;
    message: string;
    variant: "success" | "danger" | "warning" | "info";
    duration: number;
}

interface NotificationState {
    notifications: NotificationItem[];
    notify: (n: Omit<NotificationItem, "id" | "duration"> & { duration?: number }) => void;
    remove: (id: string) => void;
}

let nextId = 0;

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    notify: (n) => {
        const id = String(++nextId);
        set((state) => ({
            notifications: [...state.notifications, { ...n, id, duration: n.duration ?? 3000 }],
        }));
    },
    remove: (id) => {
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        }));
    },
}));
