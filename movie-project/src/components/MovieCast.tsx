import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// export type Actor = {};

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmUwOTIzNzI1OGI2ODNjZDU0MjA0OTM3ODRlMzk1ZSIsIm5iZiI6MTcyMDcxNzM0NS42MzIzMTQsInN1YiI6IjY2OTAwZTliZTZkYjllY2U5M2ZmNTZmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvmi25WTzRGb7Pv7xKyigTwovUuCwwKlYA7eVrqKHTA",
        },
      };

      try {
        const response = await axios.get(url, options);
        setCast(response.data.cast);
        console.log("response :>> ", response);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {/* {cast.map((actor) => (
          <li key={actor.cast_id}>
            <p>
              {actor.name} as {actor.character}
            </p>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default MovieCast;
