import { useEffect, useRef } from "react";
import { useChatStore } from "../../../stores/chatStore";
import ChatMessage from "../../molecules/ChatMessage";
import ChatInput from "../../molecules/ChatInput";

function Chat() {
    const messages = useChatStore((s) => s.messages);
    const loading = useChatStore((s) => s.loading);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div className="d-flex flex-column h-100" style={{ minHeight: "70vh" }}>
            <div className="flex-grow-1 overflow-auto mb-3 p-3 border rounded-3 bg-body-tertiary">
                {messages.length === 0 && (
                    <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                        Envía un mensaje para comenzar la conversación
                    </div>
                )}

                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}

                {loading && (
                    <div className="d-flex justify-content-start mb-3">
                        <div className="bg-light rounded-3 px-3 py-2">
                            <span className="typing-indicator">
                                <span className="dot" />
                                <span className="dot" />
                                <span className="dot" />
                            </span>
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            <ChatInput />
        </div>
    );
}

export default Chat;
