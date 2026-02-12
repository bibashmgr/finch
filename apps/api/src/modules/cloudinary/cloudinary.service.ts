// cloudinary.service.ts

import * as streamifier from "streamifier";
import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";

import {
  CloudinaryDeleteResponse,
  CloudinaryUploadResponse,
} from "@/modules/cloudinary/entities/cloudinary.type";

@Injectable()
export class CloudinaryService {
  upload(file: Express.Multer.File): Promise<CloudinaryUploadResponse> {
    return new Promise<CloudinaryUploadResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
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
