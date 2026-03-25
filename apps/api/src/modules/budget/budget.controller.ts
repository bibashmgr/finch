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

import { usersTable } from "@/modules/db/schema";
import { BudgetService } from "@/modules/budget/budget.service";
import { GetBudgetsDto } from "@/modules/budget/dtos/get-budgets.dto";
import { CreateBudgetDto } from "@/modules/budget/dtos/create-budget.dto";
import { UpdateBudgetDto } from "@/modules/budget/dtos/update-budget.dto";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";

@Controller("budgets")
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() { month, limit, page }: GetBudgetsDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.budgetService.findAll(
      { userId: currentUser.id, month },
      { limit, page },
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateBudgetDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.budgetService.create(currentUser.id, dto);
  }

  @Get(":budgetId")
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param("budgetId", ParseUUIDPipe) budgetId: string,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.budgetService.findOne(budgetId, currentUser.id);
  }

  @Patch(":budgetId")
  @HttpCode(HttpStatus.OK)
  update(
    @Param("budgetId", ParseUUIDPipe) budgetId: string,
    @Body() dto: UpdateBudgetDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.budgetService.update(budgetId, currentUser.id, dto);
  }

  @Delete(":budgetId")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param("budgetId", ParseUUIDPipe) budgetId: string,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.budgetService.delete(budgetId, currentUser.id);
  }
}
