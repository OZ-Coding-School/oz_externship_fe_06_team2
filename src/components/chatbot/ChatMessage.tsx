import type { ChatMessage as ChatMessageType } from "./types";

type ChatMessageProps = {
    message: ChatMessageType;
};

export default function ChatMessage({ message }: ChatMessageProps) {
    return (
        <div
            className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-sm ${message.role === "user"
                ? "ml-auto bg-gradient-to-br from-purple-600 to-purple-700 text-white"
                : "mr-auto bg-gray-100 text-gray-800"
                }`}
        >
            {message.text}
        </div>
    );
}
