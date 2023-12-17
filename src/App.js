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

const query = 'interstellar';
const key = 'f84fc31d';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${query}`);
        if (!res.ok) {
          throw new Error('Something went wrong with fetching movies');
        }
        const data = await res.json();
        setMovies(data.Search);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          {/* {isLoading ? <p className="loader">Loading...</p> : <MovieList movies={movies} />} */}
          {isLoading && <p className="loader">Loading...</p>}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </ListBox>
        <ListBox>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </ListBox>
      </Main>
    </>
  );
}
