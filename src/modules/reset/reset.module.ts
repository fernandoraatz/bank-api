import { Module } from "@nestjs/common";
import { ResetController } from "./reset.controller";
import { ResetUseCase } from "./usecases";
import { AccountModule } from "../account/account.module";

@Module({
  imports: [AccountModule],
  controllers: [ResetController],
  providers: [ResetUseCase],
})
export class ResetModule {}
