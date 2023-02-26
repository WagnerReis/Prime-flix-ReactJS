import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import api from "../../services/api";
import './movie-info.css';

export default function Movie() {
  const { id } = useParams();

  const [movie, setMovie] = useState([localStorage.getItem("movie")]);
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
          localStorage.setItem("movie", response.data);
        })
        .catch(() => {
          console.log("FILME NAO ENCONTRADO");
        });
    }

    loadMovies();

    return () => {
      console.log("componente desmontado")
    }
  }, []);

  if(loading) {
    return(
      <div className="movie-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  const movieFormated = JSON.parse(JSON.stringify(movie));

  return (
    <div className="movie-info">
      <h1>{movieFormated.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movieFormated.backdrop_path}`} alt={movieFormated.title} />

      <h3>Sinopse</h3>
      <span>{movieFormated.overview}</span>

      <strong>Avaliação: {parseFloat(movieFormated.vote_average.toFixed(1))} /10</strong>

      <div className="area-buttons">
        <button>Salvar</button>
        <button>
          <a href="#">
            Trailer 
          </a>
        </button>
      </div>

    </div>
  );
}
