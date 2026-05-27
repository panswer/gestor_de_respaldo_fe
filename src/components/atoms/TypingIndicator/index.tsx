function TypingIndicator() {
    return (
        <div className="d-flex justify-content-start mb-3">
            <div className="bg-light rounded-3 px-3 py-2">
                <span className="typing-indicator">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                </span>
            </div>
        </div>
    );
}

export default TypingIndicator;
