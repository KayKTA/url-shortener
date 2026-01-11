import { useState, useEffect } from 'react';
import type { UrlResponse } from '../types/shortener';

const HISTORY_KEY = 'url_shortener_history';
const HISTORY_EVENT = 'url_history_updated';
const MAX_ITEMS = 20;

// Safely parses the history from localStorage, returning an empty array on failure
function safeParseHistory(value: string | null): UrlResponse[] {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? (parsed as UrlResponse[]) : [];
    } catch {
        return [];
    }
}

export function useUrlHistory() {
    const [history, setHistory] = useState<UrlResponse[]>(() => {
        return safeParseHistory(localStorage.getItem(HISTORY_KEY)).slice(0, MAX_ITEMS);
    });

    const persist = (items: UrlResponse[]) => {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
    };

    const reloadFromStorage = () => {
        setHistory(safeParseHistory(localStorage.getItem(HISTORY_KEY)));
    };

    useEffect(() => {
        const handleUpdate = () => reloadFromStorage();
        window.addEventListener(HISTORY_EVENT, handleUpdate);
        return () => window.removeEventListener(HISTORY_EVENT, handleUpdate);
    }, []);

    const addUrlToHistory = (url: UrlResponse) => {
        setHistory(prev => {
            const updated = [url, ...prev.filter(u => u.code !== url.code)].slice(0, MAX_ITEMS);
            persist(updated);
            window.dispatchEvent(new Event(HISTORY_EVENT));
            return updated;
        });
    };

    const removeUrlFromHistory = (code: string) => {
        setHistory(prev => {
            const updated = prev.filter(u => u.code !== code);
            persist(updated);
            window.dispatchEvent(new Event(HISTORY_EVENT));
            return updated;
        });
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(HISTORY_KEY);
        window.dispatchEvent(new Event(HISTORY_EVENT));
    };

    return {
        history,
        addUrlToHistory,
        removeUrlFromHistory,
        clearHistory,
    };
}
