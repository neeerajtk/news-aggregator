import React, {useState} from 'react';
import Axios from'axios';
import {v4 as uuidv4} from "uuid"; 
import './App.css';
import News from './components/News';

const App = () => {
    const [query, setQuery] = useState("");
    const [news, setNews] = useState([]);

    const APP_KEY = "b9a8f27653efa822e6533b678916eb30";
    // const content = "kerala";
    const url =  `https://gnews.io/api/v3/search?q=${query}&token=${APP_KEY}`;
    // GET https://gnews.io/api/v3/search?q=example&token=API-Token 
    // b9a8f27653efa822e6533b678916eb30
    
    
    const WAPP_KEY = "8a8f33585b25d8f61b26f7cfa645d3a5";
    const wurl = `api.openweathermap.org/data/2.5/weather?q=${wquery}&appid=${WAPP_KEY}`

    const getData = async () => {
        const result = await Axios.get(url)
        .then(result=>{
            console.log('inside getdata');
            
            setNews(result.data.articles);
            console.log(result);
            setQuery(" ");
            
        })
        .catch(error => {
            console.log(error);
        })
        
        
    };

    const onChange = e => {
        setQuery(e.target.value);
        
    };

    const onSubmit = e => {
        e.preventDefault();
        getData();
    };

    


    return (
        <div className="App">
          <header className="App-header">
             <h1> NEWSPAPER.IO</h1>
             <form className="weather-search-form" onSubmit={onSubmitWeather}>
                 <input 
                 type="text"
                 placeholder="Search City!" 
                 onChange={onChangeWeather}
                 value={wquery}
                 />
                 <input type="submit" value="Find"/>
            </form>  
           </header> 
           <form className="search-form" onSubmit={onSubmit}>
                 <input 
                 type="text"
                 placeholder="Search News!" 
                 onChange={onChange}
                 value={query}
                 />
                 <input type="submit" value="Search"/>
            </form>
            <div className="news">
                {news !== [] && news.map(newsItem =>
                    <News key={uuidv4()} props={newsItem}/> 
                    // console.log(newsItem)
                    
                    )}
            </div>
        </div>
    )
}

export default App