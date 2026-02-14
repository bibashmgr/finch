import { Module } from "@nestjs/common";

import { AssetService } from "@/modules/asset/asset.service";
import { AssetController } from "@/modules/asset/asset.controller";
import { AssetRepository } from "@/modules/asset/asset.repository";
import { CloudinaryModule } from "@/modules/cloudinary/cloudinary.module";

@Module({
  imports: [CloudinaryModule],
  controllers: [AssetController],
  providers: [AssetRepository, AssetService],
})
export class AssetModule {}
