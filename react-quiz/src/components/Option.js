import React from 'react';

export default function Option({ text, id, optionSelectHandler, selecetedAnswer, correctOption }) {
  return (
    <button
      className={`btn btn-option ${
        selecetedAnswer === id && correctOption === id
          ? 'correct answer'
          : selecetedAnswer === id && correctOption !== id
          ? 'wrong answer'
          : selecetedAnswer !== id && correctOption === id && selecetedAnswer !== null
          ? 'correct'
          : selecetedAnswer !== id && correctOption !== id && selecetedAnswer !== null
          ? 'wrong'
          : ''
      } `}
      onClick={() => optionSelectHandler(id)}
    >
      {text}
    </button>
  );
}

//selected item will be answer
// correctoption will be correct
// rest of options wil be wrong
