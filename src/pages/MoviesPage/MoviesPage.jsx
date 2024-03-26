import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovieByQuery } from "../../movie-api";
import css from "./MoviesPage.module.css"
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [params, setParams] = useSearchParams();
  const query = params.get("query") ?? "";

  const handleChanges = (newChanges) => {
    params.set("query", newChanges);
    setParams(params);
  };

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(false);
        const data = await getMovieByQuery(query);
        setResponse(data);
      } catch (error) {
        setIsLoading(false);
        setError(true)
      }
    }
    getData();
  }, [query]);

  return (
    <>
      <form>
        <input
          className={css.input}
          type="text"
          name="query"
          value={query}
          onChange={(e) => handleChanges(e.target.value)}
          required
        />
        <button className={css.btn}>Search</button>
      </form>
      {error ? <p>Something went wrong!</p> : <MovieList movies={response} />}
    </>
  );
}
