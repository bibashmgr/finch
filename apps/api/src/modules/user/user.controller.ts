import { Body, Controller, Get, Patch } from "@nestjs/common";

import { usersTable } from "@/modules/db/schema";
import { UserService } from "@/modules/user/user.service";
import { UpdateProfileDto } from "@/modules/user/dtos/update-profile.dto";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  getProfile(@CurrentUser() user: typeof usersTable.$inferSelect) {
    return user;
  }

  @Patch("me")
  updateProfile(
    @CurrentUser() user: typeof usersTable.$inferSelect,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(user, dto);
  }
}
