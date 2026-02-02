import { ClsModuleOptions } from "nestjs-cls";
import { ClsPluginTransactional } from "@nestjs-cls/transactional";
import { TransactionalAdapterDrizzleOrm } from "@nestjs-cls/transactional-adapter-drizzle-orm";

import { DbModule } from "@/modules/db/db.module";
import { DB_PROVIDER } from "@/modules/db/db.provider";

export function createClsConfig(): ClsModuleOptions {
  return {
    global: true,
    plugins: [
      new ClsPluginTransactional({
        imports: [DbModule],
        adapter: new TransactionalAdapterDrizzleOrm({
          drizzleInstanceToken: DB_PROVIDER,
        }),
      }),
    ],
  };
}
