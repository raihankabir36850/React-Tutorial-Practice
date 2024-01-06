import React from 'react';
import Option from './Option';

export default function Questions({ selectedQuestion }) {
  console.log(selectedQuestion);
  const { question, options } = selectedQuestion;
  console.log(question, options);
  return (
    <div>
      <h4>{question}</h4>
      <div className='options'>{options && options.map((option) => <Option text={option} key={option} />)}</div>
    </div>
  );
}
