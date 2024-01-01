// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from 'react';
export default function Demo3() {
  const [number, setNumber] = useState(1);
  const [from, setForm] = useState('USD');
  const [to, setTo] = useState('USD');

  useEffect(
    function () {
      const getConversion = async () => {
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${number}&from=${from}&to=${to}`);
        const data = await res.json();
        console.log(data, 'data', res);
      };
      if (!number) {
        console.log(number);
        return;
      }
      getConversion();
    },
    [number, to, from]
  );

  const inputChangeHandler = ({ target }) => {
    setNumber(Number(target.value));
  };
  return (
    <div>
      <input type='text' onChange={(e) => inputChangeHandler(e)} />
      <select value={from} onChange={(e) => setForm(e.target.value)}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <p>OUTPUT</p>
    </div>
  );
}
