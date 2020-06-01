import React from 'react'

const News = ({newsItem}) => {
    const {title,description,image,url} = newsItem;

    return (
        <div className="news_disp">
            <h2>{title}</h2>
            <img src={image} alt={title}/>
            <a href={url}>Read More</a>
            {/* <button>Read More...</button> */}
        </div>
    )
}

export default News
