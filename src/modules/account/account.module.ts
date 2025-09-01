import { Module } from "@nestjs/common";
import { InMemoryAccountRepository } from "./repositories/account.repository";

@Module({
  providers: [
    {
      provide: "AccountRepository",
      useClass: InMemoryAccountRepository,
    },
  ],
  exports: ["AccountRepository"],
})
export class AccountModule {}
