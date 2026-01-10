import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable global validation pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true, // Automatically transform payloads to DTO instances
        }),
    );

    // Enable CORS for frontend-backend communication
    app.enableCors({
        origin: 'http://localhost:5173', // Frontend URL
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    await app.listen(3000);
    console.log('🚀 Backend running on http://localhost:3000');
}
bootstrap();
