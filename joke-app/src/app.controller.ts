import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  apiVersion: string;

  constructor(private readonly appService: AppService) {
    this.apiVersion = process.env.npm_package_version;
  }

  // @Get()
  // @Render('index')
  // root() {
  //   return { message: 'Hello world!' };
  // }
  @Get()
  @Render('joke')
  async getJoke() {
    try {
      const joke = await this.appService.getJoke();

      return { joke, version: this.apiVersion };
    } catch (error) {
      console.log({ error });
    }
  }
}
