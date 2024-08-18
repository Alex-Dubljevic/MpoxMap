'use client';

import { useEffect, useState } from 'react';
import { fetchNews } from '../utils/fetchNews';

interface Article {
  uuid: string;
  title: string;
  description: string;
  url: string;
  image_url: string;
}

interface NewsResponse {
  meta: {
    found: number;
    returned: number;
    limit: number;
    page: number;
  };
  data: Article[];
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewsArticles = async (pageNum: number, isInitialFetch: boolean = false) => {
    setIsLoading(true);
    try {
      const response: NewsResponse = await fetchNews(pageNum);
      const newArticles = response.data;
      
      if (isInitialFetch) {
        setArticles(newArticles);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      }
      
      if (page < 5) {
        setHasMore(response.meta.returned === response.meta.limit);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsArticles(1, true);
  }, []);

  const loadMore = () => {
    if (isLoading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNewsArticles(nextPage);
    if (page > 4) {
        setHasMore(false); // Limit extra pages to prevent bad articles
    }
  };

  return (
    <section className="bg-blue-800 py-6 rounded-xl">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-white">Recent Mpox News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[400px]">
          {articles.map((article) => (
            <div key={article.uuid} className="bg-neutral-900 p-4 rounded-lg shadow-md">
              <img
                src={article.image_url || '/placeholder-image.png'}
                alt={article.title}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-lg font-semibold mb-2 text-white">{article.title}</h3>
              <p className="text-sm mb-2 text-gray-400">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Read more
              </a>
            </div>
          ))}
        </div>
        {hasMore && (
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        )}
        {!hasMore && articles.length > 0 && (
          <p className="mt-4 text-gray-300">No more articles remaining.</p>
        )}
      </div>
    </section>
  );
};

export default News;
