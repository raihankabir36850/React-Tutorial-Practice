import { useState, useEffect, useRef } from 'react';
import Star from './Star';

export default function StarRating({ maxLength, addMovieInWatchList, movieDetails }) {
  const [mouseOver, setMouseOver] = useState(0);
  const [rating, setRating] = useState(0);

  const count = useRef(0);

  function clickHandler(index) {
    setRating(index + 1);
  }

  function mouseEnterHandler(event, index) {
    setMouseOver(index + 1);
  }

  function mouseOutHandler(event) {
    setMouseOver(0);
  }

  useEffect(
    function () {
      if (rating) count.current++;
    },
    [rating]
  );

  return (
    <div className='rating'>
      <div className='starRatingBox'>
        <div className='starContainer'>
          {Array.from({ length: maxLength }, (_, i) => (
            <Star key={i} mouseEnterHandler={mouseEnterHandler} mouseOutHandler={mouseOutHandler} index={i} clickHandler={clickHandler} full={mouseOver ? mouseOver >= i + 1 : rating >= i + 1} />
          ))}
        </div>
        <p className='text-container'>{mouseOver || rating || ''}</p>
      </div>
      {rating > 0 && (
        <button className='btn-add' onClick={() => addMovieInWatchList(rating, count.current)}>
          + Add to list
        </button>
      )}
    </div>
  );
}
