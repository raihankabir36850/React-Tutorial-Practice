import React from 'react';

export default function Description({ quizStartHandler, totalQuestions }) {
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{totalQuestions} questions to test your React mastery</h3>
      <button className='btn btn-ui' onClick={() => quizStartHandler()}>
        Let's start
      </button>
    </div>
  );
}
