import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DictionaryEntryModule } from './dictionary-entry/dictionary-entry.module';
import { configProvider } from './config.provider';

@Module({
  imports: [
    DictionaryEntryModule,
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      context: ({ req }) => {
        return {
          headers: req.headers,
        };
      },
    }),
  ],
  providers: [configProvider],
})
export class AppModule {}
