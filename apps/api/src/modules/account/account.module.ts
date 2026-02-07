import { Module } from "@nestjs/common";

import { AccountRepository } from "@/modules/account/account.repository";

@Module({
  providers: [AccountRepository],
  exports: [AccountRepository],
})
export class AccountModule {}
