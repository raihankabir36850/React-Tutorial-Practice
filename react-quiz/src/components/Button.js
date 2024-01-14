import React from 'react';

export default function Button({ index, totalQuestions, dispatch }) {
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
