import { Injectable, NotFoundException } from "@nestjs/common";

import { UsersRepository } from "@/modules/user/user.respository";
import { UpdateProfileDto } from "@/modules/user/dtos/update-profile.dto";
import { AssetService } from "../asset/asset.service";
import { usersTable } from "../db/schema";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly assetService: AssetService,
  ) {}

  async updateProfile(
    currentUser: typeof usersTable.$inferSelect,
    payload: UpdateProfileDto,
  ) {
    const user = await this.userRepository.update(currentUser.id, payload);
    return user;
  }

  async updateProfileAvatar(
    currentUser: typeof usersTable.$inferSelect,
    file: Express.Multer.File,
  ) {
    if (currentUser.avatarUrl) {
      await this.assetService.deleteAssetByUrl(currentUser.avatarUrl);
    }

    const asset = await this.assetService.uploadAsset(currentUser.id, file);
    const updatedProfile = await this.userRepository.update(currentUser.id, {
      avatarUrl: asset.url,
    });
    return updatedProfile;
  }
}
