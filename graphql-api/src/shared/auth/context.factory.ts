import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationError } from 'apollo-server-core';
import { ExecutionParams } from 'subscriptions-transport-ws';
import { JwtService } from './jwt.service';
import { IUserIdentity } from './user-identity.interface';
import { AuthService } from './auth.service';
import { IGraphqlRequestContext } from './graphql-request-context.interface';

/**
 * Provides a request context for both HTTP and WS requests
 */
@Injectable()
export class ContextFactory {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  create(data: {
    mock: boolean;
  }): (params: {
    req: Request;
    connection: ExecutionParams<{ Authorization?: string }>;
  }) => Promise<IGraphqlRequestContext> {
    return async ({
      req,
      connection,
    }: {
      req: Request;
      connection: ExecutionParams;
    }) => {
      if (data.mock) {
        return {
          req,
          identity: {
            id: '123',
            username: 'Mock user',
          },
        };
      }

      // try to verify user identity if authorization header is present
      let identity: IUserIdentity = null;
      const authToken =
        (req ? req.headers.authorization : null) ||
        (connection ? connection.context.Authorization : null);

      if (authToken) {
        try {
          const token = authToken.replace('Bearer ', '');
          const user = await this.authService.validateUser(
            await this.jwtService.verify(token),
          );
          identity = {
            id: user.id,
            username: user.username,
          };
        } catch (e) {
          throw new AuthenticationError('Invalid token.');
        }
      }

      return {
        req,
        identity,
      };
    };
  }
}
