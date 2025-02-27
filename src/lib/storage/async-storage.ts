import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageInterface } from './interface';
import { StorageResponse } from '@/shared/types/common';

/**
 * AsyncStorage implementation of StorageInterface
 */
export class AsyncStorageAdapter implements StorageInterface {
  async get<T>(key: string): Promise<StorageResponse<T>> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) {
        return { data: null, error: null };
      }
      return { data: JSON.parse(value) as T, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  async set<T>(key: string, value: T): Promise<StorageResponse<null>> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return { data: null, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  async remove(key: string): Promise<StorageResponse<null>> {
    try {
      await AsyncStorage.removeItem(key);
      return { data: null, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null;
    } catch {
      return false;
    }
  }

  async clear(): Promise<StorageResponse<null>> {
    try {
      await AsyncStorage.clear();
      return { data: null, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }
} 