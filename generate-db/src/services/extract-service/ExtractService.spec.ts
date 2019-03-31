import 'reflect-metadata';

import * as fs from 'fs';

import {
  createBasicContainer,
  initRuntimeContainer,
} from '../../inversify.config';
import { TYPES } from '../../types';

import { IExtractService } from './IExtractService';
import { IJmdictEntry } from '../interfaces/IJmdictEntry';
import { IJmnedictEntry } from '../interfaces/IJmnedictEntry';
import { IConfig } from 'src/IConfig';
import { injectable } from 'inversify';

// tslint:disable-next-line:max-classes-per-file
@injectable()
class TestConfig implements IConfig {
  get jmdictArchiveUrl() {
    return 'str';
  }
  get jmnedictArchiveUrl() {
    return 'str';
  }
  get mongoConnectionUri() {
    return 'str';
  }
}

describe('Export service', () => {
  const container = createBasicContainer();
  const extractService = container.get<IExtractService>(TYPES.ExtractService);

  it('Service is defined', async () => {
    expect(extractService).toBeDefined();
  });

  it('Succesfully extracts example Jmdict archive', async () => {
    const entries: IJmdictEntry[] = [];

    await extractService.extractJsonFromStream(
      fs.createReadStream(
        './src/services/__data__/exampleJmdictContent.json.tgz',
      ),
      'words.*',
      async data => {
        if (data.id) {
          entries.push(data);
        }
      },
    );

    expect(entries.length).toBe(3);
    expect(entries[0]).toMatchObject({
      id: '1000110',
      kanji: [
        {
          common: true,
          text: 'ＣＤプレーヤー',
          tags: [],
        },
        {
          common: false,
          text: 'ＣＤプレイヤー',
          tags: [],
        },
      ],
      kana: [
        {
          common: true,
          text: 'シーディープレーヤー',
          tags: [],
          appliesToKanji: ['ＣＤプレーヤー'],
        },
        {
          common: false,
          text: 'シーディープレイヤー',
          tags: [],
          appliesToKanji: ['ＣＤプレイヤー'],
        },
      ],
      sense: [
        {
          partOfSpeech: ['n'],
          appliesToKanji: ['*'],
          appliesToKana: ['*'],
          related: [],
          antonym: [],
          field: [],
          dialect: [],
          misc: [],
          info: [],
          languageSource: [],
          gloss: [
            {
              lang: 'eng',
              text: 'CD player',
            },
          ],
        },
      ],
    });
  });

  it('Succesfully extracts example Jmnedict archive', async () => {
    const entries: IJmnedictEntry[] = [];

    await extractService.extractJsonFromStream(
      fs.createReadStream(
        './src/services/__data__/exampleJmnedictContent.json.tgz',
      ),
      'words.*',
      async data => {
        if (data.id) {
          entries.push(data);
        }
      },
    );

    expect(entries.length).toBe(3);
    expect(entries[0]).toMatchObject({
      id: '1657560',
      kanji: [
        {
          text: '国労',
          tags: [],
        },
      ],
      kana: [
        {
          text: 'こくろう',
          tags: [],
          appliesToKanji: ['*'],
        },
      ],
      translation: [
        {
          type: ['organization'],
          related: [],
          translation: [
            {
              lang: '',
              text: 'National Railway Workers\' Union',
            },
          ],
        },
      ],
    });
  });
});
