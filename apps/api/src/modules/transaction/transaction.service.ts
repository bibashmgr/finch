import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { SettingRepository } from "@/modules/setting/setting.repository";
import { CategoryTypeEnum } from "@/modules/category/entities/category-type.enum";
import { TransactionRepository } from "@/modules/transaction/transaction.repository";
import { CreateTransactionDto } from "@/modules/transaction/dtos/create-transaction.dto";
import { UpdateTransactionByIdDto } from "@/modules/transaction/dtos/update-transaction-by-id.dto";
import { TransactionAttachmentRepository } from "@/modules/transaction-attachment/transaction-attachment.repository";

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly settingRepository: SettingRepository,
    private readonly transactionAttachmentRepository: TransactionAttachmentRepository,
  ) {}

  async findAll(
    filters: {
      userId: string;
      type?: CategoryTypeEnum;
      startDate?: string;
      endDate?: string;
    },
    options: { limit?: number; page?: number; sortBy?: string },
  ) {
    return await this.transactionRepository.findAll(filters, options);
  }

  async create(dto: CreateTransactionDto, userId: string) {
    let userSetting = await this.settingRepository.findOneByUserId(userId);

    if (!userSetting) {
      const [newUserSetting] = await this.settingRepository.create({
        userId,
      });
      userSetting = newUserSetting;
    }

    const { issuedAt, attachments, ...otherDto } = dto;

    const [transaction] = await this.transactionRepository.create({
      userId,
      currency: userSetting.currency,
      issuedAt: new Date(dto.issuedAt),
      ...otherDto,
    });

    if (attachments && attachments.length > 0) {
      await this.transactionAttachmentRepository.createMany(
        attachments.map((url) => ({
          transactionId: transaction.id,
          url,
        })),
      );

      const attachedTransaction =
        await this.transactionRepository.findOneByIdWithAttachments(
          transaction.id,
        );

      return {
        ...attachedTransaction,
        attachments: attachedTransaction.attachments.map((a) => a.url),
      };
    }

    return {
      ...transaction,
      attachments: [],
    };
  }

  async findOne(transactionId: string, userId: string) {
    const transaction =
      await this.transactionRepository.findOneByIdWithCategoryAndAttachments(
        transactionId,
      );

    if (!transaction) {
      throw new NotFoundException("Transaction not found");
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return transaction;
  }

  async update(
    transactionId: string,
    dto: UpdateTransactionByIdDto,
    userId: string,
  ) {
    await this.findOne(transactionId, userId);

    const { issuedAt, attachments, ...otherDto } = dto;

    const [updatedTransaction] = await this.transactionRepository.update(
      transactionId,
      {
        issuedAt: new Date(dto.issuedAt),
        ...otherDto,
      },
    );
    return updatedTransaction;
  }
}
