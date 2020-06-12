import { Module } from '@nestjs/common';
import { HelloModule } from './rest-api/hello/hello.module';

@Module({ imports: [HelloModule] })
export class AppModule {}
