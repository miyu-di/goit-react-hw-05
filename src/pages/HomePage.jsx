import { useEffect, useState } from "react";
import { getTrending } from "../movie-api";
import MovieList from "../components/MovieList/MovieList";

export default function HomePage() {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getTrending();
        setResponse(data);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        setError(true);
      }
    }
    getData();
  }, []);
  return (
    <div>
      <h1>Trending today</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrong. Try again!</p>
      ) : (
        <MovieList movies={response} />
      )}
    </div>
  );
}
