// utils/fetchNews.ts
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const fetchNews = async (page: number = 0) => {
  const response = await fetch(`https://newsapi.org/v2/everything?q=mpox&language=en&pageSize=6&page=${page}&apiKey=${API_KEY}`);
  const data = await response.json();
  return data.articles;
};