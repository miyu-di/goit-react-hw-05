import { useEffect, useState } from "react";
import { getCredits } from "../../movie-api";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getCredits(movieId);
        setResponse(data);
      } catch (error) {}
    }
    getData();
  }, [movieId]);

  return (
    <div>
      {response.length > 0 ? (
        <ul>
        {response.map((cast) => (
          <li key={cast.id} className={css.info}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
              />
            </div>
            <div className={css.details}>
              <p>{cast.name}</p>
              <p>Character: {cast.character}</p>
            </div>
          </li>
        ))}
      </ul>
      ) : (<p>Unfortunately, we don't have any information about cast</p>)}
    </div>
  );
}
