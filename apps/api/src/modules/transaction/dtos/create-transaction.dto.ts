import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

import { PaymentMethodEnum } from "../entities/payment-method.enum";

export class CreateTransactionDto {
  @IsUUID()
  categoryId: string;

  @IsNumberString()
  amount: string;

  @IsString()
  notes: string;

  @IsEnum(PaymentMethodEnum)
  paymentMethod: PaymentMethodEnum;

  @IsDateString()
  issuedAt: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  attachments?: string[];
}
