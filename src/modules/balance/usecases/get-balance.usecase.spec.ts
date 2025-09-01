import { GetBalanceUseCase } from "./get-balance.usecase";
import { InMemoryAccountRepository } from "../../account/repositories/account.repository";
import { Account } from "../../account/account.entity";
import { NotFoundException } from "@nestjs/common";

describe("GetBalanceUseCase", () => {
  it("404 when account not found", async () => {
    const repo = new InMemoryAccountRepository();
    const uc = new GetBalanceUseCase(repo as any);
    await expect(uc.execute("nope")).rejects.toBeInstanceOf(NotFoundException);
  });

  it("returns balance when found", async () => {
    const repo = new InMemoryAccountRepository();
    await repo.save(new Account("A", 42));
    const uc = new GetBalanceUseCase(repo as any);
    const balance = await uc.execute("A");
    expect(balance).toBe(42);
  });
});
