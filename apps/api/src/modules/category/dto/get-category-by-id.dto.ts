import { IsString } from "class-validator";

export class GetCategoryByIdDto {
  @IsString()
  categoryId: string;
}
