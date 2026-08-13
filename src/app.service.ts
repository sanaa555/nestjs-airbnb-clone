import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './common/configration/environment.interface';

@Injectable()

export class AppService {
  
constructor(private configService: ConfigService<Environment>) {}

  getHello(): string {

    console.log('Server port:', this.configService.getOrThrow<number>('port'));

    return 'Hello World!';
  }
}
