import { useState } from 'react';

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? '+' : '-'}
      </button>
      {!isOpen && children}
    </div>
  );
}
