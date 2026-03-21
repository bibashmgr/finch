// cloudinary.service.ts

import * as streamifier from "streamifier";
import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";
import { ConfigService } from "@nestjs/config";

import {
  CloudinaryDeleteResponse,
  CloudinaryUploadResponse,
} from "@/modules/cloudinary/entities/cloudinary.type";
import { Env } from "@/config/env.config";

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService<Env, true>) {}

  upload(file: Express.Multer.File): Promise<CloudinaryUploadResponse> {
    return new Promise<CloudinaryUploadResponse>((resolve, reject) => {
      const folderName: string =
        this.configService.get("APP_NAME").toLowerCase() +
        "-" +
        this.configService.get("NODE_ENV");

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folderName },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  delete(publicId: string): Promise<CloudinaryDeleteResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
