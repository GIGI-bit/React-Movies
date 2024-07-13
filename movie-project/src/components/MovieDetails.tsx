// MovieDetailsPage.js
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Movie } from "./HomePage";
import MovieElement from "./MovieElement";
import MovieCast from "./MovieCast";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const fetchMovie = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;

      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmUwOTIzNzI1OGI2ODNjZDU0MjA0OTM3ODRlMzk1ZSIsIm5iZiI6MTcyMDcxNzM0NS42MzIzMTQsInN1YiI6IjY2OTAwZTliZTZkYjllY2U5M2ZmNTZmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvmi25WTzRGb7Pv7xKyigTwovUuCwwKlYA7eVrqKHTA",
        },
      };
      const response = await axios.get(url, options);
      setMovie(response.data);
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <MovieElement movie={movie} />
      <Link to={`/movies/${movie.id}`}>
        <MovieCast />
      </Link>
    </div>
  );
};

export default MovieDetailsPage;
