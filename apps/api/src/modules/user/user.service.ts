import { Injectable } from "@nestjs/common";
// import { TransactionHost } from "@nestjs-cls/transactional";

// import { DB } from "../db/client";
// import { InjectDb } from "../db/db.provider";
// import { CreateUserDto } from "@repo/schema";
// import { DbTransactionAdapter } from "../db/client";

@Injectable()
export class UserService {
  // constructor(@InjectDb() private readonly db: DB) {}
  // constructor(private readonly txHost: TransactionHost<DbTransactionAdapter>) {}

  findAll() {
    return "TODO: This action should find all users";
  }
}
