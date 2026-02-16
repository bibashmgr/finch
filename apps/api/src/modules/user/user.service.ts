import { Injectable } from "@nestjs/common";
import { Transactional } from "@nestjs-cls/transactional";

import { usersTable } from "@/modules/db/schema";
import { UsersRepository } from "@/modules/user/user.respository";
import { UpdateProfileDto } from "@/modules/user/dtos/update-profile.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  @Transactional()
  async updateProfile(
    currentUser: typeof usersTable.$inferSelect,
    payload: UpdateProfileDto,
  ) {
    const user = await this.userRepository.update(currentUser.id, payload);
    return user;
  }
}
