import { Inject, Injectable } from "@nestjs/common";
import type { AccountRepository } from "../../account/repositories/account.repository";

@Injectable()
export class ResetUseCase {
  constructor(
    @Inject("AccountRepository")
    private readonly accountRepo: AccountRepository,
  ) {}

  async execute(): Promise<void> {
    await this.accountRepo.deleteAll();
  }
}
