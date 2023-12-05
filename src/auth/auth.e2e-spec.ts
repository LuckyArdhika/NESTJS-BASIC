import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AuthService } from '@/src/auth/auth.service';
import { AuthModule } from '@/src/auth/auth.module';

describe('TodoModule', () => {
 let app: INestApplication;

 const mockTodoService = {
   getAll: jest.fn(),
   get: jest.fn(),
   create: jest.fn(),
   update: jest.fn(),
   delete: jest.fn(),
   markAsInActive: jest.fn(),
 };

 function waitSeconds(): Promise<void> {
  return new Promise((resolve) =>  {
    setTimeout(() => {
      resolve();
    }, 3000); // 3000 milliseconds = 3 seconds
  });
}

 const auth = {
  'signin': '/api/auth/signin'
 };

 beforeEach(async () => {
   const moduleFixture: TestingModule = await Test.createTestingModule({
     imports: [AuthModule],
   })
     .overrideProvider(AuthService)
     .useValue(mockTodoService)
     .compile();

   app = moduleFixture.createNestApplication();
   await app.init();
   await waitSeconds();
 });

//  afterEach(() => {
//    jest.clearAllMocks();
//  });

 describe(`POST:  ${auth.signin}`, () => {
  //  beforeEach(() => {
  //    jest.spyOn(mockTodoService, 'create');
  //  });

   it('should return OK', async () => {
     await (await request(app.getHttpServer()).post(auth.signin)).body({}).expect(400, {});
   });
 });
});