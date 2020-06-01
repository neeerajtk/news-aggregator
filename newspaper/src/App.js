import React from 'react';
import Axios from'axios';
import './App.css';

const App = () => {
    const APP_KEY = "b9a8f27653efa822e6533b678916eb30";
    const content = "kerala";
    const url =  `https://gnews.io/api/v3/search?q=${content}&token=${APP_KEY}`;
    // GET https://gnews.io/api/v3/search?q=example&token=API-Token 
    // b9a8f27653efa822e6533b678916eb30

    const getData = async () => {
        const result = await Axios.get(url)
        .then(result=>{
            console.log(result);
            
        })
        .catch(error => {
            console.log(error);
        })
        
        
    }
    return (
        <div className="App">
          <header className="App-header">
                 <h1 onClick={getData}>NEWSPAPER</h1>  
           </header> 
        </div>
    )
}

export default App
