import React from 'react';

export default function FinishScreen({ points, totalPoints, highestScore, dispatch }) {
  const percentage = (points / totalPoints) * 100;
  return (
    <>
      <div className='result'>
        <p>
          You have scored <strong>{points}</strong> out of{' '}
          <strong>
            {totalPoints} {`(${Math.ceil(percentage)}%)`}
          </strong>
        </p>
      </div>

      {highestScore !== 0 && <p className='highscore'>Highest score is {highestScore} points</p>}
      <button className='btn btn-ui restart-button' onClick={() => dispatch({ type: 'restartQuiz' })}>
        Restart Quiz
      </button>
    </>
  );
}
