/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../HomePageStyles.css";
import MovieElement from "./MovieElement";

export type Movie = {
  id: number;
  original_language: string;
  poster_path: string;
  popularity: number;
  release_date: string;
  title: string;
  genre_ids: number[];
};

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmUwOTIzNzI1OGI2ODNjZDU0MjA0OTM3ODRlMzk1ZSIsIm5iZiI6MTcyMDcxNzM0NS42MzIzMTQsInN1YiI6IjY2OTAwZTliZTZkYjllY2U5M2ZmNTZmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvmi25WTzRGb7Pv7xKyigTwovUuCwwKlYA7eVrqKHTA",
      },
    };
    const fetchData = async () => {
      const url = "https://api.themoviedb.org/3/trending/movie/day";

      try {
        const response = await axios.get(url, options);
        setMovies(response.data.results);
      } catch (error) {
        console.log("error :>> ", error);
      }
    };

    fetchData();
  }, []);

  //   const display = () => {
  //     console.log("genres :>> ", genres);
  //     return null;
  //   };

  return (
    <>
      <div>
        {/* {display()} */}
        <h2 className="page-header">WELCOME!</h2>
        <p className="paragraph-title">Todays specials</p>
        <ul className="movies-list">
          {movies.map((movie) => (
            <li className="movie-li" key={movie.id}>
              <MovieElement movie={movie}></MovieElement>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HomePage;
