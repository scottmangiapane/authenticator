import totp from './totp';

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
  const cards = data.map(d => {
    const { name, secret } = d;
    const token = totp({ secret, encoding: 'base32' });
    return (
      <div className='card p-md' key={ name }>
        <p className='ellipsis'>{ name }</p>
        <p>{ token }</p>
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
