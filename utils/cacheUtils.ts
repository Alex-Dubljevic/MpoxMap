// utils/cacheUtils.ts

const CACHE_KEY = 'mpox_news_cache';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CacheItem {
  timestamp: number;
  data: any[];
}

export const getCachedData = (page: number): any[] | null => {
  try {
    const cacheString = localStorage.getItem(CACHE_KEY);
    if (cacheString) {
      const cache = JSON.parse(cacheString);
      const cacheItem = cache[page] as CacheItem;
      if (cacheItem && Date.now() - cacheItem.timestamp < CACHE_EXPIRATION) {
        return cacheItem.data;
      }
    }
  } catch (error) {
    console.error('Error reading from cache:', error);
  }
  return null;
};

export const setCachedData = (page: number, data: any[]): void => {
  try {
    const cacheString = localStorage.getItem(CACHE_KEY);
    const cache = cacheString ? JSON.parse(cacheString) : {};
    cache[page] = {
      timestamp: Date.now(),
      data: data,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
};