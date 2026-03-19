import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";
import { PaymentMethodEnum } from "../entities/payment-method.enum";

export class CreateTransactionDto {
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsNotEmpty()
  categoryId: string;

  @IsNumber()
  amount: number;

  @IsString()
  notes: string;

  @IsEnum(PaymentMethodEnum)
  paymentMethod: PaymentMethodEnum;

  @IsDateString()
  issuedAt: string;

  @IsArray()
  @IsString({ each: true })
  attachments?: string[];
}
