import React, { Component } from 'react'
import NewsItem from './NewsItem'
import applyBackground from './background';
 
export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [ 
        {
          source: { id: "espn-cric-info", name: "ESPN Cric Info" },
          author: null,
          title: "PCB hands Umar Akmal three-year ban",
          description: "Penalty after the batsman pleaded guilty...",
          url: "http://www.espncricinfo.com/story/_/id/29103103",
          urlToImage: "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"
        },
        {
          source: { id: "espn-cric-info", name: "ESPN Cric Info" },
          author: null,
          title: "What we learned from the 1992 World Cup",
          description: "Wides, lbw calls, swing - plenty of things...",
          url: "http://www.espncricinfo.com/story/_/id/28970907",
          urlToImage: "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"
        },
        {
          source: { id: "bbc-sport", name: "BBC Sport" },
          author: null,
          title: "Rafael Nadal announces comeback at French Open 2025",
          description: "Rafael Nadal confirms his return to competitive tennis at Roland Garros, aiming for another Grand Slam title...",
          url: "https://www.bbc.com/sport/tennis/french-open-2025",
          urlToImage: "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"
        },
        {
          source: { id: "the-hindu", name: "The Hindu" },
          author: "Sports Desk",
          title: "BCCI announces schedule for IPL 2025",
          description: "The BCCI released the full IPL 2025 schedule today...",
          url: "https://www.thehindu.com/sport/cricket/ipl-2025-schedule-announced/article67000001.ece",
          urlToImage: "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"
        }
      ]
    };
  }
  async componentDidMount(){
    console.log("cdm");
    let url="https://newsapi.org/v2/top-headlines?in&category=business&apiKey=40cc0befe984460ca37a9ce370b7f2fc";
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({articles: parseData.articles})

    applyBackground();
  }


  render() {
    return (
      <div className="container my-3">
        <h1>NewsMonkey - Top Headlines</h1>
        <div className="row">
          {this.state.articles && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 88) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
