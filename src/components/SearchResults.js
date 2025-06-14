import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = ({ setProgress }) => {
  const query = useQuery().get("q") || "";
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 9;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY || "your_fallback_api_key"; 

  useEffect(() => {
   
    setArticles([]);
    setPage(1);
    setTotalResults(0);
    fetchArticles(1, true);
    
  }, [query]);

  const fetchArticles = async (pageNumber = 1, reset = false) => {
    if (!query) return;

    if (setProgress) setProgress(30);

    setLoading(true);
    setError(null);

    try {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&pageSize=${pageSize}&page=${pageNumber}&apiKey=${apiKey}`;

      const response = await fetch(url);
      if (setProgress) setProgress(60);

      const data = await response.json();

      if (response.ok && data.status === "ok") {
        if (data.articles.length === 0 && pageNumber === 1) {
          setError("No articles found for this search.");
        }

        setArticles((prev) =>
          reset ? data.articles : [...prev, ...data.articles]
        );
        setTotalResults(data.totalResults || 0);
        setPage(pageNumber);
      } else {
        setError(data.message || "Error fetching articles.");
      }

      if (setProgress) setProgress(100);
    } catch (err) {
      setError("Network error. Please try again.");
      if (setProgress) setProgress(100);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = () => {
    fetchArticles(page + 1);
  };

  return (
    <div className="container my-4 bg-secondary">
      <h1 className="text-center text-white bg-dark p-4 rounded shadow">
        Search Results for "{query}"
      </h1>

      {error && <p className="text-danger text-center">{error}</p>}
      {loading && articles.length === 0 && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {articles.map((article) => (
            <div className="col-md-4 mb-3" key={article.url}>
              <div className="card h-100">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    className="card-img-top"
                    alt={article.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary mt-auto"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default SearchResults;
