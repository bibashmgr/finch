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
import { CategoryService } from "@/modules/category/category.service";
import { GetCategoriesDto } from "@/modules/category/dtos/get-categories-dto";
import { CreateCategoryDto } from "@/modules/category/dtos/create-category.dto";
import { UpdateCategoryByIdDto } from "@/modules/category/dtos/update-category-by-id.dto";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";
import { GetCategoryByIdDto } from "@/modules/category/dtos/get-category-by-id.dto";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
    @Query() query: GetCategoriesDto,
  ) {
    return this.categoryService.getCategories({
      ...query,
      userId: currentUser.id,
    });
  }

  @Post()
  createCategory(
    @Body() dto: CreateCategoryDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.categoryService.createCategory(dto, currentUser.id);
  }

  @Get(":categoryId")
  getCategoryById(
    @Param() param: GetCategoryByIdDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.categoryService.getCategoryById(
      param.categoryId,
      currentUser.id,
    );
  }

  @Patch(":categoryId")
  updateCategoryById(
    @Param() param: GetCategoryByIdDto,
    @Body() dto: UpdateCategoryByIdDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.categoryService.updateCategoryById(
      param.categoryId,
      dto,
      currentUser.id,
    );
  }
}
