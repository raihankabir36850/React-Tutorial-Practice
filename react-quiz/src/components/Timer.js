import React, { useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContext';

export default function Timer() {
  const { remainingSeconds, dispatch } = useQuiz();
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
