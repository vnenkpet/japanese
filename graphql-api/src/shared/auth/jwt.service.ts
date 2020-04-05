import jwt, { SignOptions } from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';

export class JwtService {
  constructor(private readonly config: ConfigService) {}

  async verify<T>(token: string): Promise<T> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.config.secretKey, (error, data) => {
        error ? reject(error) : resolve((data as unknown) as T);
      });
    });
  }

  async sign(payload: any, options?: SignOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        this.config.secretKey,
        Object.assign(
          {
            expiresIn: this.config.accessTokenExpiresIn,
          },
          options,
        ),
        (error, encoded) => {
          error ? reject(error) : resolve(encoded);
        },
      );
    });
  }
}
