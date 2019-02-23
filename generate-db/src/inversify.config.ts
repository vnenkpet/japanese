import { Container } from 'inversify';
import { IExtractService } from './services/IExtractService';
import { ExtractService } from './services/ExtractService';
import { TYPES } from './types';
import { Main } from './services/Main';
import { IMain } from './services/IMain';

const container = new Container();
container.bind<IExtractService>(TYPES.ExtractService).to(ExtractService);
container.bind<IMain>(TYPES.Main).to(Main);

export { container };
