type ChatFloatingButtonProps = {
    onClick: () => void;
};

export default function ChatFloatingButton({ onClick }: ChatFloatingButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-16 h-16 rounded-full bg-purple-600 text-white shadow-2xl hover:bg-purple-700 hover:scale-110 transition-all duration-300 flex items-center justify-center text-2xl"
            aria-label="챗봇 열기"
        >
            💬
        </button>
    );
}