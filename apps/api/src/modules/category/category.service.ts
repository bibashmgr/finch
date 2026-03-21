import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CategoryRepository } from "@/modules/category/category.repository";
import { CreateCategoryDto } from "@/modules/category/dtos/create-category.dto";
import { UpdateCategoryByIdDto } from "@/modules/category/dtos/update-category-by-id.dto";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategories(query: Record<string, any>) {
    const filters = { userId: query.userId, type: query.type };
    const options = {
      limit: query.limit,
      page: query.page,
    };
    return await this.categoryRepository.findAll(filters, options);
  }

  async createCategory(dto: CreateCategoryDto, userId: string) {
    return await this.categoryRepository.create({
      userId,
      ...dto,
    });
  }

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
