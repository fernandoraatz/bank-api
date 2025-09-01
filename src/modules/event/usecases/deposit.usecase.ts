import { Inject, Injectable } from "@nestjs/common";
import type { AccountRepository } from "../../account/repositories/account.repository";
import { Account } from "../../account/account.entity";
import { AccountLockService } from "../../../common/locks/account-lock.service";

@Injectable()
export class DepositUseCase {
  constructor(
    @Inject("AccountRepository")
    private readonly accountRepo: AccountRepository,
    private readonly lock: AccountLockService,
  ) {}

  async execute(destinationId: string, amount: number) {
    return this.lock.withAccount(destinationId, async () => {
      let account = await this.accountRepo.findById(destinationId);

      if (!account) {
        account = new Account(destinationId, amount);
      } else {
        account.balance += amount;
      }

      await this.accountRepo.save(account);

      return { destination: { id: account.id, balance: account.balance } };
    });
  }
}
