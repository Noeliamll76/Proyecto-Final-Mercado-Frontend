
import './ConfirmBasket.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomInputTarjet } from "../../common/CustomInputTarjet/CustomInputTarjet";
import { useSelector, useDispatch } from "react-redux";
import { total_importData } from '../total_importSlice';
import { userData } from '../../pages/userSlice';
import { confirmBasket } from '../../services/apiCalls';


export const ConfirmBasket = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const rdxUser = useSelector(userData)
    const token = rdxUser.credentials.token
    console.log(token)

    const rdxImporte = useSelector(total_importData)
    const [msgError, setMsgError] = useState('');


    const AcceptPay = async () => {
        try {
            console.log(token)
            const response = await confirmBasket(token);
            setMsgError(response.data.message)
            setTimeout(() => {
                navigate("/");
            }, 400);
        }
        catch (error) { console.log(error) }
    };

    return (
        <div className="confirmBasketDesign">
            <div className="confirmBasketBox">

                <div className="tarjetDesign1">
                    <div>Titular : </div>
                    <div>Número de tarjeta :</div>
                    <div>Valido hasta :</div>
                    <div>CVC  : </div>
                </div>

                <div className="tarjetDesign2">
                    <CustomInputTarjet
                        design={`inputDesign`}
                        type={"text"}
                        name={"name"}
                        placeholder={"Name and surname"}
                    />
                    <CustomInputTarjet
                        design={`inputDesign`}
                        type={"number"}
                        name={"numTarjet"}
                        placeholder={"000 000 000 000"}
                    />
                    <CustomInputTarjet
                        design={`inputDesign`}
                        type={"date"}
                        name={"validDate"}
                        placeholder={"MM/AA"}
                    />
                    <CustomInputTarjet
                        design={`inputDesign `}
                        type={"text"}
                        name={"CVC"}
                        placeholder={"xxx"}
                    />
                </div>
            </div>
            <div className='buttonSubmit' onClick={() => AcceptPay()}>ACCEPT {rdxImporte.infoTotal_import}  €</div>

        </div>
    )
}