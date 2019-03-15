export enum SourceDictionary {
  jmdict = 'jmdict',
  jmnedict = 'jmnedict',
}

export interface IProcessedEntry {
  id: string;
  kanji: [
    {
      common?: boolean;
      text: string;
      tags: [string];
    }
  ];
  kana: [
    {
      common?: boolean;
      text: string;
      tags: [string];
      appliesToKanji: [string];
    }
  ];
  sense?: [
    {
      partOfSpeech: [string];
      appliesToKanji: [string];
      appliesToKana: [string];
      related: [string];
      antonym: [string];
      field: [string];
      dialect: [string];
      misc: [string];
      info: [string];
      languageSource: [string];
      gloss: [
        {
          lang: string;
          text: string;
        }
      ];
    }
  ];
  translation?: [
    {
      type: [string];
      related: [string];
      translation: [
        {
          lang: string;
          text: string;
        }
      ];
    }
  ];
  sourceDictionary: SourceDictionary;
  sourceFile: string;
  modifiedAt: Date;
  searchEngineResults: number;
}
