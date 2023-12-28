
import React, { useEffect, useState } from 'react';
import './GuildCard.css';


export const GuildCard = ({ name, selected, selectFunction }) => {

    const [change, setChange] = useState(true);
 
    const callSelectClick = () => {
        setChange(!change)
        selectFunction()
    }

    return (
        <div className={`guildCardDesign ${!change ? selected : ''}`} onClick={callSelectClick}>
            <h2>{name}</h2>
        </div>
    )
}