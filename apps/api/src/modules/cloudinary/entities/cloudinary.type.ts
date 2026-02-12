import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

export type CloudinaryUploadResponse =
  | UploadApiResponse
  | UploadApiErrorResponse;

export type CloudinaryDeleteResponse = {
  result: string;
};
