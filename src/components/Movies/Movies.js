import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieItem from "../movieItem/MovieItem";
import "../globalStyles.css";
import { getSearchResults } from "../../API";
import { FaVideo } from "react-icons/fa";

function Movies({ setCategory }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = "https://api.themoviedb.org/3/";
  const API_KEY = "661d6efc9ba578510a8200856b677f04";
  const trendingMovieUrl = `${API_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`;
  const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const topRatedMovieUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
  const upcomingMovieUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=10`;

  useEffect(() => {
    getSearchResults(setLoading, trendingMovieUrl, setMovies);
  }, [trendingMovieUrl]);

  return (
    <section className="movie-container">
      <header>
        <Link to="/">
          <div className="header-logo">
            <img src="https://i.imgur.com/8H5AFaR.png" alt="" />
            <h1>
              RMD<small>b</small>
            </h1>
            <div className="header-logo-box"></div>
          </div>
        </Link>
        <nav>
          <button
            onClick={() =>
              getSearchResults(setLoading, trendingMovieUrl, setMovies)
            }
          >
            Trending
          </button>
          <button
            onClick={() =>
              getSearchResults(setLoading, popularMovieUrl, setMovies)
            }
          >
            Popular
          </button>
          <button
            onClick={() =>
              getSearchResults(setLoading, topRatedMovieUrl, setMovies)
            }
          >
            Top Rated
          </button>
          <button
            onClick={() =>
              getSearchResults(setLoading, upcomingMovieUrl, setMovies)
            }
          >
            Upcoming
          </button>
        </nav>
      </header>
      <main>
        {!loading ? (
          <>
            <h1>MOVIES</h1>
            <div className="movie-container">
              {movies.map((item) => (
                <MovieItem
                  item={item}
                  key={item.id}
                  setCategory={setCategory}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="loader">
              <FaVideo />
            </div>
          </>
        )}
      </main>
    </section>
  );
}

export default Movies;
