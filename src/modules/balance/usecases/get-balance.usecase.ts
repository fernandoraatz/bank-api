import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { AccountRepository } from "../../account/repositories/account.repository";

@Injectable()
export class GetBalanceUseCase {
  constructor(
    @Inject("AccountRepository")
    private readonly accountRepo: AccountRepository,
  ) {}

  async execute(accountId: string): Promise<number> {
    const account = await this.accountRepo.findById(accountId);
    if (!account) {
      throw new NotFoundException(0);
    }
    return account.balance;
  }
}
