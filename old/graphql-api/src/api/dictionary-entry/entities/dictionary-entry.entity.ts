import {
  Entity,
  Column,
  PrimaryColumn,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import {
  IDictionaryEntry,
  SourceDictionary,
} from '../interfaces/dictionary-entry.interface';

// readonly
@Entity()
export class DictionaryEntryEntity implements IDictionaryEntry {
  // only for internal testing purposes
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  id: string;

  @Column(type => DictionaryEntryKanjiEntity)
  kanji: DictionaryEntryKanjiEntity[];

  @Column(type => DictionaryEntryKanaEntity)
  kana: DictionaryEntryKanaEntity[];

  @Column(type => DictionaryEntrySenseEntity)
  sense: DictionaryEntrySenseEntity[];

  @Column(type => DicitonaryEntryTranslationEntity)
  translation: DicitonaryEntryTranslationEntity[];

  // source of this data (jmdict or jmnedict)
  @Column({ enum: SourceDictionary })
  sourceDictionary: SourceDictionary;
  // url of the source file
  @Column()
  sourceFile: string;

  @Column()
  modifiedAt: Date;

  @Column()
  searchEngineResults: number;
}

export class DictionaryEntryKanjiEntity {
  @Column()
  common?: boolean; // only jmdict

  // @Index({ fulltext: true })
  @Column()
  text: string;

  @Column()
  tags: string[];
}

export class DictionaryEntryKanaEntity {
  @Column()
  common?: boolean; // only jmdict

  // @Index({ fulltext: true })
  @Column()
  @Index()
  text: string;

  @Column()
  tags: string[];

  @Column()
  appliesToKanji: string[];
}

export class DictionaryEntrySenseEntity {
  @Column()
  partOfSpeech: string[];

  @Column()
  appliesToKanji: string[];

  @Column()
  appliesToKana: string[];

  @Column()
  related: string[];

  @Column()
  antonym: string[];

  @Column()
  field: string[];

  @Column()
  dialect: string[];

  @Column()
  misc: string[];

  @Column()
  info: string[];

  @Column()
  languageSource: string[];

  @Column(type => Gloss)
  gloss: Gloss[];
}

export class DicitonaryEntryTranslationEntity {
  @Column()
  type: string[];

  @Column()
  related: string[];

  @Column(type => Gloss)
  translation: Gloss[];
}

export class Gloss {
  @Column()
  lang: string;

  // @Index({ fulltext: true })
  @Column()
  @Index()
  text: string;

  @Column()
  @Index()
  searchKey: string;
}
