import { WithdrawUseCase } from "./withdraw.usecase";
import { InMemoryAccountRepository } from "../../account/repositories/account.repository";
import { Account } from "../../account/account.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { NoopLock } from "../../../common/locks/noop-lock";

describe("WithdrawUseCase", () => {
  let repo: InMemoryAccountRepository;
  let useCase: WithdrawUseCase;

  beforeEach(() => {
    repo = new InMemoryAccountRepository();
    const lock = new NoopLock();
    useCase = new WithdrawUseCase(repo as any, lock as any);
  });

  it("throws 404 when origin does not exist", async () => {
    await expect(useCase.execute("nope", 10)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it("throws 400 when balance is zero", async () => {
    await repo.save(new Account("A", 0));
    await expect(useCase.execute("A", 10)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it("throws 400 when amount > balance", async () => {
    await repo.save(new Account("A", 5));
    await expect(useCase.execute("A", 10)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it("decrements balance on success", async () => {
    await repo.save(new Account("A", 20));
    const res = await useCase.execute("A", 7);
    expect(res.origin).toEqual({ id: "A", balance: 13 });
  });
});
