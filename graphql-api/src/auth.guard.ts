import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Types } from './types';
import { IConfig } from './config.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(Types.CONFIG) private readonly config: IConfig) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    return (
      ctx.getContext().headers.authorization.replace('Bearer ', ' ') ===
      this.config.secureApiToken
    );
  }
}
