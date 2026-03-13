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
import { CreateCategoryDto } from "@/modules/category/dto/create-category.dto";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";
import { GetCategoriesDto } from "@/modules/category/dto/get-categories-dto";
import { GetCategoryByIdDto } from "@/modules/category/dto/get-category-by-id.dto";
import { UpdateCategoryDto } from "@/modules/category/dto/update-category.dto copy";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
    @Query() query: GetCategoriesDto,
  ) {
    return this.categoryService.getCategories(currentUser.id, query);
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
    @Body() dto: UpdateCategoryDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.categoryService.updateCategoryById(
      param.categoryId,
      dto,
      currentUser.id,
    );
  }
}
