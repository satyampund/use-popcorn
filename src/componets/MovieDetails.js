import React, { useEffect, useRef, useState } from 'react';
import StarRating from './StarRating';

const key = 'd8be5300';
const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) {
      countRef.current++;
    }
  }, [userRating]);

  const isWatched = watched
    .map((movie) => {
      return movie.imdbID;
    })
    .includes(selectedId);

  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime?.split(' ').at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    function callback(e) {
      if (e.code === 'Escape') {
        onCloseMovie();
      }
    }
    document.addEventListener('keydown', callback);

    return function () {
      document.removeEventListener('keydown', callback);
    };
  }, [onCloseMovie]);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = 'usePopcorn';
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <p className="loader">Loading...</p>
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              ⬅️
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
