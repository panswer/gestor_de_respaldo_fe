import { useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
    show: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
    size?: "sm" | "lg" | "xl";
    centered?: boolean;
    scrollable?: boolean;
    staticBackdrop?: boolean;
}

function Dialog({
    show,
    onClose,
    title,
    children,
    footer,
    size,
    centered,
    scrollable,
    staticBackdrop,
}: DialogProps) {
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(false);
    const onCloseRef = useRef(onClose);
    const visibleRef = useRef(visible);

    useEffect(() => {
        visibleRef.current = visible;
    }, [visible]);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        if (show) {
            requestAnimationFrame(() => {
                setVisible(true);
                requestAnimationFrame(() => {
                    setActive(true);
                });
            });
        } else if (visibleRef.current) {
            requestAnimationFrame(() => {
                setActive(false);
            });
        }
    }, [show]);

    const handleTransitionEnd = useCallback((e: React.TransitionEvent<HTMLDivElement>) => {
        // Nos aseguramos que el evento provenga del contenedor y no de un elemento hijo
        if (!active && e.target === e.currentTarget) {
            setVisible(false);
        }
    }, [active]);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [visible]);

    useEffect(() => {
        if (!visible) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onCloseRef.current();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [visible]);

    const handleBackdropClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget && !staticBackdrop) {
                onCloseRef.current();
            }
        },
        [staticBackdrop],
    );

    if (!visible) return null;

    const dialogSize = size ? ` modal-${size}` : "";
    const dialogCentered = centered ? " modal-dialog-centered" : "";
    const dialogScrollable = scrollable ? " modal-dialog-scrollable" : "";

    return createPortal(
        <>
            <div className={`modal-backdrop fade ${active ? "show" : ""}`} />
            <div
                className={`modal fade ${active ? "show" : ""} d-block`}
                onClick={handleBackdropClick}
                onTransitionEnd={handleTransitionEnd}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "modal-title" : undefined}
            >
                <div className={`modal-dialog${dialogSize}${dialogCentered}${dialogScrollable}`}>
                    <div className="modal-content">
                        <div className="modal-header">
                            {title && <h5 className="modal-title" id="modal-title">{title}</h5>}
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
                        </div>
                        <div className="modal-body">{children}</div>
                        {footer && <div className="modal-footer">{footer}</div>}
                    </div>
                </div>
            </div>
        </>,
        document.body,
    );
}

export default Dialog;
