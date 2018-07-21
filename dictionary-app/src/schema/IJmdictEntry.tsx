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
  sense: [
    {
      partOfSpeech: [string];
      gloss: [
        {
          text: string;
        }
      ];
    }
  ];
  bingSearchResults?: number;
}
