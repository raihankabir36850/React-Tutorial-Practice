import React from 'react';
import Option from './Option';
import { useQuiz } from '../contexts/QuizContext';

export default function Questions() {
  const { questionsSet, index, dispatch, answer } = useQuiz();
  const { question, options, correctOption, points } = questionsSet[index];

  function optionSelectHandler(id) {
    console.log('option clicked', id);
    dispatch({ type: 'optionClick', payLoad: { answer: id, points: correctOption === id ? points : 0 } });
  }

  const selecetedAnswer = answer && answer;

  return (
    <div>
      <h4>{question}</h4>
      <div className='options'>
        {options &&
          options.map((option, index) => <Option text={option} key={option} id={index} optionSelectHandler={optionSelectHandler} selecetedAnswer={selecetedAnswer} correctOption={correctOption} />)}
      </div>
    </div>
  );
}
