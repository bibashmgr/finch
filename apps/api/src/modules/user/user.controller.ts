import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from "@nestjs/common";

import { usersTable } from "@/modules/db/schema";
import { UserService } from "@/modules/user/user.service";
import { UpdateProfileDto } from "@/modules/user/dtos/update-profile.dto";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  @HttpCode(HttpStatus.OK)
  getProfile(@CurrentUser() user: typeof usersTable.$inferSelect) {
    return user;
  }

  @Patch("me")
  @HttpCode(HttpStatus.OK)
  updateProfile(
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(currentUser.id, dto);
  }
}
