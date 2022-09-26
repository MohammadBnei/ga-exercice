import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from 'nestjs-http-promise';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService, HttpModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a joke ', async () => {
      const { joke } = await appController.getJoke();
      expect(joke).toHaveProperty('id');
      expect(joke).toHaveProperty('category');
      expect(joke).toHaveProperty('type');
    });

    it('should return the api version ', async () => {
      expect(appController.apiVersion).toBeDefined();
    });
  });
});
