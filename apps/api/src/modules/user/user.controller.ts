import { FileInterceptor } from "@nestjs/platform-express";
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";

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

  @Patch("me/avatar")
  @UseInterceptors(FileInterceptor("file"))
  updateProfileAvatar(
    @CurrentUser() user: typeof usersTable.$inferSelect,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.userService.updateProfileAvatar(user, file);
  }
}
