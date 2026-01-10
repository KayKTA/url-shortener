import { Controller, Post, Get, Body, Param, Redirect, ValidationPipe } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlResponseDto } from './dto/url-response.dto';

@Controller()
export class UrlController {
    constructor(private readonly urlService: UrlService) { }

    // Create Shortened URL
    @Post('api/shorten')
    async shortenUrl(@Body(ValidationPipe) dto: CreateUrlDto): Promise<UrlResponseDto> {
        const url = await this.urlService.createShortUrl(dto);

        return new UrlResponseDto({
            shortUrl: `http://localhost:3000/${url.code}`,
            code: url.code,
            originalUrl: url.originalUrl,
            createdAt: url.createdAt,
        });
    }
}
