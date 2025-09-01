import { Controller, Get, Query } from "@nestjs/common";
import { GetBalanceUseCase } from "./usecases";

@Controller("balance")
export class BalanceController {
  constructor(private readonly getBalanceUseCase: GetBalanceUseCase) {}

  @Get()
  async getBalance(@Query("account_id") accountId: string) {
    const balance = await this.getBalanceUseCase.execute(accountId);
    return balance;
  }
}
