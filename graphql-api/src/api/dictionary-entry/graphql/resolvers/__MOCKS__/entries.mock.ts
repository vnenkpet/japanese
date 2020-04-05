import {
  IDictionaryEntry,
  SourceDictionary,
} from 'src/api/dictionary-entry/interfaces/dictionary-entry.interface';
import moment from 'moment';

export const jmDictEntries: IDictionaryEntry[] = [
  {
    id: '1000110',
    kanji: [{ common: true, text: '犬', tags: [] }],
    kana: [
      {
        common: true,
        text: 'いぬ',
        tags: [],
        appliesToKanji: ['犬'],
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
        gloss: [{ lang: 'eng', text: 'Dog', searchKey: 'dog' }],
      },
    ],
    sourceDictionary: SourceDictionary.jmdict,
    sourceFile:
      'https://github.com/scriptin/jmdict-simplified/releases/download/3.0.1/jmdict-eng-3.0.1.json.tgz',
    modifiedAt: moment('2010-09-09').toDate(),
    searchEngineResults: 3,
  },
  {
    id: '1000110',
    kanji: [{ common: true, text: '猫', tags: [] }],
    kana: [
      {
        common: true,
        text: 'ネコ',
        tags: [],
        appliesToKanji: ['猫'],
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
        gloss: [{ lang: 'eng', text: 'Cat', searchKey: 'cat' }],
      },
    ],
    sourceDictionary: SourceDictionary.jmdict,
    sourceFile:
      'https://github.com/scriptin/jmdict-simplified/releases/download/3.0.1/jmdict-eng-3.0.1.json.tgz',
    modifiedAt: moment('2010-09-09').toDate(),
    searchEngineResults: 3,
  },
];
