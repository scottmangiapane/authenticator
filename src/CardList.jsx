import { useEffect, useState } from 'react';

import totp from './totp';

import Card from './Card';

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
        return <Card key={ name } name={ name } time={ time } token={ token } />;
    });

    return (
        <div className='card-list'>
            { cards }
        </div>
    );
}

export default CardList;
