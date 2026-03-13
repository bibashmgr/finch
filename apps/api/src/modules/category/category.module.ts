import { Module } from "@nestjs/common";

import { CategoryService } from "@/modules/category/category.service";
import { CategoryController } from "@/modules/category/category.controller";
import { CategoryRepository } from "@/modules/category/category.repository";

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
