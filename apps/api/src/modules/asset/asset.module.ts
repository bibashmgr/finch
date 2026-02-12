import { Module } from "@nestjs/common";

import { AssetService } from "@/modules/asset/asset.service";
import { AssetRepository } from "@/modules/asset/asset.repository";
import { CloudinaryModule } from "@/modules/cloudinary/cloudinary.module";

@Module({
  imports: [CloudinaryModule],
  providers: [AssetRepository, AssetService],
  exports: [AssetRepository, AssetService],
})
export class AssetModule {}
