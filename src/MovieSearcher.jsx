import { useState } from "react"

export const MovieSearcher = () => {

  const urlBase = 'https://api.themoviedb.org/3/search/movie'
  const API_KEY = 'cb16c4d5dc46bfdfac1655a1eb0b82f3'

  const [busqueda, setBusqueda] = useState('')
  const [peliculas, setPeliculas] = useState([])

  const handleInputChange = (e) => {
    setBusqueda(e.target.value)
  }
  const handleSubmite = (e) => {
    e.preventDefault()
    fetchPelicula()
  }
  const fetchPelicula = async () => {
    try {
      const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`)
      const data = await response.json()
      setPeliculas(data.results)
    } catch (error) {
      console.error('Ha ocurrido un error: ', error)
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de peliculas</h1>
      <form onSubmit={handleSubmite}>
        <input
          type="text"
          placeholder="Escribí una Película"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
      <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${pelicula.backdrop_path}`} alt={pelicula.title} />
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
