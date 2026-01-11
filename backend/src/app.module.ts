import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UrlModule } from './url/url.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        // Load environment variables from .env file
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        // Configure TypeORM with PostgreSQL
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST || 'localhost',
            port: parseInt(process.env.DATABASE_PORT || '5432', 10),
            username: process.env.DATABASE_USER || 'postgres',
            password: process.env.DATABASE_PASSWORD || 'postgres',
            database: process.env.DATABASE_NAME || 'urlshortener',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true, // Note: Auto-create tables -> Set to false in production
            // logging: true, // Enable query logging for debugging
        }),

        UrlModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
