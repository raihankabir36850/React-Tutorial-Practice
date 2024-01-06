import React from 'react';

export default function ProgressBar({ questionsSet, index, points }) {
  const totalPoints = [...questionsSet].reduce((accumulater, currentValue) => accumulater + currentValue.points, 0);
  return (
    <header className='progress'>
      <progress max={questionsSet.length} value={index}></progress>
      <p>
        Question <strong>{index + 1}</strong> / {questionsSet.length}
      </p>
      <p>
        <strong>{points}</strong> /{totalPoints}
      </p>
    </header>
  );
}
