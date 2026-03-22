import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";

import { PaymentMethodEnum } from "../entities/payment-method.enum";

export class UpdateTransactionByIdDto {
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsNotEmpty()
  @IsOptional()
  categoryId?: string;

  @IsNumberString()
  @IsOptional()
  amount?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsEnum(PaymentMethodEnum)
  @IsOptional()
  paymentMethod?: PaymentMethodEnum;

  @IsDateString()
  @IsOptional()
  issuedAt?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  attachments?: string[];
}
