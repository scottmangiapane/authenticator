import { useContext } from 'react';

import { AppContext } from './App';
import Countdown from './Countdown';

import './Card.css';

function Card({ name, time, token }) {
  const { dispatch } = useContext(AppContext);

  function handleClick(text) {
    return () => {
      navigator.clipboard.writeText(text);
      dispatch({ type: 'SET_COPIED', data: (new Date()).getTime() });
    }
  }

  return (
    <div className='card p-sm row' onClick={ handleClick(token) }>
      <div className='m-sm-x row-fill-x'>
        <p className='card-title ellipsis'>{ name }</p>
        <p className='card-content'>{ token }</p>
      </div>
      <Countdown className='m-sm-x' text={ time } value={ time / 30 * 100 } />
    </div>
  );
}

export default Card;
