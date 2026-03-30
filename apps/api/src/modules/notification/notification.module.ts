import { Module } from "@nestjs/common";

import { MailModule } from "@/modules/mail/mail.module";
import { UserModule } from "@/modules/user/user.module";
import { BudgetModule } from "@/modules/budget/budget.module";
import { SettingModule } from "@/modules/setting/setting.module";
import { NotificationService } from "@/modules/notification/notification.service";
import { NotificationRepository } from "@/modules/notification/notification.repository";
import { NotificationController } from "@/modules/notification/notification.controller";

@Module({
  imports: [BudgetModule, SettingModule, UserModule, MailModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService, NotificationRepository],
})
export class NotificationModule {}
