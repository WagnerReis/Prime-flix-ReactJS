import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favorites.css';

export default function Favorites() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem('@primeflix')) || []);
  }, [])

  return (
    <div className='my-movies'>
      <h1>Meus filmes</h1>

      <ul>
        {movies.map((item) => {
          return(
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                <button>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}