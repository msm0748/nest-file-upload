import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as fs from 'fs';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [FilesController],
})
export class FilesModule {
  constructor() {
    // uploads 디렉토리가 없으면 생성
    if (!fs.existsSync('./uploads')) {
      fs.mkdirSync('./uploads', { recursive: true });
    }
  }
}
