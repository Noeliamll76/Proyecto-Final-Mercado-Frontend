
import './ConfirmBasket.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomInputTarjet } from "../../common/CustomInputTarjet/CustomInputTarjet";
import { useSelector, useDispatch } from "react-redux";
import { total_importData } from '../total_importSlice';
import { userData } from '../../pages/userSlice';
import { confirmBasket } from '../../services/apiCalls';
import coche from '../../../public/image/coche.png'


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
        <div className="confirmPayDesign">
                    <h3>Dias de reparto: Martes-Sábado de 9h-14h Miércoles y Jueves de 16h-19h</h3>
                    <h3>Gastos de envio 6€ para compras -100€</h3>
            <div className='contenedorPayBasket'>

                <div className='contPayBasket1'>
                    <div className='basketBox1'>
                        <div><img className="basketBox1-1" src={coche} /></div>
                    </div>
                </div>

                <div className='contPayBasket2'>
                    <div className="confirmPayBox">

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

            </div>
        </div>
    )
}