import { ClsModule } from "nestjs-cls";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { LoggerModule } from "nestjs-pino";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { DbModule } from "@/modules/db/db.module";
import { UserModule } from "@/modules/user/user.module";
import { AuthModule } from "@/modules/auth/auth.module";
import { AssetModule } from "@/modules/asset/asset.module";
import { HealthModule } from "@/modules/health/health.module";
import { SettingModule } from "@/modules/setting/setting.module";
import { CategoryModule } from "@/modules/category/category.module";

import { createClsConfig } from "@/config/cls.config";
import { createMailConfig } from "@/config/mail.config";
import { createEnvConfig, Env } from "@/config/env.config";
import { createLoggerConfig } from "@/config/logger.config";
import { createThrollerConfig } from "@/config/throttler.config";

@Module({
  imports: [
    ConfigModule.forRoot(createEnvConfig()),
    DbModule,
    ClsModule.forRoot(createClsConfig()),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) =>
        createMailConfig(configService),
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) =>
        createLoggerConfig(configService),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) =>
        createThrollerConfig(configService),
    }),
    HealthModule,
    AuthModule,
    AssetModule,
    UserModule,
    SettingModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
