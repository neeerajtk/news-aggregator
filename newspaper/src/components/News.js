import React from 'react'

const News = ({newsItem}) => {
    const {title,description,image,url} = newsItem;

    return (
        <div className="news">
            <h2>{title}</h2>
            <img src={image} alt={title}/>
            <a href={url}>URL</a>
            <button>Read More...</button>
        </div>
    )
}

export default News
