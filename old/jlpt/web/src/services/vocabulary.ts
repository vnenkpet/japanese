import { data } from "./data";

export enum VocabularyEntryType {
  Kanji,
  NoKanji
}

export interface IVocabularyEntry {
  id: string;
  jlpt: number;
  kanji: string;
  type: VocabularyEntryType;
  kana: string;
  meaning: string;
  hiragana: string | boolean;
  katakana: string | boolean;
  romaji: string | boolean;
}

function assembleEntry(entry: any, id: string | number): IVocabularyEntry {
  return {
    ...entry,
    id: id.toString(),
    type: entry.kanji ? VocabularyEntryType.Kanji : VocabularyEntryType.NoKanji
  };
}

export class Vocabulary {
  async findAll(): Promise<IVocabularyEntry[]> {
    return data.map(assembleEntry);
  }

  async findOne(id: string): Promise<IVocabularyEntry> {
    const entry = data[Number(id)];
    return assembleEntry(entry, id);
  }

  async findRandomEntry(
    {
      jlpt
    }: {
      jlpt: number[];
    } = { jlpt: [1, 2, 3, 4, 5] }
  ): Promise<IVocabularyEntry> {
    const filteredData = data.filter(entry => jlpt.includes(entry.jlpt));
    const id = Math.floor(filteredData.length * Math.random());
    const entry = filteredData[id];
    return assembleEntry(entry, id);
  }

  async count(): Promise<number> {
    return data.length;
  }
}

export const vocabularyService = new Vocabulary();
