import React, { useState } from 'react';
import WatchedSummary from './WatchedSummary';
import WatchedList from './WatchedList';

const WatchedBox = ({ tempWatchedData }) => {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <>
      <div className="box">
        <button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)}>
          {isOpen2 ? '–' : '+'}
        </button>
        <WatchedSummary watched={tempWatchedData} />
        {isOpen2 && <WatchedList watched={tempWatchedData} />}
      </div>
    </>
  );
};

export default WatchedBox;
