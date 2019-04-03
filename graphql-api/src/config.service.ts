import { Injectable } from '@nestjs/common';
import { IConfig } from './config.interface';

@Injectable()
export class Config implements IConfig {
  get mongoConnectionUri(): string {
    return process.env.MONGO_URI || 'mongodb://localhost:27017/nest_test';
  }

  get secureApiToken(): string {
    return process.env.SECURE_API_TOKEN || '123';
  }
}
