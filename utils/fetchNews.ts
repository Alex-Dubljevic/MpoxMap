// utils/fetchNews.ts
import { getCachedData, setCachedData } from './cacheUtils';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const fetchNews = async (page: number = 1): Promise<any[]> => {
  const cachedData = getCachedData(page);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=mpox&language=en&pageSize=6&page=${page}&apiKey=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.status === 'ok' && Array.isArray(data.articles)) {
      setCachedData(page, data.articles);
      return data.articles;
    } else {
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};