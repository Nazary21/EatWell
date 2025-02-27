import { StorageInterface } from './interface';
import { AsyncStorageAdapter } from './async-storage';

/**
 * Storage service that provides a single point of access to storage
 * Can be easily switched between different storage implementations
 */
class StorageService {
  private static instance: StorageService;
  private storage: StorageInterface;

  private constructor() {
    // Default to AsyncStorage implementation
    this.storage = new AsyncStorageAdapter();
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * Set a different storage implementation
   * @param storage - The storage implementation to use
   */
  public setStorage(storage: StorageInterface) {
    this.storage = storage;
  }

  public get<T>(key: string) {
    return this.storage.get<T>(key);
  }

  public set<T>(key: string, value: T) {
    return this.storage.set(key, value);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public exists(key: string) {
    return this.storage.exists(key);
  }

  public clear() {
    return this.storage.clear();
  }
}

// Export a singleton instance
export const storageService = StorageService.getInstance(); 