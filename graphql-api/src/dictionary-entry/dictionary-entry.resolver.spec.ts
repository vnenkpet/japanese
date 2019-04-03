import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryEntryResolver } from './dictionary-entry.resolver';
import { dictionaryEntryProviders } from './dictionary-entry.providers';
import { DictinaryEntryService } from './dictionary-entry.service';
import { AuthGuard } from 'src/auth.guard';
import { Connection } from 'typeorm';
import { Types } from 'src/types';
import { databaseProviders } from 'src/database/database.providers';
import {
  prepareDatabaseScenario,
  createDataFor,
} from 'src/common/prepare-scenario.util';
import { DictionaryEntryEntity } from './dictionary-entry.entity';
import { v4 as uuidv4 } from 'uuid';

describe('DictionaryEntryResolver', () => {
  let dictionaryEntryResolver: DictionaryEntryResolver;
  let connection: Connection;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        ...databaseProviders,
        ...dictionaryEntryProviders,
        DictinaryEntryService,
        DictionaryEntryResolver,
        AuthGuard,
        {
          provide: Types.CONFIG,
          useValue: {
            mongoConnectionUri: `mongodb://localhost:27017/TEST_${uuidv4()}`,
            secureApiToken: 'test_token',
          },
        },
      ],
    }).compile();

    connection = await prepareDatabaseScenario(testModule, [
      createDataFor<DictionaryEntryEntity>(DictionaryEntryEntity, [
        { japanese: 'inu', english: 'dog' },
        { japanese: 'neko', english: 'cat' },
      ]),
    ]);

    dictionaryEntryResolver = testModule.get<DictionaryEntryResolver>(
      DictionaryEntryResolver,
    );
  });

  afterEach(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  describe('search', () => {
    it('should return entries containing "dog', async () => {
      const searchResults = await dictionaryEntryResolver.search('dog');
      expect(searchResults).toMatchObject([
        { japanese: 'inu', english: 'dog' },
      ]);
    });
  });

  describe('add entry', () => {
    it('should add new entry', async () => {
      const response = await dictionaryEntryResolver.addDictionaryEntry({
        japanese: 'kame',
        english: 'turtle',
      });

      expect(response).toMatchObject({
        code: 201,
        message: 'Dictionary entry succesfully added.',
        isSuccessful: true,
        dictionaryEntry: {
          japanese: 'kame',
          english: 'turtle',
        },
      });

      const addedEntry = await dictionaryEntryResolver.dictionaryEntry(
        response.dictionaryEntry.id,
      );
      expect(addedEntry).toMatchObject({ japanese: 'kame', english: 'turtle' });
    });
  });
});
