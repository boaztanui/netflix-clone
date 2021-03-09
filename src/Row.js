  import React, {useState, useEffect} from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import axios from './axios';
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) { 
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");


    //This will fetch the data every time the person loads the page
     useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
         
     }, [fetchUrl]);  // anything in the [] means it will only run everytime movies changes. if blank, it means that the useEffect will only run on pageload. but when you add ,movies inside then it will mean that it will only run everytime there is a change in the movies.

     const opts = {
         height: "390",
         width: "100%",
         playerVars: {
            autoplay: 1,
         },
     };

     const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl('');
        }else { 
            movieTrailer(movie?.name || "")
            .then((url) => {
                //https://www.youtube.com/watch?v=TFJwUwnShnA
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v")); 
            })
            .catch((error) => console.log(error));   
        }  
     }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
            {/*several raw__poster(s) */}

            {movies.map(movie => (
                <img 
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
            ))}
            </div>

            {trailerUrl &&  <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row;
