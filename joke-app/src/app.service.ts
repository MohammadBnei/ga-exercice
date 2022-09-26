import { HttpService } from 'nestjs-http-promise';
import { Injectable } from '@nestjs/common';
import Joke from './joke';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getJoke(): Promise<Joke> {
    const response = await this.httpService.get(
      process.env.JOKE_URL || 'https://v2.jokeapi.dev/joke/Any',
      {
        headers: {
          accept: 'application/json',
        },
      },
    );
    const data = response.data;

    return data;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
