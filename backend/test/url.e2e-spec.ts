import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Url } from '../src/url/entities/url.entity';
import { Repository } from 'typeorm';

/**
 * End-to-End tests for the URL Shortener application.
 * These tests cover the main functionalities of the URL shortening service,
 * including URL shortening and redirection.
 */
describe('URL Shortener E2E', () => {
    let app: INestApplication;
    let urlRepo: Repository<Url>;

    // Initialize the NestJS application and repository before all tests
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();

        urlRepo = moduleRef.get<Repository<Url>>(getRepositoryToken(Url));
    });

    beforeEach(async () => {
        await urlRepo.clear(); // Clear the repository before each test
    });

    // Clean up the database after each test
    afterAll(async () => {
        await app.close();
    });

    it('POST /api/shorten returns a code + shortUrl + originalUrl', async () => {
        const longUrl = 'https://www.stoik.com/barometre-ifop-2025-eti-risque-cyber';

        const res = await request(app.getHttpServer())
            .post('/api/shorten')
            .send({ url: longUrl })
            .expect(201); // default for successful POST requests in NestJS

        expect(res.body).toHaveProperty('code');
        expect(res.body.code).toHaveLength(6);

        expect(res.body).toHaveProperty('shortUrl');

        expect(res.body).toHaveProperty('originalUrl', longUrl);
        expect(res.body).toHaveProperty('createdAt');
    });

    it('POST /api/shorten returns the same code for the same URL', async () => {
        const longUrl = 'https://www.stoik.com/barometre-ifop-2025-eti-risque-cyber';

        const res1 = await request(app.getHttpServer())
            .post('/api/shorten')
            .send({ url: longUrl })
            .expect(201);

        const res2 = await request(app.getHttpServer())
            .post('/api/shorten')
            .send({ url: longUrl })
            .expect(201);

        expect(res1.body.code).toBe(res2.body.code);
        expect(res1.body.originalUrl).toBe(longUrl);
    });

    it('GET /:code redirects to the original URL', async () => {
        const longUrl = 'https://www.stoik.com/barometre-ifop-2025-eti-risque-cyber';

        // create a shortened URL
        const postRes = await request(app.getHttpServer())
            .post('/api/shorten')
            .send({ url: longUrl })
            .expect(201);

        const { code } = postRes.body;

        // test the redirection
        const getRes = await request(app.getHttpServer())
            .get(`/${code}`)
            .expect(302); // 302 Found for redirection

        expect(getRes.headers.location).toBe(longUrl);
    });

    it('GET /:code returns 404 for non-existing code', async () => {
        const nonExistingCode = 'abcdef';

        await request(app.getHttpServer())
            .get(`/${nonExistingCode}`)
            .expect(404);
    });
});
