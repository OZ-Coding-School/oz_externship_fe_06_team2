import { useState } from "react";
import type { ChatMessage } from "./chatbot/types";
import ChatFloatingButton from "./chatbot/ChatFloatingButton";
import ChatWindow from "./chatbot/ChatWindow";

export default function ChatbotUI() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const handleSendMessage = (text: string) => {
        setMessages((prev) => [
            ...prev,
            { role: "user", text },
            { role: "bot", text: "자고싶다..." },
        ]);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!open && <ChatFloatingButton onClick={() => setOpen(true)} />}
            {open && (
                <ChatWindow
                    messages={messages}
                    onClose={() => setOpen(false)}
                    onSendMessage={handleSendMessage}
                />
            )}
        </div>
    );
}