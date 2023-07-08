import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

        static defaultProps = {
            country: 'in',
            pageSize : 5,
            category : 'general'
        }

        static propTypes = {
            country: PropTypes.string,
            pageSize: PropTypes.number,
            category : PropTypes.string
        }


        constructor(){
        super();
        this.state = {
            articles : [],
            loading: false,
            page:1
        }
        }
    componentDidMount = async() =>{ //runs after render()
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ce3021c8c91419689bbb0055244f6c2&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles : parseData.articles, totalResults:parseData.totalResults, loading:false})
    }
    handleNextClick = async() =>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ce3021c8c91419689bbb0055244f6c2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parseData =await data.json();
            this.setState({ 
                page : this.state.page + 1,
                articles : parseData.articles,
                loading:false
            })
        }

    }

    handlePreviousClick = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ce3021c8c91419689bbb0055244f6c2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ 
            
            page : this.state.page - 1,
            articles : parseData.articles,
            loading:false
        
        })

    }

  render() {
    return (
      <div className='container my-5'>
        <h1 className='text-center'>Top headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element) => {
                        
            return <div className="col-md-4" key = {element.url}>
                <NewsItem  title={element.title.slice(0,40)} 
                           description={element.description?element.description.slice(0,88) +"..." : " "} 
                           imageurl={element.urlToImage} 
                           newsurl = {element.url}
                        
                        >
                </NewsItem>
            </div>
        })}
            
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled ={this.state.page<=1} type="button" className="btn btn-secondary" onClick={this.handlePreviousClick}>Previous</button>
        <button disabled ={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-secondary" onClick={this.handleNextClick}>Next</button>


        </div>
      </div>
    )
  }
}

export default News