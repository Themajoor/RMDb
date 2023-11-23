import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../globalStyles.css";
import { getDetails, getCasts } from "../../API";
import { FaVideo, FaAngleDoubleDown } from "react-icons/fa";

function Details({ category }) {
  const id = useParams();
  const [details, setDetails] = useState([]);
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayNav, setDisplayNav] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const API_URL = "https://api.themoviedb.org/3/";
  const API_KEY = "661d6efc9ba578510a8200856b677f04";
  const detailsUrl = `${API_URL}${category}/${id.id}?api_key=${API_KEY}&language=en-US`;
  const movieCasts = `${API_URL}${category}/${id.id}/credits?api_key=${API_KEY}&language=en-US`;

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    getDetails(setLoading, detailsUrl, setDetails);
    getCasts(setLoading, movieCasts, setCasts);
  }, [detailsUrl, movieCasts]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const styles = {
    background: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.52),
      rgba(0, 0, 0, 0.73)
    ),
    url(http://image.tmdb.org/t/p/original${details.backdrop_path}) center / cover no-repeat`,
  };
  const headerStyles = {
    height: displayNav ? "100%" : "75px",
  };
  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} minutes`;
    }

    if (remainingMinutes === 0) {
      return `${hours} hours`;
    }

    return `${hours} hours and ${remainingMinutes} minutes`;
  };

  return (
    <section className="details">
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
        {screenWidth < 700 && (
          <button onClick={() => setDisplayNav((state) => !state)}>
            <FaAngleDoubleDown />
          </button>
        )}
        <nav>
          <Link to="/movies">Movies</Link>
          <Link to="/tvshows">TV Shows</Link>
        </nav>
      </header>
      {!loading ? (
        <>
          <section className="details-section" style={styles}>
            <div className="movie-details">
              <img
                src={
                  details.poster_path && !details.poster_path.includes("null")
                    ? `http://image.tmdb.org/t/p/original${details.poster_path}`
                    : "https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg"
                }
                alt=""
              />
              <div className="details-text">
                {(details.title || details.name) && (
                  <h1>
                    {details.title || details.name ? (
                      <span>
                        {details.title ? details.title : details.name}
                      </span>
                    ) : null}{" "}
                    (
                    {details.release_date || details.first_air_date ? (
                      <small>
                        {details.release_date
                          ? details.release_date.substring(0, 4)
                          : details.first_air_date.substring(0, 4)}
                      </small>
                    ) : null}
                    )
                  </h1>
                )}
                {details.tagline && <small>'{details.tagline}'</small>}
                {details.overview && (
                  <>
                    <h2>Plot: </h2>
                    <p>{details.overview}</p>
                  </>
                )}
                <div className="details-miscellenous">
                  {details.status && (
                    <p>
                      <b>Status: </b>
                      {details.status}
                    </p>
                  )}
                  {details.budget && (
                    <p>
                      <b>Budget: $</b>
                      {details.budget.toLocaleString()}
                    </p>
                  )}
                  {details.revenue && (
                    <p>
                      <b>Box Office: $</b>
                      {details.revenue.toLocaleString()}
                    </p>
                  )}
                  {details.runtime && (
                    <p>
                      <b>Runtime: </b>
                      {convertMinutesToHours(details.runtime)}
                    </p>
                  )}
                  {details.vote_average && (
                    <p>
                      <b>Rating: </b>
                      {details.vote_average}
                    </p>
                  )}
                  {details.number_of_seasons && (
                    <p>
                      <b>Number of seasons: </b>
                      {details.number_of_seasons}
                    </p>
                  )}
                  {details.genres && (
                    <p>
                      <b>Genres: </b>
                      {details.genres.map((item, index) => (
                        <span key={index}>{item.name}, </span>
                      ))}
                    </p>
                  )}
                  {details.networks && (
                    <p>
                      <b>Networks: </b>
                      {details.networks.map((item) => (
                        <span>{item.name}, </span>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
          {casts.length > 1 && (
            <section className="casts-section">
              <h1>Casts</h1>
              <div className="casts">
                {casts.map((cast) => (
                  <div key={cast.id} className="cast-profile-card">
                    <img
                      src={
                        cast.profile_path
                          ? `http://image.tmdb.org/t/p/original${cast.profile_path}`
                          : "https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg"
                      }
                      alt=""
                    />

                    <p>{cast.name}</p>
                    <small>{cast.character}</small>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="loader">
          <FaVideo />
        </div>
      )}
    </section>
  );
}

export default Details;
