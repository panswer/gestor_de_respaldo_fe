import { useState, useEffect, useCallback, useRef } from "react";
import { useSystemNotificationStore, type SystemNotification } from "../../../stores/systemNotificationStore";
import Icon from "../../atoms/Icon";
import Dialog from "../Dialog";

const typeIcon: Record<string, string> = {
    success: "check-circle-fill",
    warning: "exclamation-triangle-fill",
    error: "x-circle-fill",
    info: "info-circle-fill",
};

const typeColor: Record<string, string> = {
    success: "text-success",
    warning: "text-warning",
    error: "text-danger",
    info: "text-primary",
};

function relativeTime(date: Date): string {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "ahora mismo";
    if (minutes < 60) return `hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `hace ${hours} h`;
    const days = Math.floor(hours / 24);
    return `hace ${days} día${days > 1 ? "s" : ""}`;
}

function NotificationBell() {
    const [open, setOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<SystemNotification | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const notifications = useSystemNotificationStore((s) => s.notifications);
    const markAsRead = useSystemNotificationStore((s) => s.markAsRead);
    const markAllAsRead = useSystemNotificationStore((s) => s.markAllAsRead);

    const unreadCount = notifications.filter((n) => !n.read).length;

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const handleToggle = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    const handleNotificationClick = useCallback((n: SystemNotification) => {
        markAsRead(n.id);
        setSelectedNotification(n);
        setOpen(false);
    }, [markAsRead]);

    const handleMarkAllRead = useCallback(() => {
        markAllAsRead();
    }, [markAllAsRead]);

    return (
        <><div className="position-relative me-2" ref={ref}>
            <button
                className="btn position-relative"
                onClick={handleToggle}
                aria-label="Notificaciones"
            >
                <Icon name={unreadCount > 0 ? "bell-fill" : "bell"} />
                {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
                        {unreadCount}
                    </span>
                )}
            </button>
            {open && (
                <div
                    className="dropdown-menu dropdown-menu-end show py-0"
                    style={{ width: "360px", maxHeight: "480px", overflowY: "auto", inset: "100% 0 auto auto" }}
                >
                    <h6 className="dropdown-header fs-6 py-2 mb-0 border-bottom">Notificaciones</h6>
                    {notifications.length === 0 ? (
                        <div className="dropdown-item-text text-center text-muted py-3">
                            No hay notificaciones
                        </div>
                    ) : (
                        notifications.map((n) => (
                            <div
                                key={n.id}
                                className={`dropdown-item border-bottom ${n.read ? "" : "bg-body-tertiary"}`}
                                onClick={() => handleNotificationClick(n)}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="d-flex align-items-start gap-2">
                                    <Icon name={typeIcon[n.type] ?? "info-circle-fill"} className={`mt-1 ${typeColor[n.type] ?? "text-primary"}`} />
                                    <div className="flex-grow-1 min-w-0" style={{ textOverflow: "ellipsis", maxWidth: '95%' }}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="fw-bold text-truncate">{n.title}</small>
                                            <small className="text-muted ms-2 text-nowrap">{relativeTime(n.timestamp)}</small>
                                        </div>
                                        <p className="mb-0 small text-muted text-truncate">{n.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    {notifications.length > 0 && (
                        <div className="text-center py-1">
                            <button
                                className="dropdown-item text-center small py-1 text-decoration-none"
                                onClick={handleMarkAllRead}
                            >
                                Marcar todas como leídas
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
            <Dialog
                show={selectedNotification !== null}
                onClose={() => setSelectedNotification(null)}
                title={selectedNotification?.title ?? ""}
            >
                <div className="d-flex align-items-start gap-2">
                    <Icon
                        name={typeIcon[selectedNotification?.type ?? "info"]}
                        className={`mt-1 fs-4 ${typeColor[selectedNotification?.type ?? "info"]}`}
                    />
                    <div>
                        <p className="mb-2">{selectedNotification?.message}</p>
                        <small className="text-muted">
                            {selectedNotification ? relativeTime(selectedNotification.timestamp) : ""}
                        </small>
                    </div>
                </div>
            </Dialog>
        </>);
}

export default NotificationBell;
