import React, {useState} from 'react';
import Axios from 'axios';
import {v4 as uuidv4} from "uuid"; 
import './App.css';
import News from './components/News';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const App = () => {
    const [query, setQuery] = useState("");
    // const [wquery, setWeatherQuery] = useState("");
    const [news, setNews] = useState([]);
    const [open, setOpen] = useState(false);


    const APP_KEY = "b9a8f27653efa822e6533b678916eb30";
    // const content = "kerala";
    const url =  `https://gnews.io/api/v3/search?q=${query}&token=${APP_KEY}`;
    // GET https://gnews.io/api/v3/search?q=example&token=API-Token 
    // b9a8f27653efa822e6533b678916eb30
    
   


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

     
    const WAPP_KEY = "8a8f33585b25d8f61b26f7cfa645d3a5";
    // const wurl = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WAPP_KEY}`;
    // 8a8f33585b25d8f61b26f7cfa645d3a5 
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key} 


    
    // const getWeatherData = async () => {
    //     const result = await Axios.get(wurl)
    //     .then(result=>{
    //         console.log('inside getdata');
            
    //         setNews(result.data.articles);
    //         console.log(result);
    //         setQuery(" ");
            
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
        
        
    // };

    const onChange = e => {
        setQuery(e.target.value);
        
    };

    const onSubmit = e => {
        e.preventDefault();
        getData();
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    }


    if (window.navigator.geolocation) {
        var failure, success;
        success = function(position) {
          console.log(position);
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          setOpen(true);
        };
        failure = function(message) {
          alert('Cannot retrieve location!');
        };
        navigator.geolocation.getCurrentPosition(success, failure, {
          maximumAge: Infinity,
          timeout: 5000
        });
    }


    return (
        <div className="App">
          <header className="App-header">
             <h1> NEWSPAPER.IO</h1>
             <p> </p>
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

            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Note archived"
                action={
                <React.Fragment>
                    <Button color="secondary" size="small" onClick={handleClose}>
                    UNDO
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
              />




        </div>
    )
}
export default App