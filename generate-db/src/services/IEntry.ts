export interface IEntry {
  id: string;
  kanji: [
    {
      common: false;
      text: string;
      tags: [];
    }
  ];
  kana: [
    {
      common: true;
      text: string;
      tags: [];
      appliesToKanji: [string];
    }
  ];
  sense: [
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
}
