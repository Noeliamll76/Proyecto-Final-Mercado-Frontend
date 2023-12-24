
import './CreateOrders.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateOrders = () => {

    const navigate = useNavigate();
    const [change, setChange] = useState(true);

    const callCardsClick = () => {
        setChange(!change)
        // navigate("/guilds");
    }

    return (
        <>
            {/* <div className="orderDesign">
                <div className={`cardSubmit ${!change}`} onClick={callCardsClick}> */}
                    ESTOY EN CREATEORDERS
                {/* </div>
            </div> */}
        </>
    )
}