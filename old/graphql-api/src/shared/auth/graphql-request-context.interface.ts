import { IUserIdentity } from './user-identity.interface';

/**
 * Request context interface
 */
export interface IGraphqlRequestContext {
  identity: IUserIdentity;
}
