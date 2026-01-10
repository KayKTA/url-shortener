export class UrlResponseDto {
    shortUrl: string;
    code: string;
    originalUrl: string;
    createdAt: Date;

    constructor(partial: Partial<UrlResponseDto>) {
        Object.assign(this, partial);
    }
}
