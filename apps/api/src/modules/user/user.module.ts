import { Module } from "@nestjs/common";

import { UserService } from "@/modules/user/user.service";
import { AssetModule } from "@/modules/asset/asset.module";
import { UserController } from "@/modules/user/user.controller";
import { UsersRepository } from "@/modules/user/user.respository";

@Module({
  imports: [AssetModule],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
  exports: [UserService, UsersRepository],
})
export class UserModule {}
