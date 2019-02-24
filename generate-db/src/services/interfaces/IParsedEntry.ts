export enum SourceDictionary {
  jmdict = 'jmdict',
  jmnedict = 'jmnedict',
}

export interface IParsedEntry {
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
  source: SourceDictionary;
  sourceFile: string;
  modifiedAt: string;
  searchEngineResults: number;
}
