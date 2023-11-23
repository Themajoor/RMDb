import "./hero.css";
import { FaTimes } from "react-icons/fa";

function Hero({ setHeroSearchQuery, heroSearchQuery, fetchResults, setQuery }) {
  const handleChange = (e) => {
    setHeroSearchQuery(e.target.value);
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults();
  };

  return (
    <section className="hero-section">
      <h1>Welcome.</h1>
      <h2>Millions of movies,TV shows and people to discover.Explore Now</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a movie or TV show"
          onChange={handleChange}
          value={heroSearchQuery}
        />
        {heroSearchQuery.length > 1 && (
          <button>
            <FaTimes />
          </button>
        )}
        <button type="submit">Search</button>
      </form>
    </section>
  );
}

export default Hero;
