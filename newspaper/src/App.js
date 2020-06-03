import React, {useState} from 'react';
import Axios from 'axios';
import {v4 as uuidv4} from "uuid"; 
import './App.css';
import News from './components/News';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


const App = () => {
    const [query, setQuery] = useState("");
    // const [wquery, setWeatherQuery] = useState("");
    const [news, setNews] = useState([]);
    const [weather, setWeather] = useState("");
    const [open, setOpen] = useState(false);
    const [wfetch, setWfetch] = useState(true);


    // const APP_KEY = "b9a8f27653efa822e6533b678916eb30";
    // added new token 
    const APP_KEY = "4f09e1276dd1075aac00c30e859d0710";
    // const content = "kerala";
    const url =  `https://gnews.io/api/v3/search?q=${query}&token=${APP_KEY}`;
    // GET https://gnews.io/api/v3/search?apple&lang=ml&token=4f09e1276dd1075aac00c30e859d0710 
    // b9a8f27653efa822e6533b678916eb30
    
   

// Function for retreiving news  

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

// Retrives homepage news data 
    const getHomeData = async () => {
        // const homeUrl =  `https://gnews.io/api/v3/topics/technology?&token=${APP_KEY}`;
        const homeUrl =  `https://gnews.io/api/v3/search?q=world&token=${APP_KEY}`;
        // GET https://gnews.io/api/v3/topics/world?token=API-Token
        const result = await Axios.get(homeUrl)
        .then(result=>{
            console.log('inside homegetdata');
            
            setNews(result.data.articles);
            setNews(result.data.articles.newsItem.image);
            console.log(result);
            setQuery(" ");
            
        })
        .catch(error => {
            console.log(error);
        })
        
        
    };



     
    const WAPP_KEY = "8a8f33585b25d8f61b26f7cfa645d3a5";
    // 8a8f33585b25d8f61b26f7cfa645d3a5 
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key} 

// Function for retrieving weather 

    const getWeatherData = async (lat,long) => {
        const wurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WAPP_KEY}`;    
        const result = await Axios.get(wurl)
        .then(result=>{
            console.log('inside weather func');
            setWeather(result.data.weather[0].description);
            console.log(result);
            // setQuery(" ");
            
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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    }

// User Geolocation fetching function 

    if (window.navigator.geolocation && wfetch) {
        var failure, success;
        success = function(position) {
          console.log(position);
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          getWeatherData(lat, long);
          setOpen(true);
          setWfetch(false);
          getHomeData();
        };
        failure = function(message) {
          alert('Cannot retrieve location!');
          setWfetch(false);
        };
        navigator.geolocation.getCurrentPosition(success, failure, {
          maximumAge: Infinity,
          timeout: 5000
        });
    }


//  dropdown weather 

    const classes = useStyles();
    const [lang, setLang] = React.useState('');

    const handleChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setLang(event.target.value);
    };



    return (
        <div className="App">
          <header className="App-header">
             <h1><i className="fa fa-newspaper-o" aria-hidden="true"></i> NEWSPAPER.IO</h1>
             <p> </p>
           </header> 


           <form className="search-form" onSubmit={onSubmit}>
                 <input 
                 type="text"
                 placeholder="Search News!" 
                 onChange={onChange}
                 value={query}
                 />


                    <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Language</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={lang}
                                onChange={handleChange}
                            >
                            <MenuItem value={'en'}>English (Default)</MenuItem>
                            <MenuItem value={'fr'}>French</MenuItem>
                            <MenuItem value={'de'}>German</MenuItem>
                            <MenuItem value={'it'}>Italian</MenuItem>
                            </Select>
                    </FormControl>



                 <input type="submit" value="Search"/>
            </form>
            <div className="news">
                {news !== [] && news.map(newsItem =>
                    <News key={uuidv4()} props={newsItem}/> 
                    // console.log(newsItem)
                    
                    )}
            </div>
{/* Snackbar for showing weather information  */}
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={'Weather Outside  : ' + weather}
                action={
                <React.Fragment>
                    {/* <Button color="secondary" size="small" onClick={handleClose}>
                    UNDO
                    </Button> */}
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