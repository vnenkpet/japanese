export enum SOURCE_TYPE { jmdict="jmdict", jmnedict="jmnedict" };

export default interface IJmdictEntry {
  kanji: [
    {
      text: string;
    }
  ];
  kana: [
    {
      text: string;
    }
  ];
  sense?: [
    {
      partOfSpeech: [string];
      gloss: [
        {
          text: string;
        }
      ];
    }
  ];
  translation?: [
    {
      translation: [
        {
          text: string;
        }
      ];
      type: [string];
    }
  ];
  source: SOURCE_TYPE;
  bingSearchResults?: number;
}
