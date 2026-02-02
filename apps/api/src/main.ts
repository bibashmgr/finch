import { Logger } from "nestjs-pino";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "@/app.module";
import { corsConfig } from "@/config/cors.config";
import { createValidationConfig } from "@/config/validation.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  app.enableCors(corsConfig);

  app.useGlobalPipes(createValidationConfig());

  const configService = app.get(ConfigService);
  const port = configService.get("PORT");

  await app.listen(port);
}

void bootstrap();
