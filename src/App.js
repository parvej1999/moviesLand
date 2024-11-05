import React from 'react';
import {useEffect, useState} from 'react'

import searchIcon from './search.svg'
import MovieCards from './movieCard';

// 31605d57
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=31605d57';
// const movie1 = {
//     "Title": "Superman, Spiderman or Batman",
//     "Year": "2011",
//     "imdbID": "tt2084949",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
// }

const App = ()=>{
    
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title)=>{
        const response = await fetch(`${API_URL}&s=${title}`)
        var data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => { 
        searchMovies("Spiderman");
        
    }, []);


    return(
        <>
        <div className="app">
            <h1>MovieLand</h1>
            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value = {searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={searchIcon} 
                    alt='search' 
                    onClick = {() => searchMovies(searchTerm)}
                / >
            </div>

            {
                movies?.length>0 ?
                (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCards movie={movie} />

                        ))}

                    </div>
                ):(
                    <div className='empty'>
                        <h3>No movies found!</h3>
                    </div>
                )
            }


            
        </div>
        </>
    );
}

export default App