import { useState, useEffect } from 'react';
import type { UrlResponse } from '../types/shortener';

const HISTORY_KEY = 'url_shortener_history';

export function useUrlHistory() {
    const [history, setHistory] = useState<UrlResponse[]>([]);

    // Load history from localStorage on initial render
    useEffect(() => {
        const saved = localStorage.getItem(HISTORY_KEY);
        if (saved) {
            setHistory(JSON.parse(saved));
        }
    }, []);

    // Adds a new URL to the history, ensuring no duplicates based on the code
    const addUrlToHistory = (url: UrlResponse) => {
        const updatedHistory = [url, ...history.filter(u => u.code !== url.code)];
        setHistory(updatedHistory);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    };

    // Removes a URL from the history based on its code
    const removeUrlFromHistory = (code: string) => {
        const updatedHistory = history.filter(url => url.code !== code);
        setHistory(updatedHistory);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    };

    // Clears the entire URL history
    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(HISTORY_KEY);
    };

    return {
        history,
        addUrlToHistory,
        removeUrlFromHistory,
        clearHistory,
    };
}
