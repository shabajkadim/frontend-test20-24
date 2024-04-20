
import React, { useState } from 'react';
import axios from 'axios';

const SearchMovie = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
   

    const searchMovies = async () => {
        try {
            const response = await axios.get('https://online-movie-database.p.rapidapi.com/auto-complete', {
                params: { q: query },
                headers: {
                    'X-RapidAPI-Key': '7de4ed48e2msh6e4706ab2486e4bp1b5908jsn239d6131e5df',
                    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
                }
            });
            console.log(response.data, "response.data");
            setSearchResults(response.data.d); // Update to response.data.d
           
            setQuery("")
        } catch (error) {
           console.log(error);
           
        }
    };

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (query) {
            searchMovies();
        } else {
          console.log('error');
        }
    };

    return (
        <div className="movie-search-container">
            <h2>Movie Search</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={handleQueryChange} placeholder="Enter movie name" />
                <button className='ButtonColor' type="submit">Search</button>
            </form>
            <h2>Search Results</h2>
           {searchResults?.length? <div>
            {searchResults.map((data)=>{
                return(
                    <div>{data.l}</div>
                )
            })}
           </div>: <div>Loading</div>}
        </div>
    );
}

export default SearchMovie;