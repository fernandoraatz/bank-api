import { Module } from "@nestjs/common";
import { BalanceController } from "./balance.controller";
import { GetBalanceUseCase } from "./usecases";
import { AccountModule } from "../account/account.module";

@Module({
  imports: [AccountModule],
  controllers: [BalanceController],
  providers: [GetBalanceUseCase],
})
export class BalanceModule {}
