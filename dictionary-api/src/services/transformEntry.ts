import Entry from "../schema-types/Entry";

const transformEntry = (entry: any): Entry => {
  console.log(entry);
  if (entry.source === "jmdict") {
    const isKana = entry.sense[0].misc.includes("uk");
    if (isKana || entry.kanji.length === 0) {
      entry.simple = {
        text: entry.kana[0].text,
        hasFurigana: false,
        romaji: entry.kana[0].romaji,
        translation: entry.sense[0].gloss
          .map((gloss: { text: string }) => gloss.text)
          .join("; "),
        info: entry.sense[0].partOfSpeech.join(", ")
      };
    } else {
      entry.simple = {
        text: entry.kanji[0].text,
        hasFurigana: true,
        furigana: entry.kana[0].text,
        romaji: entry.kana[0].romaji,
        translation: entry.sense[0].gloss
          .map((gloss: { text: string }) => gloss.text)
          .join("; "),
        info: entry.sense[0].partOfSpeech.join(", ")
      };
    }
  } else {
    if (entry.kanji.length === 0) {
      entry.simple = {
        text: entry.kana[0].text,
        hasFurigana: false,
        romaji: entry.kana[0].romaji,
        translation: entry.translation[0].translation
          .map((translation: { text: string }) => translation.text)
          .join("; "),
        info: entry.translation[0].category.join(",")
      };
    } else {
      entry.simple = {
        text: entry.kanji[0].text,
        hasFurigana: true,
        furigana: entry.kana[0].text,
        romaji: entry.kana[0].romaji,
        translation: entry.translation[0].translation
          .map((translation: { text: string }) => translation.text)
          .join("; "),
        info: entry.translation[0].category.join(",")
      };
    }
  }

  return entry;
};

export default transformEntry;
