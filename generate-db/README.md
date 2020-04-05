# Database Generator Service

A command that downloads JMDICT and JMNEDICT data from a public JSON file and transforms and streams them into MONGODB database.
Useful for designing Japanese dictionary API with GraphQL for example.

## Usage

1. Set the MONGODB_URI variable to your MONGO URI, default is `mongodb://localhost:27017/jmdict`

2. Run `npm start`

This will download the JSON data form the https://github.com/scriptin/jmdict-simplified repository (you can change the release file by configuring the JMDICT_ARCHIVE_URL and JMNEDICT_ARCHIVE_URL env vars)

## MongoDB format

```typescript
// ./src/services/interfaces/IProcessedEntry.ts
export enum SourceDictionary {
  jmdict = 'jmdict',
  jmnedict = 'jmnedict',
}

export interface IProcessedEntry {
  id: string;
  kanji: {
    common?: boolean;
    text: string;
    tags: string[];
  }[];
  kana: {
    common?: boolean;
    text: string;
    tags: string[];
    appliesToKanji: string[];
  }[];
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
    gloss: [
      {
        lang: string;
        text: string;
      }
    ];
  }[];
  translation?: {
    type: string[];
    related: string[];
    translation: [
      {
        lang: string;
        text: string;
      }
    ];
  }[];
  sourceDictionary: SourceDictionary;
  sourceFile: string;
  modifiedAt: Date;
  searchEngineResults: number;
}
```
