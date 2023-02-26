import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Home() {
  const [movies, setMovies] = useState([localStorage.getItem("Movies")]);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "c0a625d769d87639154042a89e28e7ca",
          language: "pt-BR",
          page: 1,
        },
      });

      console.log(response.data.results);
    }

    loadMovies();
  }, []);

  return (
    <div>
      <h1>Bem vindo a Home</h1>
    </div>
  );
}
