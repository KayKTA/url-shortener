export interface CreateUrlRequest {
    url: string;
}

export interface UrlResponse {
    shortUrl: string;
    code: string;
    originalUrl: string;
    createdAt: string;
}

export interface ApiError {
    message: string;
    statusCode?: number;
}
