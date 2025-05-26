import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'c833fdf0';

const MovieApp = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  const handleSearch = async () => {
    if (search.trim() === '') return;
    const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
    if (res.data.Search) setMovies(res.data.Search);
    else setMovies([]);
  };

  const addToFavorites = (movie) => {
    const updated = [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const removeFromFavorites = (id) => {
    const updated = favorites.filter((m) => m.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (id) => favorites.some((m) => m.imdbID === id);

  return (
    <div style={{ padding: '20px' }}>
      <h1>🎬 Movie Search App</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <h2>Search Results</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={movie.Poster} alt={movie.Title} height="200" />
            <h3>{movie.Title}</h3>
            <button
              onClick={() =>
                isFavorite(movie.imdbID)
                  ? removeFromFavorites(movie.imdbID)
                  : addToFavorites(movie)
              }
            >
              {isFavorite(movie.imdbID) ? 'Remove Favorite' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </div>

      <h2>⭐ Favorite Movies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {favorites.map((movie) => (
          <div key={movie.imdbID} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={movie.Poster} alt={movie.Title} height="200" />
            <h3>{movie.Title}</h3>
            <button onClick={() => removeFromFavorites(movie.imdbID)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieApp;
