import axios from 'axios';
import type { CreateUrlRequest, UrlResponse, ApiError } from '../types/shortener';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function shortenUrl(data: CreateUrlRequest): Promise<UrlResponse> {
    try {
        const res = await apiClient.post<UrlResponse>('/api/shorten', data);
        return res.data;

    } catch (error: any) {
        const apiError: ApiError = error.response?.data ?? {
            message: 'Unexpected error',
        };
        throw apiError;
    }
}
