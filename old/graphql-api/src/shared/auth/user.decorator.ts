import { createParamDecorator } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-core';

export const UserIdentity = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    if (!ctx.identity) {
      throw new AuthenticationError(
        'Cannot get user identity, possibly not authenticated',
      );
    }
    return ctx.identity;
  },
);
