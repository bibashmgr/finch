import {
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { usersTable } from "@/modules/db/schema";
import { AssetService } from "@/modules/asset/asset.service";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";

@Controller("assets")
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post("upload")
  @HttpCode(HttpStatus.CREATED)
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
    return this.assetService.uploadAsset(user.id, file);
  }
}
