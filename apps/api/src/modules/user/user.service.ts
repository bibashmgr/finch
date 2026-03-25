import { Injectable } from "@nestjs/common";

import { usersTable } from "@/modules/db/schema";
import { UsersRepository } from "@/modules/user/user.respository";
import { UpdateProfileDto } from "@/modules/user/dtos/update-profile.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  async updateProfile(id: string, payload: UpdateProfileDto) {
    const [user] = await this.userRepository.update(id, payload);
    return user;
  }
}
