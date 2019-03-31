import 'reflect-metadata';

import { createBasicContainer } from '../../inversify.config';
import { injectable, inject } from 'inversify';
import { scoped } from './Logger';
import { TYPES } from '../../types';
import { ILogger } from './ILogger';

@injectable()
class SampleService {
  @inject(TYPES.Logger)
  @scoped('test')
  private readonly logger: ILogger;

  public callMethodThatLogs(obj: any) {
    this.logger.log(obj);
  }
}

describe('Logs stuff', () => {
  const container = createBasicContainer();
  container.bind<SampleService>(SampleService).toSelf();

  it('Logs in correct scope', () => {
    const sampleService = container.get(SampleService);
    const logSpy = jest.spyOn(process.stderr, 'write');

    const logMessage = 'This message be written to std.err';
    sampleService.callMethodThatLogs(logMessage);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(logMessage));

    logSpy.mockReset();
    logSpy.mockRestore();
  });
});
