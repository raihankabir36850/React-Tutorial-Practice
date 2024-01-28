import React from 'react';
import { useQuiz } from '../contexts/QuizContext';

export default function Button() {
  const { dispatch, index, questionsSet } = useQuiz();
  const totalQuestions = questionsSet.length;
  if (index < totalQuestions - 1) {
    return (
      <button className='btn btn-ui' onClick={() => dispatch({ type: 'nextButtonClick', payload: { index: index, answer: null } })}>
        Next
      </button>
    );
  }

  if (index === totalQuestions - 1) {
    return (
      <button className='btn btn-ui' onClick={() => dispatch({ type: 'finished' })}>
        Finished
      </button>
    );
  }
}
