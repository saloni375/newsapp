import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const apiKey = process.env.REACT_APP_NEWS_API_KEY;

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  const updateNews = async () => {
    props.setProgress('start');

    let url;
    if (props.searchQuery && props.searchQuery.trim() !== "") {
      url = `https://newsapi.org/v2/everything?q=${props.searchQuery}&apiKey=${apiKey}&page=${page}&pageSize=${props.pagesize}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pagesize}`;
    }

    setLoading(true);
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
      props.setProgress('done');
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      props.setProgress('done');
    }
  };

useEffect(() => {
  
 
  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
   // eslint-disable-next-line
  updateNews();
 
}, [props.category]);


  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    props.setProgress('start');

    let url;
    if (props.searchQuery && props.searchQuery.trim() !== "") {
      url = `https://newsapi.org/v2/everything?q=${props.searchQuery}&apiKey=${apiKey}&page=${nextPage}&pageSize=${props.pagesize}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${props.pagesize}`;
    }

    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles || []));
      setTotalResults(parsedData.totalResults || 0);
      props.setProgress('done');
    } catch (error) {
      console.error("Error fetching more data:", error);
      props.setProgress('done');
    }
  };

  return (
    <div className="container my-4 bg-secondary" style={{borderRadius:'5px'}}>
      <h1 className="text-center text-white bg-dark p-4 rounded shadow" style={{margin:'35px 0px',marginTop:'70px'}}>
        NewsMonkey - {props.searchQuery ? `Search Results for "${props.searchQuery}"` : `Top ${capitalizeFirstLetter(props.category)} Headlines`}
      </h1>

      {loading && articles.length === 0 ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.length === 0 ? (
                <div className="text-center text-white">
                  <h4>No articles found. Try a different search term.</h4>
                </div>
              ) : (
                articles.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 88) : ""}
                      description={element.description ? element.description.slice(0, 88) : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pagesize: 5,
  category: 'general',
  searchQuery: ''
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
  searchQuery: PropTypes.string,
  setProgress: PropTypes.func
};

export default News;
