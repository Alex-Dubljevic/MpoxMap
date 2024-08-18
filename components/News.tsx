'use client';

import { useEffect, useState } from 'react';
import { fetchNews } from '../utils/fetchNews';

const News: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getInitialNews = async () => {
      setIsLoading(true);
      try {
        const newsArticles = await fetchNews(1);
        setArticles(newsArticles);
        setHasMore(newsArticles.length === 6);
      } catch (error) {
        console.error('Error fetching initial news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialNews();
  }, []);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const newsArticles = await fetchNews(nextPage);
      
      if (newsArticles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...newsArticles]);
        setPage(nextPage);
        setHasMore(newsArticles.length === 6);
      }
    } catch (error) {
      console.error('Error fetching more news:', error);
    } finally {
      setIsLoading(false);
    }
    if(page == 5) {
        setHasMore(false) //limit extra pages to prevent bad articles
    }
  };

  return (
    <section className="bg-blue-800 py-6 rounded-xl">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Recent Mpox News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[600px]">
          {articles.map((article, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={article.urlToImage || '/placeholder-image.png'}
                alt={article.title}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-lg font-semibold mb-2 text-black">{article.title}</h3>
              <p className="text-sm mb-2">{article.description}</p>
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
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        )}
        {!hasMore && (
          <p className="mt-4 text-gray-500">No more articles remaining.</p>
        )}
      </div>
    </section>
  );
};

export default News;
