import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner';


 
export class News extends Component {
  static defaultProps = {
  country: "us",
  pagesize: 5
}

  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      page :1,
      articles: [ 
        {
          source: { id: "espn-cric-info", name: "ESPN Cric Info" },
          author: null,
          title: "PCB hands Umar Akmal three-year ban",
          description: "Penalty after the batsman pleaded guilty...",
          url: `http://www.espncricinfo.com/story/_/id/29${this.props.pagesize}3${this.props.pagesize}3`,
          urlToImage: `https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F${this.props.pagesize}99495_800x450.jpg`
        },
        {
          source: { id: "espn-cric-info", name: "ESPN Cric Info" },
          author: null,
          title: "What we learned from the 1992 World Cup",
          description: "Wides, lbw calls, swing - plenty of things...",
          url: `http://www.espncricinfo.com/story/_/id/28970907`,
          urlToImage: "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"
        },
        {
          source: { id: "bbc-sport", name: "BBC Sport" },
          author: null,
          title: "Rafael Nadal announces comeback at French Open 2025",
          description: "Rafael Nadal confirms his return to competitive tennis at Roland Garros, aiming for another Grand Slam title...",
          url: `https://www.bbc.com/sport/tennis/french-open-2025`,
          urlToImage: "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"
        },
        {
          source: { id: "the-hindu", name: "The Hindu" },
          author: "Sports Desk",
          title: "BCCI announces schedule for IPL 2025",
          description: "The BCCI released the full IPL 2025 schedule today...",
          url: `https://www.thehindu.com/sport/cricket/ipl-2025-schedule-announced/article67000001.ece`,
          urlToImage: `https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F${this.props.pagesize}99495_800x450.jpg`
        }
      ]
    };
  }
async componentDidMount() {
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=40cc0befe984460ca37a9ce370b7f2fc&page=${this.state.page}&pagesize=${this.props.pagesize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  let parseData = await data.json();
  this.setState({ 
    articles: parseData.articles,
    totalResults: parseData.totalResults,
    loading:false
  });
}


handlePrevClick = async () => {
  const prevPage = this.state.page - 1;
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=40cc0befe984460ca37a9ce370b7f2fc&page=${prevPage}&pagesize=${this.props.pagesize}`;
  this.setState({loading:true}); 
  let data = await fetch(url);
  let parseData = await data.json();
  this.setState({
    page: prevPage,
    articles: parseData.articles,
    loading:false
  });
};

handleNextClick = async () => {
  const nextPage = this.state.page + 1;
  const maxPage = Math.ceil(this.state.totalResults / (this.props.pagesize));

  if (!(nextPage > maxPage)) {

  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=40cc0befe984460ca37a9ce370b7f2fc&page=${nextPage}&pagesize=${this.props.pagesize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  let parseData = await data.json();
 
  this.setState({
    page: nextPage,
    articles: parseData.articles,
    loading:false
  });
}
};


render() {
  return (
    <div className="container my-4 bg-secondary">
      <h1 className="text-center text-white bg-dark p-3 rounded shadow">
        NewsMonkey - Top Headlines
      </h1>

      <div className="row">
        {this.state.loading ? (
          <Spinner />
        ) : (
          this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 88) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
              />
            </div>
          ))
        )}
      </div>

      <div className="container d-flex justify-content-between">
        <button
          disabled={this.state.page <= 1}
          onClick={this.handlePrevClick}
          className="btn btn-success my-3 mx-3"
        >
          &larr; Previous
        </button>

        <button
          disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pagesize)}
          onClick={this.handleNextClick}
          className="btn btn-success my-3 mx-3"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

}

export default News;
