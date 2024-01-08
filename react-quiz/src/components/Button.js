import React from 'react';

export default function Button({ nextButtonHandler }) {
  return (
    <button className='btn btn-ui' onClick={() => nextButtonHandler()}>
      Next
    </button>
  );
}
