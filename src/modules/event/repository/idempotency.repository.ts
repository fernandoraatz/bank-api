export class IdempotencyRepository {
  private store = new Map<string, any>();

  exists(key: string): boolean {
    return this.store.has(key);
  }

  get(key: string): any {
    return this.store.get(key);
  }

  save(key: string, response: any): void {
    this.store.set(key, response);
  }

  clear(): void {
    this.store.clear();
  }
}
