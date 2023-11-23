import { useState, useEffect } from "react";
import React from "react";
import Header from "./header/Header";
import Hero from "./hero/Hero";
import SearchResult from "./searchResults/SearchResult";
import { getSearchResults } from "../../API";

function HomePage({ category, setCategory }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [heroSearchQuery, setHeroSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [movieResult, setMovieResults] = useState([]);
  const [tvShowResults, setTvShowResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = "https://api.themoviedb.org/3/";
  const API_KEY = "661d6efc9ba578510a8200856b677f04";
  const movieSearchUrl = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}`;
  const tvShowSearchUrl = `${API_URL}search/tv?api_key=${API_KEY}&language=en-US&query=${query}`;
  const trendingMoviesUrl = `${API_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`;
  const trendingTvShowsUrl = `${API_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`;

  const fetchResults = () => {
    getSearchResults(setLoading, movieSearchUrl, setMovieResults);
    getSearchResults(setLoading, tvShowSearchUrl, setTvShowResults);
  };
  useEffect(() => {
    getSearchResults(setLoading, trendingMoviesUrl, setMovieResults);
    getSearchResults(setLoading, trendingTvShowsUrl, setTvShowResults);
  }, [trendingMoviesUrl, trendingTvShowsUrl]);

  return (
    <section className="home">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fetchResults={fetchResults}
        setQuery={setQuery}
      />
      <Hero
        setHeroSearchQuery={setHeroSearchQuery}
        heroSearchQuery={heroSearchQuery}
        setQuery={setQuery}
        fetchResults={fetchResults}
      />
      <SearchResult
        loading={loading}
        movieResult={movieResult}
        tvShowResults={tvShowResults}
        category={category}
        setCategory={setCategory}
      />
    </section>
  );
}

export default HomePage;
