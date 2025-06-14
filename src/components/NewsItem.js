import React from 'react'

const NewsItem = (props) => {
  
    let { title, description, imageUrl, newsUrl,author,date ,source} = props;
    return (
      <div className="my-3">
        <div className="card" >
          <span
              className="position-absolute top-0  translate-middle badge rounded-pill bg-success"
              style={{ left: '90%', zIndex: '1' }}>
              {source}
           </span>


          <img src={!imageUrl?"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg" : imageUrl} className="card-img-top" alt="..." />
          
          <div className="card-body">
            <h5 className="card-title">{title}...  

            <span className="badge bg-secondary">New
              </span></h5>
            <p className="card-text">{description}</p>

            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
              </small>
            </p>

            <a  href={newsUrl} className="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }


export default NewsItem;
