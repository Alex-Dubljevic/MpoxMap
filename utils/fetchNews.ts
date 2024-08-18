import { clearCache, getCachedData, setCachedData } from './cacheUtils';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
if (!API_KEY) {
  throw new Error('API key is not defined in the environment variables.');
}

export const fetchNews = async (page: number = 1): Promise<any> => {
  console.log(`Fetching news for page ${page}...`);
  const cachedData = getCachedData(page);
  if (cachedData) {
    console.log(`Cache hit for page ${page}`);
    return cachedData;
  }

  try {
    const response = await fetch(`https://api.thenewsapi.com/v1/news/top?` +
      `api_token=${API_KEY}&` +
      `search=mpox&` +
      `language=en&` +
      `limit=3&` +
      `exclude_domains=info.gov.hk,ecns.cn&` +
      `page=${page}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data && Array.isArray(data.data)) {
      console.log(`Fetched ${data.data.length} articles for page ${page}`);
      setCachedData(page, data);
      return data;
    } else {
      console.error('Invalid response format from API:', data);
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
