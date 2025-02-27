/**
 * Basic response type for all storage operations
 */
export interface StorageResponse<T> {
  data: T | null;
  error: string | null;
}

/**
 * Basic error type
 */
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * Theme options
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Basic timestamp fields
 */
export interface TimestampFields {
  createdAt: string;
  updatedAt: string;
} 