import { useState, useEffect } from 'react';

export default function useFetchMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=c2876157&s=${query}`);
        if (!res.ok) throw new Error('something went wrong.');
        const data = await res.json();
        if (data.Response === 'False') throw new Error('⛔️ Movies not found.');
        setMovies(data.Search);
      } catch (error) {
        setMovies([]);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError('');
      setIsLoading(false);

      return;
    }

    fetchMovies();
  }, [query]);

  return { movies, isLoading, error };
}
