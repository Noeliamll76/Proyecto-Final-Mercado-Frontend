import React, { useState } from 'react';
import './StoresCard.css';

export const StoresCard = ({ name, location, image, description, selected, selectFunction }) => {

    const [change, setChange] = useState(true);

    const callSelectClick = () => {
        setChange(!change)
        selectFunction()
    }

    return (
        <div className={`storesCardDesign ${!change ? selected : ''}`} onClick={callSelectClick}>
            <div><img className='avatar' src={image}/></div>
            <h2>{name}</h2>
            <div>{location}</div>
            <div>{description}</div>
          
        </div>
    )
}