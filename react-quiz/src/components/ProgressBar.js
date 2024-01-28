import React from 'react';
import { useQuiz } from '../contexts/QuizContext';

export default function ProgressBar() {
  const { questionsSet, index, points, answer } = useQuiz();
  const totalPoints = [...questionsSet].reduce((accumulater, currentValue) => accumulater + currentValue.points, 0);
  return (
    <header className='progress'>
      <progress max={questionsSet.length} value={answer !== null ? index + 1 : index}></progress>
      <p>
        Question <strong>{index + 1}</strong> / {questionsSet.length}
      </p>
      <p>
        <strong>{points}</strong> /{totalPoints}
      </p>
    </header>
  );
}
