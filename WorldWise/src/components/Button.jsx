/* eslint-disable react/prop-types */
import Styles from './Button.module.css';

export default function Button({ children, type, onClick }) {
  return (
    <button onClick={onClick} className={`${Styles.btn} ${Styles[type]}`}>
      {children}
    </button>
  );
}
