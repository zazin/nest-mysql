import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { QueryBody } from './query.body';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  public async runQuery(@Body() body: QueryBody): Promise<any> {
    return this.appService.getConnectionMysql(body);
  }
}
