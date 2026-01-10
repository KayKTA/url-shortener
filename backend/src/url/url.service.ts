import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import * as crypto from 'crypto';
import { CreateUrlDto } from './dto/create-url.dto';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url)
        private urlRepository: Repository<Url>,
    ) { }

    private async generateUniqueCode(): Promise<string> {
        const maxAttempts = 5; // Limit the number of attempts to avoid infinite loops

        for (let i = 0; i < maxAttempts; i++) {
            // Generate a random 6-character alphanumeric code
            const code = crypto
                .randomBytes(4)
                .toString('base64')
                .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric characters + / =
                .substring(0, 6);

            // Check if the code already exists in the database
            const exists = await this.urlRepository.findOne({
                where: { code },
            });

            // If it doesn't exist, return the code
            if (!exists) {
                return code;
            }
        }

        throw new Error('Failed to generate unique code after multiple attempts');
    }

    async createShortUrl(dto: CreateUrlDto): Promise<Url> {
        const code = await this.generateUniqueCode();

        const newUrl = this.urlRepository.create({
            originalUrl: dto.url,
            code,
        });

        return this.urlRepository.save(newUrl);
    }

}
