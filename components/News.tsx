'use client';

import { useEffect, useState } from 'react';
import { fetchNews } from '../utils/fetchNews';

const News: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        const newsArticles = await fetchNews(page);

        if (newsArticles.length === 0) {
          setHasMore(false);
          setShowLoadMore(false);
          return;
        }

        // Filter out Yahoo articles and articles that were removed
        const filteredArticles = newsArticles
          .filter(article => !article.source.name.includes('Yahoo'))
          .filter(article => article.title !== '[Removed]');
        
        // Determine if more pages are available
        if (filteredArticles.length < 1) {
          setHasMore(false);
        }

        setArticles((prevArticles) => [
          ...prevArticles,
          ...filteredArticles
        ]);
      } catch (error) {
        console.error('Error fetching news:', error);
        setShowLoadMore(false); // Hide the button if an error occurs
      }
    };

    if (page <= 5 && hasMore) {
      getNews();
    }
  }, [page]);

  const loadMore = () => {
    if (page < 5 && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
    if (page >= 5 || !hasMore) {
      setShowLoadMore(false);
    }
  };

  return (
    <section className="bg-gray-100 py-6">
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
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              <p className="text-sm mb-2">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Read more
              </a>
            </div>
          ))}
        </div>
        {showLoadMore ? (
          <button
            onClick={loadMore}
            className={`mt-4 px-4 py-2 rounded ${hasMore ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!hasMore}
          >
            {hasMore ? 'Load More' : 'No articles remaining'}
          </button>
        ) : (
          <p className="mt-4 text-center text-gray-600">No articles remaining</p>
        )}
      </div>
    </section>
  );
};

export default News;
