import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import './home.css';

export default function Home() {
  const [movies, setMovies] = useState([localStorage.getItem("movies")]);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "c0a625d769d87639154042a89e28e7ca",
          language: "pt-BR",
          page: 1,
        },
      });

      const result = response.data.results.slice(0, 10);

      setMovies(result);
      localStorage.setItem("movies", result);
    }

    loadMovies();
  }, []);

  return (
    <div className="container">
      <div className="movie-list">
        {JSON.parse(JSON.stringify(movies)).map((movie: { [x: string]: any; }) => {
          return(
            <article key={movie.id}>
              <strong>{movie.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
              <Link to={`/movie/${movie.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  );
}
