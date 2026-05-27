import { useMemo } from "react";
import type { Message } from "../../../stores/chatStore";

interface ChatMessageProps {
    message: Message;
}

function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.sender === "user";

    const time = useMemo(() => {
        const d = message.timestamp;
        const h = d.getHours().toString().padStart(2, "0");
        const m = d.getMinutes().toString().padStart(2, "0");
        return `${h}:${m}`;
    }, [message.timestamp]);

    return (
        <div className={`d-flex ${isUser ? "justify-content-end" : "justify-content-start"} mb-3`}>
            <div
                className={`rounded-3 px-3 py-2 ${isUser ? "bg-primary text-white" : "bg-body-tertiary text-body"}`}
                style={{ maxWidth: "75%" }}
            >
                <div className="text-break">{message.text}</div>
                <div className={`small mt-1 ${isUser ? "text-white-50" : "text-muted"}`}>{time}</div>
            </div>
        </div>
    );
}

export default ChatMessage;
