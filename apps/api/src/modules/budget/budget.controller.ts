import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

import { BudgetService } from "@/modules/budget/budget.service";
import { GetBudgetsDto } from "@/modules/budget/dtos/get-budgets.dto";
import { CreateBudgetDto } from "@/modules/budget/dtos/create-budget.dto";
import { UpdateBudgetDto } from "@/modules/budget/dtos/update-budget.dto";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";
import { usersTable } from "../db/schema";

@Controller("budgets")
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() { month, limit, page }: GetBudgetsDto,
    @CurrentUser() user: typeof usersTable.$inferSelect,
  ) {
    return this.budgetService.findAll(
      { userId: user.id, month },
      { limit, page },
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateBudgetDto,
    @CurrentUser() user: typeof usersTable.$inferSelect,
  ) {
    return this.budgetService.create(user.id, dto);
  }

  @Get(":budgetId")
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param("budgetId", ParseUUIDPipe) budgetId: string,
    @CurrentUser() user: typeof usersTable.$inferSelect,
  ) {
    return this.budgetService.findOne(budgetId, user.id);
  }

  @Patch(":budgetId")
  @HttpCode(HttpStatus.OK)
  update(
    @Param("budgetId", ParseUUIDPipe) budgetId: string,
    @Body() dto: UpdateBudgetDto,
    @CurrentUser() user: typeof usersTable.$inferSelect,
  ) {
    return this.budgetService.update(budgetId, user.id, dto);
  }

  @Delete(":budgetId")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param("budgetId", ParseUUIDPipe) budgetId: string,
    @CurrentUser() user: typeof usersTable.$inferSelect,
  ) {
    return this.budgetService.delete(budgetId, user.id);
  }
}
