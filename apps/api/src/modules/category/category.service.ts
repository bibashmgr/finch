import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CategoryRepository } from "@/modules/category/category.repository";
import { CreateCategoryDto } from "@/modules/category/dtos/create-category.dto";
import { UpdateCategoryDto } from "@/modules/category/dtos/update-category.dto";
import { CategoryTypeEnum } from "@/modules/category/entities/category-type.enum";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll(
    filters: { userId: string; type?: CategoryTypeEnum },
    options: { limit?: number; page?: number },
  ) {
    return await this.categoryRepository.findAllByUserId(filters, options);
  }

  async create(userId: string, dto: CreateCategoryDto) {
    const [category] = await this.categoryRepository.create({
      userId,
      ...dto,
    });
    return category;
  }

  async findOne(id: string, userId: string) {
    const category = await this.categoryRepository.findOneById(id);

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    if (category.userId !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return category;
  }

  async update(categoryId: string, dto: UpdateCategoryDto, userId: string) {
    await this.findOne(categoryId, userId);
    const [category] = await this.categoryRepository.update(categoryId, dto);
    return category;
  }
}
