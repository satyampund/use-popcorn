import { useEffect, useState } from 'react';
import NavBar from './componets/NavBar';
import Main from './componets/Main';
import ListBox from './componets/ListBox';
import MovieList from './componets/MovieList';
import WatchedSummary from './componets/WatchedSummary';
import WatchedList from './componets/WatchedList';
import Search from './componets/Search';
import NumResults from './componets/NumResults';
import ErrorMessage from './componets/ErrorMessage';
import MovieDetails from './componets/MovieDetails';

const tempQuery = 'interstellar';
const key = 'd8be5300';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('god');
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = (id) => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${query}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error('Something went wrong with fetching movies');
        }
        const data = await res.json();
        console.log(data.Search);
        if (!data.Search) {
          throw new Error('Movie not found');
        }
        setMovies(data.Search);
        setError('');
      } catch (err) {
        // console.error(err.message);
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          {/* {isLoading ? <p className="loader">Loading...</p> : <MovieList movies={movies} />} */}
          {isLoading && <p className="loader">Loading...</p>}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </ListBox>
        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
