import "./searchResult.css";
import MovieItem from "../../movieItem/MovieItem";
import Loader from "../Loader/Loader";

function SearchResult({ loading, movieResult, tvShowResults, setCategory }) {
  return (
    <section className="search-result-container">
      {!loading ? (
        <>
          <h1>Movies</h1>
          {movieResult.length > 1 ? (
            <div className="container">
              {movieResult.map((item) => (
                <MovieItem
                  key={item.id}
                  item={item}
                  setCategory={setCategory}
                />
              ))}
            </div>
          ) : (
            <Loader />
          )}
          <h1>TV Shows</h1>
          {tvShowResults.length > 1 ? (
            <div className="container">
              {tvShowResults.map((item) => (
                <MovieItem
                  key={item.id}
                  item={item}
                  setCategory={setCategory}
                />
              ))}
            </div>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default SearchResult;
