import { IsUrl } from 'class-validator';

export class CreateUrlDto {
    @IsUrl(
        {
            protocols: ['http', 'https'], // Only allow http and https protocols
            require_protocol: true,
        },
        {
            message: 'Invalid URL format. Please provide a valid URL starting with http:// or https://',
        }
    )
    url: string;
}
