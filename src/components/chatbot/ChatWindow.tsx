import type { ChatMessage } from "./types";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";

type ChatWindowProps = {
    messages: ChatMessage[];
    onClose: () => void;
    onSendMessage: (text: string) => void;
};

export default function ChatWindow({ messages, onClose, onSendMessage }: ChatWindowProps) {
    return (
        <div className="w-[420px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
            <ChatHeader onClose={onClose} />
            <ChatMessageList
                messages={messages}
                onSendSuggestion={onSendMessage}
            />
            <ChatInput onSend={onSendMessage} />
        </div>
    );
}