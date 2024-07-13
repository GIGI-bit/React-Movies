import React, { useState, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Movie } from "./HomePage";
import MovieElement from "./MovieElement";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTrigger, setSearchTrigger] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
      const options = {
        headers: {
          Authorization: "Bearer ",
        },
      };

      try {
        const response = await axios.get(url, options);
        setMovies(response.data.results);
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
    if (searchTrigger) {
      fetchData();
      setSearchTrigger(false);
    }
  }, [searchTrigger, query]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTrigger(true);
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <MovieElement movie={movie} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
