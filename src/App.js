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
import { useMovies } from './componets/useMovies';
import { useLocalStorageState } from './componets/useLocalStorageState';

const tempQuery = 'interstellar';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], 'watched');

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  //used this instead of arrow so I can use it above it.
  function handleCloseMovie(id) {
    setSelectedId(null);
  }

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

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
