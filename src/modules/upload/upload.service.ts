import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UploadService {
  getMulterOptions() {
    return {
      storage: diskStorage({
        destination: './uploads', // Save files in the "uploads" directory
        filename: (req, file, callback) => {
          // Generate a unique filename
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    };
  }
}
