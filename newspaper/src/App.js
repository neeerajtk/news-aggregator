import React, {useState} from 'react';
import Axios from'axios';
import './App.css';

const App = () => {
    const [query, setQuery] = useState("");

    const APP_KEY = "b9a8f27653efa822e6533b678916eb30";
    // const content = "kerala";
    const url =  `https://gnews.io/api/v3/search?q=${query}&token=${APP_KEY}`;
    // GET https://gnews.io/api/v3/search?q=example&token=API-Token 
    // b9a8f27653efa822e6533b678916eb30

    const getData = async () => {
        const result = await Axios.get(url)
        .then(result=>{
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
             <h1>NEWSPAPER</h1>  
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
        </div>
    )
}

export default App
