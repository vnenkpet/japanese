import 'reflect-metadata';

import { container } from '../inversify.config';
import { TYPES } from '../types';
import { IExtractService } from './IExtractService';
import * as fs from 'fs';
import { IEntry } from './IEntry';

describe('Export service', () => {
  const extractService = container.get<IExtractService>(TYPES.ExtractService);

  it('Service is defined', async () => {
    expect(extractService).toBeDefined();
  });

  it('Read the size of the file', async () => {
    const str = fs
      .readFileSync('./src/services/__data__/jmdict-eng-common-3.0.1.json')
      .toString('utf8');
    const parsed = JSON.parse(str);
    expect(parsed.words.length).toMatchSnapshot();
  });

  it('Succesfully extracts example archive', async () => {
    const entries: IEntry[] = [];

    await extractService.extractJsonFromStream(
      fs.createReadStream(
        './src/services/__data__/exampleJsonContent.json.tgz',
      ),
      'words.*',
      data => {
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
});
