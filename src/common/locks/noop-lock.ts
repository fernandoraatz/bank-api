export class NoopLock {
  withAccount<T>(_id: string, fn: () => Promise<T>) {
    return fn();
  }
  withTwoAccounts<T>(_a: string, _b: string, fn: () => Promise<T>) {
    return fn();
  }
}
