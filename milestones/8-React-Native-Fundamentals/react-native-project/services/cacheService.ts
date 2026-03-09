import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

interface CachedData<T> {
  data: T;
  timestamp: number;
}

// Save data to cache
export const saveToCache = async <T,>(key: string, data: T): Promise<void> => {
  try {
    const cacheData: CachedData<T> = {
      data,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Cache save error:", error);
  }
};

// Get data from cache
export const getFromCache = async <T,>(key: string): Promise<T | null> => {
  try {
    const cached = await AsyncStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp }: CachedData<T> = JSON.parse(cached);

    // Check if cache expired
    if (Date.now() - timestamp > CACHE_EXPIRY) {
      await AsyncStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Cache read error:", error);
    return null;
  }
};

// Clear specific cache
export const clearCache = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Cache clear error:", error);
  }
};

// Clear all cache
export const clearAllCache = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Cache clear all error:", error);
  }
};
