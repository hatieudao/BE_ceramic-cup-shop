import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', new UploadService().getMulterOptions()),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOperation({ summary: 'Upload an image' })
  @ApiResponse({
    status: 200,
    description: 'The image has been successfully uploaded.',
    type: String,
  })
  @ApiResponse({
    status: 400,
    description: 'The image has been failed to upload.',
    type: String,
  })
  @ApiResponse({
    status: 500,
    description: 'The image has been failed to upload.',
    type: String,
  })
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully',
      filename: file.filename,
      path: `/uploads/${file.filename}`,
    };
  }
}
