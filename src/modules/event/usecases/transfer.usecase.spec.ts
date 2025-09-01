import { TransferUseCase } from "./transfer.usecase";
import { InMemoryAccountRepository } from "../../account/repositories/account.repository";
import { Account } from "../../account/account.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { NoopLock } from "../../../common/locks/noop-lock";

describe("TransferUseCase", () => {
  let repo: InMemoryAccountRepository;
  let useCase: TransferUseCase;

  beforeEach(() => {
    repo = new InMemoryAccountRepository();
    const lock = new NoopLock();
    useCase = new TransferUseCase(repo as any, lock as any);
  });

  it("404 when origin not found", async () => {
    await expect(useCase.execute("X", "Y", 10)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it("400 when origin balance is zero", async () => {
    await repo.save(new Account("X", 0));
    await expect(useCase.execute("X", "Y", 10)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it("400 when amount > origin balance", async () => {
    await repo.save(new Account("X", 5));
    await expect(useCase.execute("X", "Y", 10)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it("creates destination if missing and transfers", async () => {
    await repo.save(new Account("X", 15));
    const res = await useCase.execute("X", "Y", 10);
    expect(res.origin).toEqual({ id: "X", balance: 5 });
    expect(res.destination).toEqual({ id: "Y", balance: 10 });
  });
});
