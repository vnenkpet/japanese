import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryEntryResolver } from './dictionary-entry.resolver';
import { Connection } from 'typeorm';
import {
  prepareDatabaseScenario,
  createDataFor,
} from 'src/shared/common/prepare-scenario.util';
import { DictionaryEntryEntity } from '../../entities/dictionary-entry.entity';
import { v4 as uuidv4 } from 'uuid';
import { AppModule } from 'src/app.module';
import { ConfigService } from 'src/shared/config/config.service';
import { jmDictEntries } from './__MOCKS__/entries.mock';

describe('DictionaryEntryResolver', () => {
  let dictionaryEntryResolver: DictionaryEntryResolver;
  let connection: Connection;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        mongoConnectionUri: `mongodb://localhost:27017/TEST_${uuidv4()}`,
        secureApiToken: 'test_token',
      })
      .compile();

    connection = await prepareDatabaseScenario(testModule, [
      createDataFor<DictionaryEntryEntity>(
        DictionaryEntryEntity,
        jmDictEntries,
      ),
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
    it('should return entries containing "dog"', async () => {
      const searchResults = await dictionaryEntryResolver.search('dog');
      expect(searchResults.length).toBe(1);
      expect(searchResults[0]).toMatchObject(jmDictEntries[0]);
    });

    it('should return entries containing "cat"', async () => {
      const searchResults = await dictionaryEntryResolver.search('cat');
      expect(searchResults.length).toBe(1);
      expect(searchResults[0]).toMatchObject(jmDictEntries[1]);
    });

    it('should return nothing', async () => {
      const searchResults = await dictionaryEntryResolver.search('nothing');
      expect(searchResults.length).toBe(0);
    });
  });
});
