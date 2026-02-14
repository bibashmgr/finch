export enum AssetEnum {
  IMAGE = "image",
  VIDEO = "video",
  RAW = "raw",
}

export type Asset = {
  id: string;
  userId: string;
  publicId: string;
  assetType: AssetEnum;
  originalFilename: string | null;
  format: string | null;
  bytes: string | null;
  width: string | null;
  height: string | null;
  duration: string | null;
  url: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
