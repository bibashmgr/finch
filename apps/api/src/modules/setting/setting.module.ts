import { Module } from "@nestjs/common";

import { SettingService } from "@/modules/setting/setting.service";
import { SettingController } from "@/modules/setting/setting.controller";
import { SettingRepository } from "@/modules/setting/setting.repository";

@Module({
  imports: [],
  controllers: [SettingController],
  providers: [SettingRepository, SettingService],
  exports: [SettingRepository],
})
export class SettingModule {}
