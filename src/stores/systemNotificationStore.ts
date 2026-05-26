import { create } from "zustand";

export interface SystemNotification {
    id: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    read: boolean;
    timestamp: Date;
}

interface SystemNotificationState {
    notifications: SystemNotification[];
    add: (n: Omit<SystemNotification, "id" | "read" | "timestamp">) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    remove: (id: string) => void;
}

let nextId = 0;

const mockNotifications: SystemNotification[] = [
    {
        id: String(++nextId),
        title: "Copia de seguridad completada",
        message: "La copia de seguridad del servidor principal finalizó correctamente.",
        type: "success",
        read: false,
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
        id: String(++nextId),
        title: "Espacio de almacenamiento bajo",
        message: "Queda menos del 10% de espacio disponible en el disco de respaldo.",
        type: "warning",
        read: false,
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
        id: String(++nextId),
        title: "Error de sincronización",
        message: "No se pudo sincronizar con el servidor secundario. Reintentando en 5 minutos.",
        type: "error",
        read: true,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
        id: String(++nextId),
        title: "Nuevo usuario registrado",
        message: "El usuario 'Carlos Gómez' se ha registrado en el sistema.",
        type: "info",
        read: true,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
];

export const useSystemNotificationStore = create<SystemNotificationState>((set) => ({
    notifications: mockNotifications,
    add: (n) => {
        const id = String(++nextId);
        set((state) => ({
            notifications: [
                { ...n, id, read: false, timestamp: new Date() },
                ...state.notifications,
            ],
        }));
    },
    markAsRead: (id) => {
        set((state) => ({
            notifications: state.notifications.map((n) =>
                n.id === id ? { ...n, read: true } : n,
            ),
        }));
    },
    markAllAsRead: () => {
        set((state) => ({
            notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
    },
    remove: (id) => {
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        }));
    },
}));
