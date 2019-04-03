import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { configProvider } from 'src/config.provider';

@Module({
  providers: [...databaseProviders, configProvider],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
