import React, { useState, useEffect } from 'react';
import { getImage_productById } from '../../services/apiCalls';

import './ProductCard.css';

export const ProductCard = ({ image_id, category_id, name, variety, origin, price, selected, selectFunction }) => {

    const [change, setChange] = useState(true);
    const [image, setImage] = useState('');

    useEffect(() => {
        getImage_productById(image_id)
            .then(
                results => {
                    setImage(results.data.data)
                    console.log(results.data.data)
                }
            )
            .catch(error => { console.log(error) }
            )
    }, [image]);

    const callSelectClick = () => {
        setChange(!change)
        selectFunction()
    }

    return (
        <div className={`productsCardDesign ${!change ? selected : ''}`} onClick={callSelectClick}>
            <div><img className='avatar' src={image} /></div>
            <div>{category_id}</div>
            <div>{name}</div>
            <div>{variety}</div>
            <div>{origin}</div>
            <div>{price}</div>
        </div>
    )
}