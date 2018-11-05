import Entry from "../schema-types/Entry";

const transformEntry = (entry: any): Entry => {
  const isKana = entry.sense[0].misc.includes("uk");
  if (isKana || entry.kanji.length === 0) {
    entry.primaryDisplay = {
      text: entry.kana[0].text,
      hasFurigana: false,
      romaji: entry.kana[0].romaji,
      sense: entry.sense[0]
    };
  } else {
    entry.primaryDisplay = {
      text: entry.kanji[0].text,
      hasFurigana: true,
      furigana: entry.kana[0].text,
      romaji: entry.kana[0].romaji,
      sense: entry.sense[0]
    };
  }
  return entry;
};

export default transformEntry;
