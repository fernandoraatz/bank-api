import { Account } from "../account.entity";

export interface AccountRepository {
  findById(id: string): Promise<Account | null>;
  save(account: Account): Promise<void>;
  deleteAll(): Promise<void>;
}

export class InMemoryAccountRepository implements AccountRepository {
  private accounts = new Map<string, Account>();

  async findById(id: string): Promise<Account | null> {
    return this.accounts.get(id) ?? null;
  }

  async save(account: Account): Promise<void> {
    this.accounts.set(account.id, account);
  }

  async deleteAll(): Promise<void> {
    this.accounts.clear();
  }
}
