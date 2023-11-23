import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaTimes, FaAngleDoubleDown } from "react-icons/fa";
import "./header.css";

function Header({ searchQuery, setSearchQuery, fetchResults, setQuery }) {
  const [searching, setSearching] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [displayNav, setDisplayNav] = useState(false);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults();
  };
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const headerStyles = {
    height: displayNav ? "100%" : "75px",
  };

  return (
    <div className="header-section">
      <header style={headerStyles}>
        <Link to="/">
          <div className="header-logo">
            <img src="https://i.imgur.com/8H5AFaR.png" alt="" />
            <h1>
              RMD<small>b</small>
            </h1>
            <div className="header-logo-box"></div>
          </div>
        </Link>
        <nav></nav>
        {screenWidth < 700 && (
          <button onClick={() => setDisplayNav((state) => !state)}>
            <FaAngleDoubleDown />
          </button>
        )}
        <Link to="/movies">Movies</Link>
        <Link to="/tvshows">TV Shows</Link>
        <button onClick={() => setSearching((state) => !state)}>
          {!searching ? <FaSearch /> : <FaTimes />}
        </button>
      </header>
      {searching && (
        <form className="search-bar" onSubmit={handleSubmit}>
          <span>
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="search movie or tv show"
            onChange={handleChange}
            value={searchQuery}
          />
          {searchQuery.length > 1 && (
            <span onClick={() => setSearchQuery("")}>
              <FaTimes />
            </span>
          )}
        </form>
      )}
    </div>
  );
}

export default Header;
