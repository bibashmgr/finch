import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { SettingRepository } from "@/modules/setting/setting.repository";
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

  async getTransactions(query: Record<string, any>) {
    const { limit, page, sortBy, ...filters } = query;

    const options = { limit, page, sortBy };
    return await this.transactionRepository.findAll(filters, options);
  }

  async createTransaction(dto: CreateTransactionDto, userId: string) {
    let userSetting = await this.settingRepository.findByUserId(userId);

    if (!userSetting) {
      userSetting = await this.settingRepository.create({
        userId,
      });
    }

    const { amount, issuedAt, attachments, ...otherDto } = dto;

    const transaction = await this.transactionRepository.create({
      userId,
      currency: userSetting.currency,
      amount: amount.toString(),
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
        await this.transactionRepository.findByIdWithAttachments(
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

  async getTransactionById(transactionId: string, userId: string) {
    const transaction =
      await this.transactionRepository.findByIdWithDetails(transactionId);

    if (!transaction) {
      throw new NotFoundException("Transaction not found");
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return transaction;
  }

  async updateTransactionById(
    transactionId: string,
    dto: UpdateTransactionByIdDto,
    userId: string,
  ) {
    const transaction =
      await this.transactionRepository.findByIdWithAttachments(transactionId);

    if (!transaction) {
      throw new NotFoundException("Transaction not found");
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException("Access denied");
    }

    let userSetting = await this.settingRepository.findByUserId(userId);

    if (!userSetting) {
      userSetting = await this.settingRepository.create({
        userId,
      });
    }

    const { amount, issuedAt, attachments, ...otherDto } = dto;

    return await this.transactionRepository.updateById(transactionId, {
      userId,
      currency: userSetting.currency,
      amount: amount.toString(),
      issuedAt: new Date(dto.issuedAt),
      ...otherDto,
    });
  }
}
