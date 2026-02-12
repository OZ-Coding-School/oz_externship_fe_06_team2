import { useState, useCallback } from 'react';
import { chatbotApi } from '@/api/chatbot';
import type { ChatMessage, ChatSession } from '@/components/chatbot/types';

export const useChatbot = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [session, setSession] = useState<ChatSession>({ sessionId: null });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createSession = useCallback(async (initData: { question?: string | number; title?: string; using_model?: string }) => {
        try {
            setIsLoading(true);
            const response = await chatbotApi.createSession(initData);
            setSession({
                sessionId: response.id,
                title: response.title,
                usingModel: response.using_model,
            });
            return response;
        } catch (err: any) {
            const errorMsg = err.response?.data?.detail || err.message;
            setError(errorMsg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteSession = useCallback(async () => {
        if (!session.sessionId) return;
        try {
            await chatbotApi.deleteSession(session.sessionId);
            setSession({ sessionId: null });
            setMessages([]);
        } catch (err) {
            console.error('Failed to delete session:', err);
        }
    }, [session.sessionId]);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim()) return;

        setMessages((prev) => [...prev, { role: 'user', text }]);

        if (!session.sessionId) {
            setMessages((prev) => [
                ...prev,
                { role: 'bot', text: '세션이 만료되었습니다. 다시 시도해주세요.' },
            ]);
            return;
        }

        try {
            setIsLoading(true);
            const aiResponse = await chatbotApi.sendMessage(session.sessionId, text);
            setMessages((prev) => [...prev, { role: 'bot', text: aiResponse }]);
        } catch (err) {
            console.error('Failed to send message:', err);
            setMessages((prev) => [
                ...prev,
                { role: 'bot', text: '죄송합니다. 오류가 발생했습니다.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, [session.sessionId]);

    return {
        messages,
        setMessages,
        session,
        setSession,
        isLoading,
        error,
        createSession,
        deleteSession,
        sendMessage,
    };
};
