import { useRef, useEffect } from 'react';

export default function SearchBar({ searchQueryHandler }) {
  const inputEl = useRef(null);
  useEffect(function () {
    inputEl.current.focus();
  }, []);
  return <input type='text' className='search' placeholder='Search movies...' onChange={searchQueryHandler} ref={inputEl} />;
}
