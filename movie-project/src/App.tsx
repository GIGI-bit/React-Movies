/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./components/HomePage";
import { Link, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import MoviesPage from "./components/MoviesPage";
import MovieCast from "./components/MovieCast";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav className="movies-nav">
        <ul className="movies-ul">
          <li className="movies-li">
            <Link className="movies-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="movies-link" to="/movies">
              Movies
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route path="/movies/:movieId/cast" element={<MovieCast />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
