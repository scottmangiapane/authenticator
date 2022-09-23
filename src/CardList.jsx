/* global chrome */

import { useEffect, useState } from 'react';

import Card from './Card';
import Spinner from './Spinner';

import './CardList.css';

function CardList() {
    const [error, setError] = useState();
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [time, setTime] = useState((new Date()).getSeconds() % 30);

    useEffect(refreshData, []);

    useEffect(() => {
        const timer = setTimeout(refreshData, 1000);
        return () => clearTimeout(timer);
    }, [error, items, time]);

    function refreshData() {
        chrome.runtime.sendMessage({ action: 'fetch-items' }, ({ error, items }) => {
            setError(error);
            setItems(items);
            setIsLoaded(true);
        });
        setTime((new Date()).getSeconds() % 30);
    }

    if (!isLoaded) {
        return <Spinner className='m-md' size='16px' />;
    }

    if (error) {
        return <p className='p-md text-red'>{ error }</p>;
    }

    const cards = items.map(item => {
        const { name, token } = item;
        return <Card key={ name } name={ name } time={ time } token={ token } />;
    });

    return <div className='card-list'>{ cards }</div>;
}

export default CardList;
