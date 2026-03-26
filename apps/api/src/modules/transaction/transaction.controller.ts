import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

import { usersTable } from "@/modules/db/schema";
import { TransactionService } from "@/modules/transaction/transaction.service";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";
import { GetTransactionsDto } from "@/modules/transaction/dtos/get-transactions-dto";
import { CreateTransactionDto } from "@/modules/transaction/dtos/create-transaction.dto";
import { UpdateTransactionByIdDto } from "@/modules/transaction/dtos/update-transaction-by-id.dto";

@Controller("transactions")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query()
    { limit, page, sortBy, type, endDate, startDate }: GetTransactionsDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.transactionService.findAll(
      {
        userId: currentUser.id,
        type,
        startDate,
        endDate,
      },
      { limit, page, sortBy },
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateTransactionDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.transactionService.create(dto, currentUser.id);
  }

  @Get(":transactionId")
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param("transactionId", ParseUUIDPipe) transactionId: string,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.transactionService.findOne(transactionId, currentUser.id);
  }

  @Patch(":transactionId")
  @HttpCode(HttpStatus.OK)
  update(
    @Param("transactionId", ParseUUIDPipe) transactionId: string,
    @Body() dto: UpdateTransactionByIdDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.transactionService.update(transactionId, dto, currentUser.id);
  }
}
