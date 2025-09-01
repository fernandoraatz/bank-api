import { Controller, Post, HttpCode } from "@nestjs/common";
import { ResetUseCase } from "./usecases";

@Controller("reset")
export class ResetController {
  constructor(private readonly resetUseCase: ResetUseCase) {}

  @Post()
  @HttpCode(200)
  async reset() {
    await this.resetUseCase.execute();
    return "OK";
  }
}
