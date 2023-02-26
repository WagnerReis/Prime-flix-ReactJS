import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./movie-info.css";

export default function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: "c0a625d769d87639154042a89e28e7ca",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setMovie(response.data);
          setLoading(false);
          localStorage.setItem("movie", JSON.stringify(response.data));
        })
        .catch(() => {
          console.log("FILME NAO ENCONTRADO");
          navigate("/", { replace: true });
          return;
        });
    }

    loadMovies();

    return () => {
      console.log("FILME NÃO ENCONTRADO");
    };
  }, [id, navigate]);

  const movieFormated = JSON.parse(JSON.stringify(movie));

  function saveMovie() {
    const myList = localStorage.getItem("@primeflix");

    let savedMovies = JSON.parse(myList) || [];

    const hasMovie = savedMovies.some(
      (savedMovie: { id: string }) => savedMovie.id === movieFormated.id
    );

    if (hasMovie) {
      alert("ESSE FILME JÁ ESTÁ NA LISTA");
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@primeflix", JSON.stringify(savedMovies));
    alert("FILME SALVO COM SUCESSO!");
  }

  if (loading) {
    return (
      <div className="movie-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="movie-info">
      <h1>{movieFormated.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movieFormated.backdrop_path}`}
        alt={movieFormated.title}
      />

      <h3>Sinopse</h3>
      <span>{movieFormated.overview}</span>

      <strong>
        Avaliação: {parseFloat(movieFormated.vote_average.toFixed(1))} /10
      </strong>

      <div className="area-buttons">
        <button onClick={saveMovie}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external noreferrer"
            href={`https://youtube.com/results?search_query=${movieFormated.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
