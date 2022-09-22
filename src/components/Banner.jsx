import React, { useState, useEffect } from "react";
import axios from "axios";

function Banner() {
  let [movies, setMovies] = useState([]);

  useEffect(function () {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=d6176f1b4953a856712c5310b1549b70&page=1"
      )
      .then((res) => {
        console.table(res.data.results);
        setMovies(res.data.results[0]);
      });
  }, []);

  return (
    <>
      <div
        className={`bg-[url(https://image.tmdb.org/t/p/w500/${movies.backdrop_path})] h-[40vh] md:h-[60vh] bg-center bg-cover flex items-end justify-center`}
      >
        <div className="font-mono text:xl md:text-3xl text-white bg-gray-900 w-full bg-opacity-50 flex justify-center p-6">
          {movies.title}
        </div>
      </div>
    </>
  );
}

export default Banner;
