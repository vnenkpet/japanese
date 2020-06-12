import { Controller, Get, Param } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller()
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get('hello')
  getHello(): string {
    return this.helloService.getHello();
  }

  @Get('hello/:name')
  greet(@Param('name') name: string): string {
    return this.helloService.greet(name);
  }
}
