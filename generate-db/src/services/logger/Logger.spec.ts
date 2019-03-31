// tslint:disable:max-classes-per-file

import 'reflect-metadata';

import { createBasicContainer } from '../../inversify.config';
import { injectable, inject } from 'inversify';
import { scoped } from './Logger';
import { TYPES } from '../../types';
import { ILogger } from './ILogger';

describe('Test logger and its scoped decorator', () => {
  const container = createBasicContainer();

  it('Logs in correct scope', () => {
    @injectable()
    class TestService {
      @inject(TYPES.Logger)
      @scoped('test')
      private readonly logger: ILogger;

      public callMethodThatLogsToConsole(obj: any) {
        this.logger.log(obj);
      }
    }
    container.bind<TestService>(TestService).toSelf();

    const testService = container.get(TestService);
    const logSpy = jest.spyOn(process.stderr, 'write');

    const logMessage = 'This message should be written to std.err';
    testService.callMethodThatLogsToConsole(logMessage);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(logMessage));

    logSpy.mockReset();
    logSpy.mockRestore();
  });

  it('Does not log in incorrect scope', () => {
    @injectable()
    class TestService {
      @inject(TYPES.Logger)
      @scoped('not-test')
      private readonly logger: ILogger;

      public callMethodThatLogsToConsole(obj: any) {
        this.logger.log(obj);
      }
    }
    container.bind<TestService>(TestService).toSelf();

    const testService = container.get(TestService);
    const logSpy = jest.spyOn(process.stderr, 'write');

    const logMessage = 'This message should not be written to std.err';
    testService.callMethodThatLogsToConsole(logMessage);
    expect(logSpy).not.toBeCalled();

    logSpy.mockReset();
    logSpy.mockRestore();
  });
});
