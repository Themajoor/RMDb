import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieItem from "../movieItem/MovieItem";
import "../globalStyles.css";
import { getSearchResults } from "../../API";
import { FaVideo } from "react-icons/fa";

function TvShows({ setCategory }) {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = "https://api.themoviedb.org/3/";
  const API_KEY = "661d6efc9ba578510a8200856b677f04";
  const trendingTvShowsUrl = `${API_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`;
  const popularTvShowUrl = `${API_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const topRatedTvShowUrl = `${API_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
  const tvShowAiringTodayUrl = `${API_URL}tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    getSearchResults(setLoading, trendingTvShowsUrl, setTvShows);
  }, [trendingTvShowsUrl]);

  return (
    <section>
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
              getSearchResults(setLoading, trendingTvShowsUrl, setTvShows)
            }
          >
            Trending
          </button>
          <button
            onClick={() =>
              getSearchResults(setLoading, popularTvShowUrl, setTvShows)
            }
          >
            Popular
          </button>
          <button
            onClick={() =>
              getSearchResults(setLoading, topRatedTvShowUrl, setTvShows)
            }
          >
            Top Rated
          </button>
          <button
            onClick={() =>
              getSearchResults(setLoading, tvShowAiringTodayUrl, setTvShows)
            }
          >
            Airing Today
          </button>
        </nav>
      </header>
      <main>
        {!loading ? (
          <>
            <h1>TV SHOWS</h1>
            <div className="movie-container">
              {tvShows.map((item) => (
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

export default TvShows;
