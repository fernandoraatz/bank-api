import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import type { AccountRepository } from "../../account/repositories/account.repository";
import { AccountLockService } from "../../../common/locks/account-lock.service";

@Injectable()
export class WithdrawUseCase {
  constructor(
    @Inject("AccountRepository")
    private readonly accountRepo: AccountRepository,
    private readonly lock: AccountLockService,
  ) {}

  async execute(originId: string, amount: number) {
    return this.lock.withAccount(originId, async () => {
      const account = await this.accountRepo.findById(originId);

      if (!account) {
        throw new NotFoundException({
          message: "Origin account not found.",
          code: 0,
        });
      }

      if (account.balance === 0) {
        throw new BadRequestException({
          message: "Cannot withdraw from an account with zero balance.",
          balance: account.balance,
        });
      }

      if (account.balance < amount) {
        throw new BadRequestException({
          message: "Insufficient balance for withdrawal.",
          balance: account.balance,
          attemptedWithdraw: amount,
        });
      }

      account.balance -= amount;
      await this.accountRepo.save(account);

      return {
        origin: {
          id: account.id,
          balance: account.balance,
        },
      };
    });
  }
}
