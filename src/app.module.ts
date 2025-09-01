import { Module } from "@nestjs/common";
import { AccountModule, ResetModule } from "./modules";

@Module({
  imports: [AccountModule, ResetModule],
})
export class AppModule {}
