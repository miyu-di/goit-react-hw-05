import { useEffect, useState } from "react";
import { getTrending } from "../movie-api";
import MovieList from "../components/MovieList/MovieList";

export default function HomePage() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getTrending();
        setResponse(data);
      } catch {}
    }
    getData();
  }, []);
  return (
    <div>
      <h1>Trending today</h1>
      {<MovieList movies={response} />}
    </div>
  );
}
