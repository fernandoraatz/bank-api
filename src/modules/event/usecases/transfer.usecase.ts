import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import type { AccountRepository } from "../../account/repositories/account.repository";
import { Account } from "../../account/account.entity";
import { AccountLockService } from "../../../common/locks/account-lock.service";

@Injectable()
export class TransferUseCase {
  constructor(
    @Inject("AccountRepository")
    private readonly accountRepo: AccountRepository,
    private readonly lock: AccountLockService,
  ) {}

  async execute(originId: string, destinationId: string, amount: number) {
    return this.lock.withTwoAccounts(originId, destinationId, async () => {
      const origin = await this.accountRepo.findById(originId);
      if (!origin) {
        throw new NotFoundException({
          message: "Origin account not found.",
          code: 0,
        });
      }

      if (origin.balance === 0) {
        throw new BadRequestException({
          message: "Cannot transfer from an account with zero balance.",
          balance: origin.balance,
        });
      }

      if (origin.balance < amount) {
        throw new BadRequestException({
          message: "Insufficient balance for transfer.",
          balance: origin.balance,
          attemptedTransfer: amount,
        });
      }

      origin.balance -= amount;
      await this.accountRepo.save(origin);

      let destination = await this.accountRepo.findById(destinationId);
      if (!destination) {
        destination = new Account(destinationId, amount);
      } else {
        destination.balance += amount;
      }
      await this.accountRepo.save(destination);

      return {
        origin: { id: origin.id, balance: origin.balance },
        destination: { id: destination.id, balance: destination.balance },
      };
    });
  }
}
