import { Injectable, NotFoundException } from "@nestjs/common";

import { AssetRepository } from "@/modules/asset/asset.repository";
import { CloudinaryService } from "@/modules/cloudinary/cloudinary.service";

@Injectable()
export class AssetService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly assetRepository: AssetRepository,
  ) {}

  async uploadAsset(userId: string, file: Express.Multer.File) {
    const response = await this.cloudinaryService.upload(file);
    const [asset] = await this.assetRepository.create({
      userId,
      publicId: response.public_id,
      assetType: response.resource_type,
      originalFilename: response.original_filename,
      format: response.format,
      bytes: response.bytes,
      width: response.width,
      height: response.height,
      duration: response.duration,
      url: response.secure_url,
    });
    return asset;
  }

  async deleteAsset(id: string) {
    const asset = await this.assetRepository.findOneById(id);

    if (!asset) {
      throw new NotFoundException("Asset not found");
    }

    await this.cloudinaryService.delete(asset.publicId);
    await this.assetRepository.update(asset.id, {
      deletedAt: new Date(),
    });
  }
}
