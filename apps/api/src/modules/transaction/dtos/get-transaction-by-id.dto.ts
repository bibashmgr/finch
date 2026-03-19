import { IsString } from "class-validator";

export class GetTransactionByIdDto {
  @IsString()
  transactionId: string;
}
