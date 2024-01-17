import React from 'react';
import Option from './Option';

export default function Questions({ selectedQuestion, dispatch, actualPoints, answer }) {
  const { question, options, correctOption, points } = selectedQuestion;
  console.log(question, 'hurrr');

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
