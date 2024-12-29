import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

describe('Create account (E2E)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    test('[POST] /accounts', async () => {
        await request(app.getHttpServer())
            .post('/accounts')
            .send({
                name: 'John Doe',
                email: 'M8d5t@example.com',
                password: '123456',
            })
            .expect(201);
    });

    afterAll(async () => {
        await app.close();
    });
});
