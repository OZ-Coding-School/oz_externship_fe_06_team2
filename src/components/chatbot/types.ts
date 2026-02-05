export type ChatMessage = {
    role: "user" | "bot";
    text: string;
};

export type ChatSession = {
    sessionId: number | null;
    title?: string;
    usingModel?: string;
};
