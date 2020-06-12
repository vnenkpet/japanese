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

  @Field(type => [String])
  tags: string[];

  @Field(type => [String])
  appliesToKanji: string[];
}

@ObjectType()
export class DictionaryEntrySenseType {
  @Field(type => [String])
  partOfSpeech: string[];

  @Field(type => [String])
  appliesToKanji: string[];

  @Field(type => [String])
  appliesToKana: string[];

  @Field(type => [String])
  related: string[];

  @Field(type => [String])
  antonym: string[];

  @Field(type => [String])
  field: string[];

  @Field(type => [String])
  dialect: string[];

  @Field(type => [String])
  misc: string[];

  @Field(type => [String])
  info: string[];

  @Field(type => [String])
  languageSource: string[];

  @Field(type => [DictionaryEntryGlossType])
  gloss: DictionaryEntryGlossType[];
}

@ObjectType()
export class DictionaryEntryTranslationType {
  @Field(type => [String])
  type: string[];

  @Field(type => [String])
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
