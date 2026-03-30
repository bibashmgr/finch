import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from "@nestjs/common";

import { notificationsTable, usersTable } from "@/modules/db/schema";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";
import { NotificationService } from "@/modules/notification/notification.service";
import { GetNotificationsDto } from "@/modules/notification/dtos/get-notifications.dto";

@Controller("notifications")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() { limit, page }: GetNotificationsDto,
    @CurrentUser() currentUser: typeof notificationsTable.$inferSelect,
  ) {
    return this.notificationService.findAll(
      { userId: currentUser.id },
      { limit, page },
    );
  }

  @Post("read")
  @HttpCode(HttpStatus.OK)
  markAllAsRead(@CurrentUser() currentUser: typeof usersTable.$inferSelect) {
    return this.notificationService.markAllAsRead(currentUser.id);
  }

  @Post(":notificationId/read")
  @HttpCode(HttpStatus.OK)
  markOneAsRead(
    @Param("notificationId", ParseUUIDPipe) notificationId: string,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.notificationService.markOneAsRead(
      notificationId,
      currentUser.id,
    );
  }
}
