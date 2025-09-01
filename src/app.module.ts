import { Module } from "@nestjs/common";
import { AccountModule, ResetModule, BalanceModule } from "./modules";

@Module({
  imports: [AccountModule, ResetModule, BalanceModule],
})
export class AppModule {}
