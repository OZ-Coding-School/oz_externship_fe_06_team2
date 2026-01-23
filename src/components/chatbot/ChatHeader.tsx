type ChatHeaderProps = {
    onClose: () => void;
};

export default function ChatHeader({ onClose }: ChatHeaderProps) {
    return (
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-2xl">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
                    🤖
                </div>
                <span className="font-bold text-lg">AI OZ</span>
            </div>
            <button
                onClick={onClose}
                className="hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 text-xl"
                aria-label="닫기"
            >
                ✕
            </button>
        </div>
    );
}
