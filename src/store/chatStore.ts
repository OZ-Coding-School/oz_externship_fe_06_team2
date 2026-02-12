import { create } from 'zustand';

interface ChatState {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    toggleOpen: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    isOpen: false,
    setOpen: (isOpen) => set({ isOpen }),
    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
