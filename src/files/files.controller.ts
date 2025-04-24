import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const originalName = Buffer.from(
            file.originalname,
            'latin1',
          ).toString('utf8');
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(originalName);
          const filename = `${originalName.split(ext)[0]}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      path: file.path,
    };
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // 파일 존재 여부 확인
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    } else {
      return res.status(404).json({ message: '파일을 찾을 수 없습니다.' });
    }
  }
}
