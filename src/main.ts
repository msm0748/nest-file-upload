import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // 파일 크기 제한 설정 (기본값은 1MB)
  app.use((req: Request, res: Response, next: NextFunction) => {
    // 파일 크기 제한을 100MB로 설정
    req.headers['content-length'] = (100 * 1024 * 1024).toString();
    next();
  });
  await app.listen(8000);
}

void bootstrap();
