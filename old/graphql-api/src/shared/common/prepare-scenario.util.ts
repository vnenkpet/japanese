import { TestingModule } from '@nestjs/testing';
import { Connection, DeepPartial } from 'typeorm';

export interface DataShape<T> {
  entity: new () => T;
  data: Array<DeepPartial<T>>;
}

export function createDataFor<T>(
  entity: new () => T,
  data: Array<DeepPartial<T>>,
): DataShape<T> {
  return {
    entity,
    data,
  };
}

/**
 * A utility function that creates a testing scenario in a database
 *
 * @param testingModule Module has to have DATABASE_CONNECTION provider
 * @param data Data to enter for each entity (create using createDataFor function)
 */
export async function prepareDatabaseScenario(
  testingModule: TestingModule,
  data: [DataShape<any>],
): Promise<Connection> {
  const connection = testingModule.get<Connection>(Connection);
  await connection.dropDatabase();

  await Promise.all(
    data.map(async metadata => {
      const repo = connection.getRepository(metadata.entity);
      await repo.insert(metadata.data);
    }),
  );

  return connection;
}
