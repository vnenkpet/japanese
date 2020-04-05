import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get mongoConnectionUri(): string {
    return process.env.MONGO_URI || 'mongodb://localhost:27017/nest_test';
  }

  get secureApiToken(): string {
    return process.env.SECURE_API_TOKEN || '123';
  }

  get secretKey(): string {
    return process.env.AUTH_SECRET || '123';
  }

  get accessTokenExpiresIn(): number {
    return Number(process.env.AUTH_ACCESS_TOKEN_EXPIRES_IN) ?? 3600;
  }

  get refreshTokenExpiresIn(): number {
    return Number(process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN) ?? 3600;
  }
}
