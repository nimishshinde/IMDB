import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import { Oval } from  'react-loader-spinner'

function Trending() {
  
  let [movies, setMovies] = useState([]);
  let [pageNumber,  setPage] = useState(1);
  const [hover, setHover] = useState("");
  const [favourites, setFavourite] = useState([]);

  function add(movie){
    let newArray = [...favourites, movie];
    setFavourite(newArray);
    localStorage.setItem("imdb", JSON.stringify(newArray));
  }
  
  function del(movie){
    let newArray = favourites.filter((m) => m.id != movie.id);
    setFavourite([...newArray]);
    localStorage.setItem("imdb", JSON.stringify(newArray));

  }

  function goNext(){
    setPage(pageNumber + 1);
  }

  function goPrev(){
    if(pageNumber > 1){
      setPage(pageNumber - 1);
    }
  }

  useEffect(function(){
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=d6176f1b4953a856712c5310b1549b70&page=${pageNumber}`)
    .then((res) =>{
        setMovies(res.data.results);
    })
    let oldFav = localStorage.getItem("imdb") || '[]';
    oldFav = JSON.parse(oldFav);
    setFavourite([...oldFav]);

  }, [pageNumber])  

  return (
    <>
    <div className='mb-3 text-center mt-8 font-mono text-blue-600 font-bold text-3xl'>Trending Movies</div>
    {   
      movies.length === 0 ?
      <div className='flex justify-center m-4'>
          <Oval
              heigth="80"
              width="80"
              color='grey'
              ariaLabel='loading'
          />
      </div> :

      <div className='flex flex-wrap justify-center'>
      {
        movies.map((movie) => (
        <div className={`relative ease-out 
          duration-300 m-7 hover:scale-110 flex items-end rounded-xl m-5 
          bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] 
          md:h-[30vh] md:w-[200px] h-[25vh] w-[150px] bg-center bg-cover`}
          onMouseEnter={() => {
            setHover(movie.id)
          }}
          onMouseLeave={() => {
            setHover("");
          }}

        >  
        {
          hover == movie.id && <> {
            favourites.find((m) => m.id == movie.id) ?
            <div onClick={() => del(movie)} className='absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer'>❌</div>
          :  <div onClick={() => add(movie)} className='absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer'>💗</div> 
          }
          </>
        }

        <div className='font-mono p-1 rounded-b-xl text-center text-white bg-gray-900 w-full'>{movie.title}</div>
        </div>

        ))
      }
      </div>
    }
    <Pagination pageNumber={pageNumber} goNext={goNext} goPrev={goPrev} />
    </>
  )
}

export default Trending;