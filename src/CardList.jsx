import { useContext, useEffect, useState } from 'react';

import { AppContext } from './App';
import Card from './Card';

import './CardList.css';

function CardList() {
    const { state } = useContext(AppContext);

    const [time, setTime] = useState((new Date()).getSeconds() % 30);

    useEffect(() => {
        const timer = setTimeout(() => setTime((new Date()).getSeconds() % 30), 1000);
        return () => clearTimeout(timer);
    }, [time]);

    function assertType(type, value) {
        if (!(value instanceof type)) {
            throw new Error('Unexpected type');
        }
    }

    let parsedConfig;
    try {
        parsedConfig = JSON.parse(state.config);
        assertType(Array, parsedConfig);
    } catch {
        return <p className='p-md text-red'>Invalid configuration</p>;
    }

    if (!parsedConfig.length) {
        return <p className='p-md'>No items</p>;
    }

    const cards = parsedConfig.map(item => {
        try {
            assertType(Object, item);
            const { name, secret } = item;
            return <Card key={ name } name={ name } time={ time } token={ '123456' } />;
        } catch {
            return <p className='m-sm-x p-sm text-red'>Invalid item</p>
        }
    });

    return <div className='card-list'>{ cards }</div>;
}

export default CardList;
