import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Documentacion con swagger en  http://localhost:3001/api/docs';
  }
}
