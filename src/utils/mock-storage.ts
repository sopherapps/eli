/**
 * Module containing the implementation of mock storage
 */

export default class MockStorage {
  private items: Map<string, string> = new Map();

  public get length(): number {
    return this.items.size;
  }

  /**
   * key
   */
  public key(index: number) {
    return Array.from(this.items.keys())[index] || null;
  }

  /**
   * setItem
   */
  public setItem(key: string, value: string) {
    this.items.set(key, value);
  }

  /**
   * getItem
   */
  public getItem(key: string) {
    return this.items.get(key) || null;
  }

  /**
   * removeItem
   */
  public removeItem(key: string) {
    this.items.delete(key);
  }

  /**
   * clear
   */
  public clear() {
    this.items.clear();
  }
}
