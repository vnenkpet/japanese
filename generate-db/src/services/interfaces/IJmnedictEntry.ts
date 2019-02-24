/**
 * Representaion of how the Jmnedict entry looks like in the archived public json file
 */
export interface IJmnedictEntry {
  id: string;
  kanji: [
    {
      text: string;
      tags: [string];
    }
  ];
  kana: [
    {
      text: string;
      tags: [string];
      appliesToKanji: [string];
    }
  ];
  translation: [
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
}
