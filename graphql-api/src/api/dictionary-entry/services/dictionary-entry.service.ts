import { Injectable } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { DictionaryEntryEntity } from '../entities/dictionary-entry.entity';
import { IDictionaryEntry } from '../interfaces/dictionary-entry.interface';

@Injectable()
export class DictinaryEntryService {
  private dictionaryEntryRepository: Repository<DictionaryEntryEntity>;

  constructor(private readonly connection: Connection) {
    this.dictionaryEntryRepository = this.connection.getRepository<
      DictionaryEntryEntity
    >(DictionaryEntryEntity);
  }

  async findOneById(id: string): Promise<IDictionaryEntry> {
    return this.dictionaryEntryRepository.findOne(id);
  }

  async findByKeyword(key: string): Promise<IDictionaryEntry[]> {
    key = key.toLowerCase().trim();

    // prepare search regex:
    const searchRegexKanji = new RegExp(`^${key}$`);
    const searchRegexLatin = new RegExp(`^${key}($|\\s)`);
    let verbSearchRegex = searchRegexLatin;

    // deal with verbs
    if (key.substring(0, 3) !== 'to ') {
      verbSearchRegex = new RegExp(`^to ${key}($|\\s)`);
    }
    const conditions = {
      $and: [
        // { $text: { $search: key } }, // narrow down search by text index
        // (sems like creating text indexes work as of writing this https://github.com/typeorm/typeorm/issues/3866)
        {
          $or: [
            // process regexes
            { 'kanji.text': searchRegexKanji },
            { 'kana.text': searchRegexKanji },
            { 'kana.romaji': searchRegexKanji },
            { 'sense.gloss.searchKey': searchRegexLatin },
            { 'sense.gloss.searchKey': verbSearchRegex },
            {
              'translation.translation.searchKey': searchRegexLatin,
            },
          ],
        },
      ],
    };

    // prepare the mongo request
    const entities = await this.dictionaryEntryRepository.find({
      where: conditions,
    });

    return entities;
  }
}
