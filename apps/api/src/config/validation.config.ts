import {
  ValidationPipe,
  UnprocessableEntityException,
  HttpStatus,
} from "@nestjs/common";

export function createValidationConfig(): ValidationPipe {
  return new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    stopAtFirstError: false,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    exceptionFactory: (errors) => {
      return new UnprocessableEntityException(errors);
    },
  });
}
