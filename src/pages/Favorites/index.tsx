import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favorites.css";

export default function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem("@primeflix")) || []);
  }, []);

  function deleteMovie(id: string) {
    const newMovies = movies.filter((movie) => movie.id !== id);
    setMovies(newMovies);
    localStorage.setItem("@primeflix", JSON.stringify(newMovies));
  }

  return (
    <div className="my-movies">
      <h1>Meus filmes</h1>

      {!movies.length && <span>Você não possui nenhum filme salvo :( </span>}

      <ul>
        {movies.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => deleteMovie(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
