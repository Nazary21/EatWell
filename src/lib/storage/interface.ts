import { StorageResponse } from '@/shared/types/common';

/**
 * Base storage interface that all storage implementations must follow
 */
export interface StorageInterface {
  /**
   * Retrieve data from storage
   * @param key - The key to retrieve
   */
  get<T>(key: string): Promise<StorageResponse<T>>;

  /**
   * Store data
   * @param key - The key to store under
   * @param value - The value to store
   */
  set<T>(key: string, value: T): Promise<StorageResponse<null>>;

  /**
   * Remove data from storage
   * @param key - The key to remove
   */
  remove(key: string): Promise<StorageResponse<null>>;

  /**
   * Check if key exists in storage
   * @param key - The key to check
   */
  exists(key: string): Promise<boolean>;

  /**
   * Clear all data from storage
   */
  clear(): Promise<StorageResponse<null>>;
} 