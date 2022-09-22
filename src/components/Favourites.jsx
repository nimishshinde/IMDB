import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown ,  faArrowUp } from '@fortawesome/free-solid-svg-icons';



function Favourites() {
  let genresIds = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comdey",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fanstasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9848: "Mystery",
    10749: "Romance",
    878: "Sci-fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const [currentGenres, setCurrentGenres] = useState("All Genres");
  const [favourites, setfavourites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState(0);
  const [popularity, setPopularity] = useState(0);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  //for getting movies
  useEffect(() => {
    let oldFav = localStorage.getItem("imdb") || "[]";
    oldFav = JSON.parse(oldFav);
    setfavourites([...oldFav]);
  }, []);

  //getting genres to build blue gray button
  useEffect(() => {
    let temp = favourites.map((m) => genresIds[m.genre_ids[0]]);
    temp = new Set(temp);
    setGenres(["All Genres", ...temp]);
  }, [favourites]);

  function del(movie) {
    let newArray = favourites.filter((m) => m.id != movie.id);
    setfavourites([...newArray]);
    localStorage.setItem("imdb", JSON.stringify(newArray));
  }

  let filteredMovies = [];
  filteredMovies =
    currentGenres == "All Genres"
      ? favourites
      : favourites.filter((m) => genresIds[m.genre_ids[0]] == currentGenres);

  //sorting Rating
  if(rating == 1){
    filteredMovies = filteredMovies.sort(function(objA, objB){
      return objA.vote_average - objB.vote_average;
    })
  }else if(rating == -1){
    filteredMovies = filteredMovies.sort(function(objA, objB){
      return objB.vote_average - objA.vote_average;
    })
  }

  // Sorting Popularity
  if(popularity == 1){
    filteredMovies = filteredMovies.sort(function(objA, objB){
      return objA.popularity - objB.popularity;
    })
  }else if(popularity == -1){
    filteredMovies = filteredMovies.sort(function(objA, objB){
      return objB.popularity - objA.popularity;
    })
  }

  // Searching
  filteredMovies = filteredMovies.filter((m)=> m.title.toLowerCase().includes(search.toLowerCase()));
  
  // Pagination
  if(rows <= 0){
    setRows(1);
  }
  let maxPage = Math.ceil(filteredMovies.length/rows);
  let si = (currentPage - 1) * rows;
  let ei = Number(si) + Number(rows);
  filteredMovies = filteredMovies.slice(si, ei);

  let goBack = () =>{
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }

  let goNext = () => {
    if(currentPage < maxPage){
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <>
      <div className="flex justify-center mt-4">
        {genres.map((g) => (
          <button
            className={
              currentGenres == g
                ? "p-2 text-white text-xl bg-blue-400 rounded-xl m-4"
                : "p-2 text-white text-xl hover:bg-blue-400 bg-gray-400 rounded-xl m-4"
            }
            onClick={() =>{ 
              setCurrentPage(1);
              setCurrentGenres(g) 
            }}
          >
            {" "}
            {g}
          </button>
        ))}
      </div>

      <div className="text-center">
        <input
          type="text"
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
          placeholder="Search"
          className="border border-gray-400 rounded text-center p-1 m-2"
        />

        <input
          type="number"
          placeholder="Row"
          value={rows}
          onChange={(e)=> setRows(e.target.value)}
          className="border border-gray-400 rounded text-center p-1 m-2"
        />
      </div>

      <div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-medium text-gray-500 uppercase tracking-wider "
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-medium text-gray-500 uppercase tracking-wider "
                      >
                        <div className="flex space-x-2">
                        <div> <FontAwesomeIcon icon={faArrowUp} onClick={()=>{
                          
                          setPopularity(0);
                          setRating(-1)
                          
                          }} className=" bg-green-400" /> </div>
                        <div>Rating</div>
                        <div> <FontAwesomeIcon icon={faArrowDown} onClick={()=>{
                          
                          setPopularity(0);
                          setRating(1)
                          
                          }} className=" bg-red-400"/></div>
                        </div>
                        
                     
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-medium text-gray-500 uppercase tracking-wider "
                      >
                        <div className="flex space-x-2 ">
                        <div><FontAwesomeIcon icon={faArrowUp} onClick={()=>{
                          setPopularity(-1)
                          setRating(0);
                          
                          }} className="bg-green-400" /></div>
                        <div>Popularity</div>
                        <div><FontAwesomeIcon icon={faArrowDown}  onClick={()=>{
                          setPopularity(1);
                          setRating(0);

                          }} className="bg-red-400"/></div>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Genres
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-medium text-gray-500 uppercase tracking-wider "
                      >
                        Remove
                      </th>

                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMovies.map((f) => (
                      <tr key={f.id}>
                        <td className="m-2 px-6 py-4 whitespace-nowrap flex ">
                          <div className="flex-shrink-0 h-12 w-10 ">
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${f.poster_path}`}
                            />
                          </div>

                          <div className=" font-mono text-sm text-gray-900 m-2">
                            {f.title}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {f.vote_average}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {f.popularity}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-600 text-white">
                            Action
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                          <div
                            onClick={() => del(f)}
                            className="cursor-pointer hover:underline text-red-600 hover:text-indigo-900"
                          >
                            Delete
                          </div>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Pagination pageNumber={currentPage} goNext={goNext} goPrev={goBack}/>
      </div>
    </>
  );
}

export default Favourites;
