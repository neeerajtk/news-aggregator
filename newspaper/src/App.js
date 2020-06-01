import React from 'react';
import './App.css';

const App = () => {
    const url =  "https://gnews.io/api/v3/{endpoint}?token=b9a8f27653efa822e6533b678916eb30";
    // GET https://gnews.io/api/v3/search?q=example&token=API-Token 
    // b9a8f27653efa822e6533b678916eb30


    return (
        <div className="App">
          <header className="App-header">
                 <h1>NEWSPAPER</h1>  
           </header> 
        </div>
    )
}

export default App
