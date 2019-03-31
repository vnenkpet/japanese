import { ILogger } from './ILogger';
import Debug from 'debug';
import { injectable } from 'inversify';

import { named } from 'inversify';

// alias for "named" decorator to make the inject code more human-readable
export function scoped(scope: string) {
  return named(scope);
}

@injectable()
export class Logger implements ILogger {
  private debug: debug.Debugger;

  constructor(rootScope: string, scope: string) {
    this.debug = Debug(scope ? `${rootScope}:${scope}` : rootScope);
  }

  log(obj: any) {
    this.debug(obj);
  }
}
