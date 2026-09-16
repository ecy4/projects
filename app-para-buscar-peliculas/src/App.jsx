
import './App.css'
import responseMovies from './mocks/wiith-resilts.json'
import withouResults from './mocks/no-results.json'
import { useEffect, useState } from 'react'
import axios from "axios"

const ApiKey = import.meta.env.VITE_APIKEY;
const URL= import.meta.env.VITE_URL

function App() {
const [peliculas, setPeliculas] = useState([]);
  const [search, setSearch] = useState('Avengers');

  // Función para consumir la API
  const fetchMovies = async (query) => {
    if (!query) return;

    try {
      // 2. Pasamos 'apikey' y el texto 's' como parámetros de Axios
      const response = await axios.get(URL, {
        params: {
          apikey: ApiKey, // Axios se encarga de formatear ?apikey=...
          s: query
        }
      });

      // 3. OMDb responde con los datos dentro de .data
      if (response.data.Response === 'True') {
        const mappedMovies = response.data.Search.map(movie => ({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
          type: movie.Type
        }));
        setPeliculas(mappedMovies);
      } else {
        setPeliculas([]);
      }
    } catch (error) {
      console.error("Error al consultar la API:", error);
      setPeliculas([]);
    }
  };

  useEffect(() => {
    fetchMovies(search);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies(search);
  };
  console.log(peliculas)
  const hasMovies = peliculas.length > 0;



  return (
    <div>

      <header className='page'>
        <h1>Buscador de peliculas</h1>
        <form onSubmit={handleSubmit} className='form'>
          
          <input onChange={e => setSearch(e.target.value)} placeholder='Avengers, Star Wars, The Matrix ...' />
          <button type='submit'>Buscar</button>
        </form>  
      </header>


   <main>
  {hasMovies ? (
    <ul className="movies">
      {peliculas.map(movie => (
        <li key={movie.id}>
          {/* 1. Muestra la imagen si existe, o un placeholder si OMDb manda "N/A" */}
          {movie.poster !== 'N/A' ? (
            <img src={movie.poster} alt={movie.title} />
          ) : (
            <div className="no-poster">
              <span>Sin Póster</span>
            </div>
          )}

          {/* 2. Un solo título debajo de la imagen */}
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <p>{movie.type}</p>
        </li>
      ))}         
    </ul>
  ) : (
    <p>No se encontraron resultados</p>
  )}
</main>
          
     


    </div>
    
  )
}

export default App
