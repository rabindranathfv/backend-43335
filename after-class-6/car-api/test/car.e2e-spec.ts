import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const CAR_ROUTE = 'car';
const CAR_ID = '651b4359be4a1cf43dfcae7c';

describe('Car endpoints', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/car (GET)', async () => {
    const { statusCode, ok, body } = await request(app.getHttpServer()).get(
      `/${CAR_ROUTE}`,
    );
    expect(statusCode).toBe(200);
    expect(ok).toBeTruthy();
    expect(body).toBeDefined();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length > 0).toBe(true);
  });

  it('/car/:id (GET)', async () => {
    const { statusCode, ok, body } = await request(app.getHttpServer()).get(
      `/${CAR_ROUTE}/${CAR_ID}`,
    );

    expect(statusCode).toBe(200);
    expect(ok).toBeTruthy();
    expect(body).toBeDefined();
    expect(body).toEqual({
      _id: '651b4359be4a1cf43dfcae7c',
      brand: 'Buggati',
      model: 'Bigatti Pro Plus',
      price: 2000000,
      year: '2023',
      __v: 0,
    });
  });
});
