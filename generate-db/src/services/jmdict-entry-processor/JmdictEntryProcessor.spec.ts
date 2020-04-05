import 'reflect-metadata';

import { createBasicContainer } from '../../inversify.config';
import { TYPES } from '../../types';

import { IJmdictEntry } from '../interfaces/IJmdictEntry';
import { IJmnedictEntry } from '../interfaces/IJmnedictEntry';

import { IJmdictEntryProcessor } from './IJmdictEntryProcessor';
import { ISearchEngineParser } from '../search-engine-parser/ISearchEngineParser';
import {
  IProcessedEntry,
  SourceDictionary,
} from '../interfaces/IProcessedEntry';

const extractedJmdictEntry: IJmdictEntry = {
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
};

const extractedJmnedictEntry: IJmnedictEntry = {
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
          text: "National Railway Workers' Union",
        },
      ],
    },
  ],
};

const processedJmdictEntry: IProcessedEntry = {
  id: '1000110',
  kanji: [
    { common: true, text: 'ＣＤプレーヤー', tags: [] },
    { common: false, text: 'ＣＤプレイヤー', tags: [] },
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
      gloss: [{ lang: 'eng', text: 'CD player', searchKey: 'cd player' }],
    },
  ],
  sourceDictionary: SourceDictionary.jmdict,
  sourceFile:
    'https://github.com/scriptin/jmdict-simplified/releases/download/3.0.1/jmdict-eng-3.0.1.json.tgz',
  modifiedAt: expect.anything(),
  searchEngineResults: 3,
};

describe('JmDictEntry processor service', () => {
  const container = createBasicContainer();

  // mock the search engine data parser
  container
    .rebind<ISearchEngineParser>(TYPES.SearchEngineParser)
    .toConstantValue({
      getResultsCountForJmdictEntry: async () => 3,
      getResultsCountForJmnedictEntry: async () => 3,
    });

  const jmdictProcessor = container.get<IJmdictEntryProcessor>(
    TYPES.JmdictEntryProcessor,
  );

  it('Service is defined', async () => {
    expect(jmdictProcessor).toBeDefined();
  });

  it('Succesfully transforms jmdict', async () => {
    const result = await jmdictProcessor.process(extractedJmdictEntry);
    expect(result).toMatchObject(processedJmdictEntry);
    expect(result.modifiedAt instanceof Date).toBeTruthy();
  });
});
