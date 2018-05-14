/** MOCK DICTIONARY SERVICE (WIP) **/

const uuidv4 = require("uuid/v4");

const entries = [
  {
    id: 1,
    kanji: "英語",
    kana: "えいご",
    romaji: "eigo",
    meaning: "English",
  },
  {
    id: 2,
    kanji: "チェコ語",
    kana: "ちぇこご",
    romaji: "chekogo",
    meaning: "Czech",
  },
  {
    id: 3,
    kanji: "日本語",
    kana: "にほんご",
    romaji: "nihongo",
    meaning: "Japanese",
  },
];

let currentRequestId = null;

export const get = key => {
  const requestId = uuidv4();
  currentRequestId = requestId;
  const promise = new Promise((resolve, reject) => {
    key = key.toLowerCase();
    setTimeout(() => {
      const results = entries.filter(entry => {
        return (
          entry.meaning.toLowerCase().includes(key) ||
          entry.kana.toLowerCase().includes(key) ||
          entry.kanji.toLowerCase().includes(key) ||
          entry.romaji.toLowerCase().includes(key)
        );
      });
      resolve(results);
    }, 100);
  });
  return { requestId, promise };
};

export const getLatestRequestId = () => {
  return currentRequestId;
};
