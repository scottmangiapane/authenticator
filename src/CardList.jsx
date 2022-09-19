import { useEffect, useState } from 'react';

import totp from './totp';

import Countdown from './Countdown';

import './CardList.css';

const data = [{
  name: 'Dummy item no. 1',
  secret: 'ASDFGHJKL'
}, {
  name: 'Dummy item no. 2',
  secret: 'ASDFGHJKL'
}, {
  name: 'Dummy item no. 3',
  secret: 'ASDFGHJKL'
}, {
  name: 'Dummy item no. 4',
  secret: 'ASDFGHJKL'
}, {
  name: 'Dummy item no. 5',
  secret: 'ASDFGHJKL'
}, {
  name: 'Dummy item no. 6',
  secret: 'ASDFGHJKL'
}, {
  name: 'Dummy item no. 7',
  secret: 'ASDFGHJKL'
}, {
  name: 'Dummy item no. 8',
  secret: 'ASDFGHJKL'
}];

function CardList() {
  const [time, setTime] = useState((new Date()).getSeconds() % 30);

  useEffect(() => {
    const timer = setTimeout(() => setTime((new Date()).getSeconds() % 30), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  const cards = data.map(d => {
    const { name, secret } = d;
    const token = totp({ secret, encoding: 'base32' });
    return (
      <div className='card p-sm row' key={ name }>
        <div className='m-sm-x row-fill-x'>
          <p className='card-title ellipsis'>{ name }</p>
          <p className='card-content'>{ token }</p>
        </div>
        <Countdown className='m-sm-x' text={ time } value={ time / 30 * 100 } />
      </div>
    );
  });

  return (
    <div className='card-list'>
      { cards }
    </div>
  );
}

export default CardList;
