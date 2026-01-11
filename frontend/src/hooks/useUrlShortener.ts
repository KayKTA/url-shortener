import { useState } from 'react';
import type { UrlResponse, ApiError } from '../types/shortener';
import { shortenUrl } from '../services/shortener.api';

type UseUrlShortenerState = {
    result: UrlResponse | null;
    loading: boolean;
    error: string | null;
};

export function useUrlShortener() {
    const [state, setState] = useState<UseUrlShortenerState>({
        result: null,
        loading: false,
        error: null,
    });

    const shorten = async (url: string) => {
        setState({ result: null, loading: true, error: null });

        try {
            const data = await shortenUrl({ url });
            setState({ result: data, loading: false, error: null });

        } catch (error) {
            setState({
                result: null,
                loading: false,
                error: (error as ApiError).message,
            });
        }
    };

    const reset = () => {
        setState({ result: null, loading: false, error: null });
    };

    return {
        ...state,
        shorten,
        reset,
    };
}
