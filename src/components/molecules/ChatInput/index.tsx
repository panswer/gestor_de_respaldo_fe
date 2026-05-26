import { useCallback, useRef } from "react";
import { useChatStore } from "../../../stores/chatStore";

function ChatInput() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const loading = useChatStore((s) => s.loading);
    const sendMessage = useChatStore((s) => s.sendMessage);

    const handleSend = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea || loading) return;
        const text = textarea.value.trim();
        if (!text) return;
        textarea.value = "";
        textarea.style.height = "auto";
        sendMessage(text);
    }, [loading, sendMessage]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        },
        [handleSend]
    );

    const handleInput = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, []);

    return (
        <div className="input-group">
            <textarea
                ref={textareaRef}
                className="form-control"
                rows={1}
                placeholder="Escribe un mensaje..."
                disabled={loading}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                style={{ resize: "none" }}
            />
            <button
                className="btn btn-primary"
                type="button"
                disabled={loading}
                onClick={handleSend}
            >
                <i className="bi bi-send" />
            </button>
        </div>
    );
}

export default ChatInput;
