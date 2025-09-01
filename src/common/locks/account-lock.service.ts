import { Injectable } from "@nestjs/common";
import AsyncLock from "async-lock";

@Injectable()
export class AccountLockService {
  private lock = new AsyncLock({ timeout: 5000, maxPending: 1000 });

  withAccount<T>(accountId: string, fn: () => Promise<T>) {
    return this.lock.acquire(`acct:${accountId}`, fn);
  }

  withTwoAccounts<T>(a: string, b: string, fn: () => Promise<T>) {
    const [k1, k2] = [`acct:${a}`, `acct:${b}`].sort();
    return this.lock.acquire([k1, k2], fn);
  }
}
