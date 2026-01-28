import { Module } from "@nestjs/common";

import { DbModule } from "./modules/db/db.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [DbModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
