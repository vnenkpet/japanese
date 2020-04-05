/**
 * Representaion of how the Jmdict entry looks like in the archived public json file
 */
export interface IJmdictEntry {
  id: string;
  kanji: {
    common: boolean;
    text: string;
    tags: string[];
  }[];
  kana: {
    common: boolean;
    text: string;
    tags: string[];
    appliesToKanji: string[];
  }[];
  sense: {
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
    }[];
  }[];
}
