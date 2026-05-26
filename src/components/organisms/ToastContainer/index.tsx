import { useNotificationStore } from "../../../stores/notificationStore";
import Toast from "../../molecules/Toast";

function ToastContainer() {
    const notifications = useNotificationStore((s) => s.notifications);
    const remove = useNotificationStore((s) => s.remove);

    return (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1056 }}>
            {notifications.map(n => (
                <Toast
                    key={n.id}
                    message={n.message}
                    variant={n.variant}
                    duration={n.duration}
                    onClose={() => remove(n.id)}
                />
            ))}
        </div>
    );
}

export default ToastContainer;
