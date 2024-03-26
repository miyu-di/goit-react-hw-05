import { Suspense, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { getMovieDetailsById } from "../../movie-api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(false)
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function getData() {
      try {
        const data = await getMovieDetailsById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true)
      }
    }
    getData();
  }, [movieId]);
  return (
    <>
      {error && (
        <p>Oops! Something went wrong. Please, try to reload the pade</p>
      )}
      <NavLink to={backLinkRef.current}>Go back</NavLink>
      {movie && (
        <div>
          <div className={css.container}>
            <div className={css.img}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              />
            </div>
            <div className={css.details}>
              <h2>{movie.title}</h2>
              <p>User Score: {parseInt(movie.vote_average * 10)}%</p>
              <h3 className={css.header}>Overview</h3>
              <p>{movie.overview}</p>
              <h3 className={css.header}>Genres</h3>
              {movie.genres && movie.genres.length > 0 ? (
                <ul className={css.genres}>
                  {movie.genres.map((genre) => (
                    <li key={genre.id} className={css.genre}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No info</div>
              )}
            </div>
          </div>

          <hr className={css.decor} />

          <div>
            <h3 className={css.header}>Additional information</h3>
            <ul>
              <li>
                <NavLink to={`cast`}>Cast</NavLink>
              </li>
              <li>
                <NavLink to={`reviews`}>Reviews</NavLink>
              </li>
            </ul>
          </div>

          <hr className={css.decor} />

          <Suspense fallback={<div>LOADING...</div>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
}
