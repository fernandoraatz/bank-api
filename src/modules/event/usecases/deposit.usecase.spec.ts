import { DepositUseCase } from "./deposit.usecase";
import { InMemoryAccountRepository } from "../../account/repositories/account.repository";
import { Account } from "../../account/account.entity";
import { NoopLock } from "../../../common/locks/noop-lock";

describe("DepositUseCase", () => {
  let repo: InMemoryAccountRepository;
  let useCase: DepositUseCase;

  beforeEach(() => {
    repo = new InMemoryAccountRepository();
    const lock = new NoopLock();
    useCase = new DepositUseCase(repo as any, lock as any);
  });

  it("should create a new account when destination does not exist", async () => {
    const result = await useCase.execute("100", 10);

    expect(result).toEqual({
      destination: { id: "100", balance: 10 },
    });

    const account = await repo.findById("100");
    expect(account).toBeDefined();
    expect(account?.balance).toBe(10);
  });

  it("should increment balance if account already exists", async () => {
    await repo.save(new Account("200", 20));

    const result = await useCase.execute("200", 15);

    expect(result).toEqual({
      destination: { id: "200", balance: 35 },
    });

    const account = await repo.findById("200");
    expect(account?.balance).toBe(35);
  });
});
