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
import { CategoryService } from "@/modules/category/category.service";
import { GetCategoriesDto } from "@/modules/category/dtos/get-categories.dto";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";
import { CreateCategoryDto } from "@/modules/category/dtos/create-category.dto";
import { UpdateCategoryDto } from "@/modules/category/dtos/update-category.dto";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() { type, limit, page }: GetCategoriesDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.categoryService.findAll(
      { userId: currentUser.id, type },
      { limit, page },
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateCategoryDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.categoryService.create(currentUser.id, dto);
  }

  @Get(":categoryId")
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param("categoryId", ParseUUIDPipe) categoryId: string,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.categoryService.findOne(categoryId, currentUser.id);
  }

  @Patch(":categoryId")
  @HttpCode(HttpStatus.OK)
  update(
    @Param("categoryId", ParseUUIDPipe) categoryId: string,
    @Body() dto: UpdateCategoryDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.categoryService.update(categoryId, dto, currentUser.id);
  }
}
