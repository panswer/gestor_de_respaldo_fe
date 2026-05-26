import { useEffect, useState, useCallback, useRef } from "react";
import Icon from "../../atoms/Icon";

const variantBg: Record<string, string> = {
    success: "text-bg-success",
    danger: "text-bg-danger",
    warning: "text-bg-warning",
    info: "text-bg-info",
};

const variantIcon: Record<string, string> = {
    success: "check-circle-fill",
    danger: "exclamation-circle-fill",
    warning: "exclamation-triangle-fill",
    info: "info-circle-fill",
};

interface ToastProps {
    message: string;
    variant?: string;
    duration?: number;
    onClose: () => void;
}

function Toast({ message, variant = "info", duration, onClose }: ToastProps) {
    const [visible, setVisible] = useState(true);
    const [active, setActive] = useState(false);
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            setActive(true);
        });
        return () => cancelAnimationFrame(raf);
    }, []);

    useEffect(() => {
        if (!duration) return;
        const id = setTimeout(() => setActive(false), duration);
        return () => clearTimeout(id);
    }, [duration]);

    const handleTransitionEnd = useCallback((e: React.TransitionEvent) => {
        if (e.target !== e.currentTarget) return;
        if (!active) {
            setVisible(false);
            onCloseRef.current();
        }
    }, [active]);

    if (!visible) return null;

    return (
        <div
            className={`toast align-items-center border-0 ${variantBg[variant] ?? "text-bg-info"} ${active ? "show" : ""} fade d-block mb-2`}
            role="alert"
            onTransitionEnd={handleTransitionEnd}
        >
            <div className="d-flex">
                <div className="toast-body">
                    <Icon name={variantIcon[variant] ?? "info-circle-fill"} className="me-2" />
                    {message}
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setActive(false)} aria-label="Close" />
            </div>
        </div>
    );
}

export default Toast;
