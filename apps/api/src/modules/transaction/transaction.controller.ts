import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

import { usersTable } from "@/modules/db/schema";
import { TransactionService } from "@/modules/transaction/transaction.service";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";
import { GetTransactionsDto } from "@/modules/transaction/dtos/get-transactions-dto";
import { CreateTransactionDto } from "@/modules/transaction/dtos/create-transaction.dto";
import { GetTransactionByIdDto } from "@/modules/transaction/dtos/get-transaction-by-id.dto";
import { UpdateTransactionByIdDto } from "@/modules/transaction/dtos/update-transaction-by-id.dto";

@Controller("transactions")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  getTransactions(
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
    @Query() query: GetTransactionsDto,
  ) {
    return this.transactionService.getTransactions({
      ...query,
      userId: currentUser.id,
    });
  }

  @Post()
  createTransaction(
    @Body() dto: CreateTransactionDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.transactionService.createTransaction(dto, currentUser.id);
  }

  @Get(":transactionId")
  getTransactionById(
    @Param() param: GetTransactionByIdDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.transactionService.getTransactionById(
      param.transactionId,
      currentUser.id,
    );
  }

  @Patch(":transactionId")
  updateTransactionById(
    @Param() param: GetTransactionByIdDto,
    @Body() dto: UpdateTransactionByIdDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.transactionService.updateTransactionById(
      param.transactionId,
      dto,
      currentUser.id,
    );
  }
}
