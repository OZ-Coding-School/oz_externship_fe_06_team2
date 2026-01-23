import { useState } from "react";

type ChatInputProps = {
    onSend: (text: string) => void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;
        onSend(text);
        setInput("");
    };

    return (
        <div className="p-4 border-t bg-white">
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                    }}
                />
                <button
                    type="button"
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="px-5 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-purple-600 to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:hover:from-purple-600 disabled:hover:to-purple-700"
                >
                    보내기
                </button>
            </div>
        </div>
    );
}
