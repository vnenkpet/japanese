import { Module } from '@nestjs/common';
import { HelloModule } from './rest-api/hello-world/hello.module';

@Module({ imports: [HelloModule] })
export class AppModule {}
