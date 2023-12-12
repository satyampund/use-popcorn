import React from 'react';
import ListBox from './ListBox';
import WatchedBox from './WatchedBox';

const Main = ({ tempMovieData, tempWatchedData }) => {
  return (
    <>
      <main className="main">
        <ListBox tempMovieData={tempMovieData} />
        <WatchedBox tempWatchedData={tempWatchedData} />
      </main>
    </>
  );
};

export default Main;
