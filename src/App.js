import { useEffect, useState } from 'react';
import NavBar from './componets/NavBar';
import Main from './componets/Main';
import ListBox from './componets/ListBox';
import MovieList from './componets/MovieList';
import WatchedSummary from './componets/WatchedSummary';
import WatchedList from './componets/WatchedList';
import Search from './componets/Search';
import NumResults from './componets/NumResults';

const query = 'interstellar';
const key = 'f84fc31d';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${query}`);
      const data = await res.json();
      setMovies(data.Search);
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
          <MovieList movies={movies} />
        </ListBox>
        <ListBox>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </ListBox>
      </Main>
    </>
  );
}
