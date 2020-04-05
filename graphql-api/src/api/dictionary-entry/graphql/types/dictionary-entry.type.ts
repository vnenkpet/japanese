import {
  IDictionaryEntry,
  SourceDictionary,
} from '../../interfaces/dictionary-entry.interface';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class DictionaryEntryType implements IDictionaryEntry {
  @Field(type => ID)
  id: string;

  @Field(type => [DictionaryEntryKanjiType])
  kanji: DictionaryEntryKanjiType[];

  @Field(type => [DictionaryEntryKanaType])
  kana: DictionaryEntryKanaType[];

  @Field(type => [DictionaryEntrySenseType])
  sense?: DictionaryEntrySenseType[];

  @Field(type => [DictionaryEntryTranslationType])
  translation?: DictionaryEntryTranslationType[];

  // @Field() (todo - register enum type )
  sourceDictionary: SourceDictionary;

  @Field()
  sourceFile: string;

  @Field()
  modifiedAt: Date;

  @Field()
  searchEngineResults: number;
}

@ObjectType()
export class DictionaryEntryKanjiType {
  @Field({ nullable: true })
  common?: boolean;

  @Field()
  text: string;

  @Field(type => [String])
  tags: string[];
}

@ObjectType()
export class DictionaryEntryKanaType {
  @Field()
  common?: boolean;

  @Field()
  text: string;

  @Field()
  tags: string[];

  @Field()
  appliesToKanji: string[];
}

@ObjectType()
export class DictionaryEntrySenseType {
  @Field()
  partOfSpeech: string[];

  @Field()
  appliesToKanji: string[];

  @Field()
  appliesToKana: string[];

  @Field()
  related: string[];

  @Field()
  antonym: string[];

  @Field()
  field: string[];

  @Field()
  dialect: string[];

  @Field()
  misc: string[];

  @Field()
  info: string[];

  @Field()
  languageSource: string[];

  @Field(type => [DictionaryEntryGlossType])
  gloss: DictionaryEntryGlossType[];
}

@ObjectType()
export class DictionaryEntryTranslationType {
  @Field()
  type: string[];

  @Field()
  related: string[];

  @Field(type => [DictionaryEntryGlossType])
  translation: DictionaryEntryGlossType[];
}

@ObjectType()
export class DictionaryEntryGlossType {
  @Field()
  lang: string;

  @Field()
  text: string;

  @Field()
  searchKey: string;
}
