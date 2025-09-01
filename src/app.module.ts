import { Module } from "@nestjs/common";
import {
  AccountModule,
  ResetModule,
  BalanceModule,
  EventModule,
} from "./modules";

@Module({
  imports: [AccountModule, ResetModule, BalanceModule, EventModule],
})
export class AppModule {}
