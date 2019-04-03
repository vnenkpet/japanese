import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DictionaryEntryEntity } from './dictionary-entry.entity';
import { IDictionaryEntry } from './dictionary-entry.interface';
import { Types } from 'src/types';

@Injectable()
export class DictinaryEntryService {
  constructor(
    @Inject(Types.DICTIONARY_ENTRY_REPOSITORY)
    private readonly dictionaryEntryRepository: Repository<
      DictionaryEntryEntity
    >,
  ) {}

  async findOneById(id: string): Promise<IDictionaryEntry> {
    const entry = await this.dictionaryEntryRepository.findOne(id);
    return this.transformEntry(entry);
  }

  async findByKeyword(keyword: string): Promise<IDictionaryEntry[]> {
    const regex = new RegExp(`${keyword}`, 'gi');
    const entries = await this.dictionaryEntryRepository.find({
      where: { $or: [{ japanese: regex }, { english: regex }] },
    });

    return entries.map(this.transformEntry);
  }

  async insertOne({
    japanese,
    english,
  }: {
    japanese: string;
    english: string;
  }) {
    const entry = new DictionaryEntryEntity();
    entry.japanese = japanese;
    entry.english = english;
    await this.dictionaryEntryRepository.save(entry);
    return this.transformEntry(entry);
  }

  private transformEntry(entry: DictionaryEntryEntity): IDictionaryEntry {
    return {
      id: entry.id.toString(),
      japanese: entry.japanese,
      english: entry.english,
    };
  }
}
