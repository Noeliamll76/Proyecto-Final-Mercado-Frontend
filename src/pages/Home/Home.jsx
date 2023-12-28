
import './Home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pantallaInicio from '../../../public/image/pantalla-inicio.png'
import bienvenida from '../../../public/image/bienvenida.jpg'
import lineasEMT from '../../../public/image/lineas-emt.png'
import lineasMetro from '../../../public/image/lineas-metro.png'


export const Home = () => {

    const navigate = useNavigate();
    const [change, setChange] = useState(true);

    

    return (
        <>
            <div className="homeDesign">
                <div className="homePantallaInicio1">
                    <div><img className="inicioDesign" src={pantallaInicio} /></div>
                </div>
                <div className="homePantallaInicio2">
                    <div className='homeBox2'>
                    <div><img className="inicioDesign2" src={bienvenida} /></div>
                    </div>
                    <div className='homeBox2-2'>
                    <h2>Como llegar a nuestro mercado en transporte público</h2>
                    <div><img className="inicioDesign2" src={lineasEMT} /></div>
                    <div><img className="inicioDesign2" src={lineasMetro} /></div>
                    </div>
                </div>
                
            </div>
        </>
    )
}