/**
 * BaseService
 * 
 * A foundation class for all API services that implements:
 * - Consistent error handling
 * - Offline support with request queuing
 * - Logging and monitoring
 * - Retry logic
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

// Result type for API operations
export type ApiResult<T> = {
  data?: T;
  error?: Error;
  status: 'success' | 'error' | 'offline';
  fromCache?: boolean;
};

// Configuration for API requests
export interface RequestConfig {
  cacheKey?: string;          // Key for caching response
  cacheTtl?: number;          // Time-to-live for cached data (ms)
  forceNetwork?: boolean;     // Bypass cache and force network request
  retryCount?: number;        // Number of retry attempts
  retryDelay?: number;        // Delay between retries (ms)
  offlineQueue?: boolean;     // Queue request when offline
  offlineTtl?: number;        // Time-to-live for queued requests (ms)
}

// Default configuration
const DEFAULT_CONFIG: RequestConfig = {
  cacheTtl: 5 * 60 * 1000,    // 5 minutes cache TTL
  retryCount: 3,              // Retry 3 times
  retryDelay: 1000,           // 1 second between retries
  offlineQueue: true,         // Queue offline requests
  offlineTtl: 24 * 60 * 60 * 1000, // 24 hours TTL for offline queue
};

export abstract class BaseService {
  protected apiUrl: string;
  protected offlineQueueKey: string;
  
  constructor(serviceName: string) {
    // In a real app, this would be configured from environment
    this.apiUrl = process.env.API_URL || '';
    this.offlineQueueKey = `offline_queue_${serviceName}`;
  }
  
  /**
   * Make an API request with offline support, caching, and retries
   */
  protected async apiRequest<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any,
    config: RequestConfig = {}
  ): Promise<ApiResult<T>> {
    // Merge with default config
    const fullConfig = { ...DEFAULT_CONFIG, ...config };
    
    try {
      // Check network status
      const networkState = await NetInfo.fetch();
      const isConnected = networkState.isConnected;
      
      // If offline and we have cache, return cached data
      if (!isConnected && fullConfig.cacheKey) {
        const cachedData = await this.getCache<T>(fullConfig.cacheKey);
        if (cachedData) {
          console.log(`[BaseService] Using cached data for: ${url}`);
          return {
            data: cachedData,
            status: 'success',
            fromCache: true
          };
        }
      }
      
      // If offline and no cache, queue request if configured
      if (!isConnected && fullConfig.offlineQueue) {
        await this.queueOfflineRequest(url, method, data, fullConfig);
        return {
          error: new Error('No network connection available. Request queued for later.'),
          status: 'offline'
        };
      }
      
      // If online, make the request with retry logic
      return await this.executeRequest<T>(url, method, data, fullConfig);
      
    } catch (error) {
      console.error(`[BaseService] Error in apiRequest: ${error}`);
      return {
        error: error instanceof Error ? error : new Error(String(error)),
        status: 'error'
      };
    }
  }
  
  /**
   * Execute a network request with retry logic
   */
  private async executeRequest<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any,
    config: RequestConfig = {}
  ): Promise<ApiResult<T>> {
    let attempts = 0;
    let lastError: Error | undefined;
    
    // Try the request with retries
    while (attempts <= (config.retryCount || 0)) {
      try {
        // Prepare fetch options
        const options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // Auth headers would be added here
          },
        };
        
        // Add body for non-GET requests
        if (method !== 'GET' && data) {
          options.body = JSON.stringify(data);
        }
        
        // Perform fetch
        const response = await fetch(`${this.apiUrl}${url}`, options);
        
        // Parse response
        const responseData = await response.json();
        
        // Cache successful responses if configured
        if (config.cacheKey && response.ok) {
          await this.setCache(config.cacheKey, responseData, config.cacheTtl);
        }
        
        // Return success or error based on response status
        if (response.ok) {
          return {
            data: responseData as T,
            status: 'success'
          };
        } else {
          throw new Error(responseData.message || 'API request failed');
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        attempts++;
        
        // If more retries are available, wait before next attempt
        if (attempts <= (config.retryCount || 0)) {
          await new Promise(resolve => 
            setTimeout(resolve, config.retryDelay || 1000)
          );
          console.log(`[BaseService] Retrying request (${attempts}/${config.retryCount}): ${url}`);
        }
      }
    }
    
    // All retry attempts failed
    return {
      error: lastError || new Error('Request failed after multiple attempts'),
      status: 'error'
    };
  }
  
  /**
   * Store data in the cache
   */
  private async setCache<T>(key: string, data: T, ttl?: number): Promise<void> {
    try {
      const cacheData = {
        data,
        expiry: ttl ? Date.now() + ttl : undefined
      };
      await AsyncStorage.setItem(
        `cache_${key}`,
        JSON.stringify(cacheData)
      );
    } catch (error) {
      console.error(`[BaseService] Cache write error: ${error}`);
    }
  }
  
  /**
   * Retrieve data from cache if not expired
   */
  private async getCache<T>(key: string): Promise<T | null> {
    try {
      const cachedItem = await AsyncStorage.getItem(`cache_${key}`);
      
      if (!cachedItem) return null;
      
      const { data, expiry } = JSON.parse(cachedItem);
      
      // Check if cache is expired
      if (expiry && Date.now() > expiry) {
        await AsyncStorage.removeItem(`cache_${key}`);
        return null;
      }
      
      return data as T;
    } catch (error) {
      console.error(`[BaseService] Cache read error: ${error}`);
      return null;
    }
  }
  
  /**
   * Add a request to the offline queue
   */
  private async queueOfflineRequest(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any,
    config?: RequestConfig
  ): Promise<void> {
    try {
      // Only queue mutations (non-GET requests)
      if (method === 'GET') return;
      
      // Get current queue
      const queueJson = await AsyncStorage.getItem(this.offlineQueueKey);
      const queue = queueJson ? JSON.parse(queueJson) : [];
      
      // Add request to queue with timestamp
      queue.push({
        url,
        method,
        data,
        timestamp: Date.now(),
        expiry: config?.offlineTtl ? Date.now() + config.offlineTtl : undefined
      });
      
      // Save updated queue
      await AsyncStorage.setItem(this.offlineQueueKey, JSON.stringify(queue));
      console.log(`[BaseService] Request queued for offline processing: ${method} ${url}`);
    } catch (error) {
      console.error(`[BaseService] Error queueing offline request: ${error}`);
    }
  }
  
  /**
   * Process offline request queue when online
   * This would typically be called when the app detects the network is back online
   */
  public async processOfflineQueue(): Promise<void> {
    try {
      // Get the queue
      const queueJson = await AsyncStorage.getItem(this.offlineQueueKey);
      if (!queueJson) return;
      
      const queue = JSON.parse(queueJson);
      const now = Date.now();
      const validRequests = queue.filter((req: any) => {
        // Filter out expired requests
        return !req.expiry || req.expiry > now;
      });
      
      // If no valid requests, clear queue and return
      if (validRequests.length === 0) {
        await AsyncStorage.removeItem(this.offlineQueueKey);
        return;
      }
      
      // Process each request
      const results = [];
      for (const request of validRequests) {
        const { url, method, data } = request;
        console.log(`[BaseService] Processing offline request: ${method} ${url}`);
        
        try {
          // Execute the request (without queuing if it fails again)
          const result = await this.apiRequest(url, method, data, {
            offlineQueue: false // Prevent re-queuing
          });
          results.push({ request, result, success: result.status === 'success' });
        } catch (error) {
          results.push({ request, error, success: false });
        }
      }
      
      // Clear processed requests
      const failedRequests = results
        .filter(r => !r.success)
        .map(r => r.request);
      
      // If there are still failed requests, keep them in the queue
      if (failedRequests.length > 0) {
        await AsyncStorage.setItem(this.offlineQueueKey, JSON.stringify(failedRequests));
      } else {
        await AsyncStorage.removeItem(this.offlineQueueKey);
      }
      
      console.log(`[BaseService] Offline queue processed. ${results.length - failedRequests.length}/${results.length} requests succeeded.`);
    } catch (error) {
      console.error(`[BaseService] Error processing offline queue: ${error}`);
    }
  }
  
  /**
   * Clear expired items from cache
   * This would typically be called periodically or on app startup
   */
  public async clearExpiredCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith('cache_'));
      
      for (const key of cacheKeys) {
        const cachedItem = await AsyncStorage.getItem(key);
        if (!cachedItem) continue;
        
        const { expiry } = JSON.parse(cachedItem);
        if (expiry && Date.now() > expiry) {
          await AsyncStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error(`[BaseService] Error clearing expired cache: ${error}`);
    }
  }
} 