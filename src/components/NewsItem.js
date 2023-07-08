import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description, imageurl, newsurl} = this.props;
    return (
      <div className='my-3'>

        <div className="card my-2">
        <img src={imageurl} className="card-img-top" alt="Not available"/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}</p>
            <a href={newsurl} target='_blank' rel="noreferrer" className="btn  btn-sm btn-danger">Read More</a>
        </div>
        </div>

      </div>
    )
  }
}

export default NewsItem