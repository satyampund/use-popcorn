import React, { useEffect, useRef } from 'react';
import { useKey } from './useKey';

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  //Note = inputEl.current = classname

  useKey('Enter', function () {
    if (document.activeElement === inputEl.current) {
      return;
    }
    inputEl.current.focus();
    setQuery('');
  });
  // useEffect(() => {
  //   function callBack(e) {
  //     if (document.activeElement === inputEl.current) {
  //       return;
  //     }
  //     if (e.code === 'Enter') {
  //       inputEl.current.focus();
  //       setQuery('');
  //     }
  //   }
  //   document.addEventListener('keydown', callBack);
  //   return () => document.addEventListener('keydown', callBack);
  // }, [setQuery]);

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </>
  );
};

export default Search;
