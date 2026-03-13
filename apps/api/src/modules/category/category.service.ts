import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Transactional } from "@nestjs-cls/transactional";

import { CategoryRepository } from "@/modules/category/category.repository";
import { GetCategoriesDto } from "@/modules/category/dto/get-categories-dto";
import { CreateCategoryDto } from "@/modules/category/dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto copy";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  @Transactional()
  async getCategories(userId: string, query: GetCategoriesDto) {
    const filters = { userId };
    const options = {
      limit: query.limit,
      page: query.page,
    };
    return await this.categoryRepository.findAll(filters, options);
  }

  @Transactional()
  async createCategory(dto: CreateCategoryDto, userId: string) {
    return await this.categoryRepository.create({
      userId,
      ...dto,
    });
  }

  @Transactional()
  async getCategoryById(categoryId: string, userId: string) {
    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    if (category.userId !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return category;
  }

  @Transactional()
  async updateCategoryById(
    categoryId: string,
    dto: UpdateCategoryDto,
    userId: string,
  ) {
    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    if (category.userId !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return await this.categoryRepository.update(categoryId, dto);
  }
}
