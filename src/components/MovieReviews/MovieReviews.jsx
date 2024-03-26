import { useParams } from "react-router-dom";
import { getReviews } from "../../movie-api";
import { useEffect, useState } from "react";
import css from "./MovieReviews.module.css"

export default function MovieReviews() {
  const { movieId } = useParams();
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getReviews(movieId);
        setResponse(data);
      } catch (error) {}
    }
    getData();
  }, [movieId]);

  return (
    <div>
      {response.length > 0 ? (
        <ul>
          {response.map((results) => (
            <li key={results.id} className={css.li}>
              <h3 className={css.author}>Author: {results.author}</h3>
              <p className={css.review}>{results.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Unfortunately, we don't have any reviews for that movie.</p>
      )}
    </div>
  );
}

