import React, { useEffect } from 'react';

export default function Timer({ remainingSeconds, dispatch }) {
  const mins = Math.floor(remainingSeconds / 60);
  const sec = remainingSeconds % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'timer' });
    }, 1000);
    return () => {
      return clearInterval(id);
    };
  }, [dispatch]);
  return (
    <div className='timer'>
      {mins < 10 && '0'}
      {mins}:{sec < 10 && '0'}
      {sec}
    </div>
  );
}
