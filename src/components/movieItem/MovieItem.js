import "./movieItem.css";
import { Link } from "react-router-dom";

function SearchResult({ item, setCategory }) {
  function determineCategory() {
    if (item.title) {
      setCategory("movie");
    } else {
      setCategory("tv");
    }
  }

  return (
    <Link to={`/${item.id}`}>
      <div className="movie-item" onClick={determineCategory}>
        <img
          src={
            item.poster_path && !item.poster_path.includes("null")
              ? `http://image.tmdb.org/t/p/original${item.poster_path}`
              : "https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg"
          }
          alt=""
        />

        <p>
          {item.title || item.name ? (
            <span>{item.title ? item.title : item.name}</span>
          ) : null}{" "}
          (
          {item.release_date || item.first_air_date ? (
            <small>
              {item.release_date
                ? item.release_date.substring(0, 4)
                : item.first_air_date.substring(0, 4)}
            </small>
          ) : null}
          )
        </p>
      </div>
    </Link>
  );
}

export default SearchResult;
