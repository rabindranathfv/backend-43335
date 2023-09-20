import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  helloRabin(): string {
    return this.appService.getHello();
  }

  @Get('/base')
  helloBase(): any {
    try {
      return { message: this.appService.getHello(), statusCode: 'sucess' };
    } catch (error) {}
  }
}
