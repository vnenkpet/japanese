import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from 'src/shared/config/config.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    return (
      ctx.getContext().headers.authorization.replace('Bearer ', ' ') ===
      this.config.secureApiToken
    );
  }
}
