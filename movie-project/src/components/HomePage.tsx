/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../HomePageStyles.css";

export type Movie = {
  id: number;
  original_language: string;
  poster_path: string;
  popularity: number;
  release_date: string;
  title: string;
  genre_ids: number[];
};

export type Genre = {
  id: number;
  name: string;
};

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

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

    const fetchLink = async () => {
      const url = "https://api.themoviedb.org/3/genre/movie/list";

      try {
        const response = await axios.get(url, options);
        setGenres(response.data.genres);
        console.log("response :>> ", response);
      } catch (error) {
        console.log("error :>> ", error);
      }
    };

    fetchData();
    fetchLink();
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
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
              />
              <p className="movie-title">{movie.title}</p>
              <div className="languale-release-div">
                <p>{movie.original_language}</p>
                <p className="release-date">
                  <span className="release-date-text">release date: </span>
                  {movie.release_date}
                </p>
              </div>
              <div className="genre-popularity-div">
                <ul className="genres-list">
                  {movie.genre_ids.map((genreId) => {
                    const genre = genres.find((g) => g.id === genreId);
                    return genre ? (
                      <li key={genre.id}>
                        <p>{genre.name}</p>
                      </li>
                    ) : null;
                  })}
                </ul>
                <p className="popularity">
                  <span className="popularity-text">popularity: </span>
                  {movie.popularity}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HomePage;
