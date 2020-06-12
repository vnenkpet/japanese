export enum SourceDictionary {
  jmdict = 'jmdict',
  jmnedict = 'jmnedict',
}

export interface IDictionaryEntry {
  id: string;
  kanji: {
    common?: boolean; // only jmdict
    text: string;
    tags: string[];
  }[];
  kana: {
    common?: boolean; // only jmdict
    text: string;
    tags: string[];
    appliesToKanji: string[];
  }[];
  // JMDict data (general vocabulary)
  sense?: {
    partOfSpeech: string[];
    appliesToKanji: string[];
    appliesToKana: string[];
    related: string[];
    antonym: string[];
    field: string[];
    dialect: string[];
    misc: string[];
    info: string[];
    languageSource: string[];
    gloss: {
      lang: string;
      text: string;
      searchKey: string;
    }[];
  }[];
  // JMNedict data (locations, names etc)
  translation?: {
    type: string[];
    related: string[];
    translation: {
      lang: string;
      text: string;
      searchKey: string;
    }[];
  }[];
  // source of this data (jmdict or jmnedict)
  sourceDictionary: SourceDictionary;
  // url of the source file
  sourceFile: string;
  modifiedAt: Date;
  searchEngineResults: number;
}
