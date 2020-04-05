import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DictionaryEntryModule } from './api/dictionary-entry/dictionary-entry.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from './shared/config/config.module';
import { ConfigService } from './shared/config/config.service';
// import { AuthGuard } from './auth.guard';
import { AuthModule } from './shared/auth/auth.module';
import { ContextFactory } from './shared/auth/context.factory';

const mock = true;

@Module({
  imports: [
    DictionaryEntryModule,
    GraphQLModule.forRootAsync({
      imports: [AuthModule],
      inject: [ContextFactory],
      useFactory: (contextFactory: ContextFactory) => ({
        // mockEntireSchema: mock,
        autoSchemaFile: true,
        debug: true,
        playground: true, // todo - lets not use this on production, deploy as a client somewhere else
        introspection: true,
        installSubscriptionHandlers: true,
        context: contextFactory.create({ mock }),
        // cors: false,
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        config: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'mongodb',
        url: config.mongoConnectionUri,
        entities: [__dirname + '/**/*.entity.ts'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
