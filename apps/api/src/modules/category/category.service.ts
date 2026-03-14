import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Transactional } from "@nestjs-cls/transactional";

import { CategoryRepository } from "@/modules/category/category.repository";
import { GetCategoriesDto } from "@/modules/category/dtos/get-categories-dto";
import { CreateCategoryDto } from "@/modules/category/dtos/create-category.dto";
import { UpdateCategoryByIdDto } from "@/modules/category/dtos/update-category-by-id.dto";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  @Transactional()
  async getCategories(userId: string, query: GetCategoriesDto) {
    const filters = { userId, type: query.type };
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
    dto: UpdateCategoryByIdDto,
    userId: string,
  ) {
    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    if (category.userId !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return await this.categoryRepository.updateById(categoryId, dto);
  }
}
