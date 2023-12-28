
import './Home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pantallaInicio from '../../../public/image/pantalla-inicio.png'


export const Home = () => {

    const navigate = useNavigate();
    const [change, setChange] = useState(true);

    

    return (
        <>
            <div className="homeDesign">
                <div className="homePantallaInicio">
                    <div><img className="inicioDesign" src={pantallaInicio} /></div>
                </div>
                <div className="homeMap">
                    {/* <div>
                    <link src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3080.0688748264147!2d-0.33587802436993464!3d39.46777271284925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604860d8818f0b%3A0xa577b14f516c3b58!2sCarrer%20de%20Mart%C3%AD%20Grajales%2C%204%2C%20Poblats%20Mar%C3%ADtims%2C%2046011%20Val%C3%A8ncia!5e0!3m2!1ses!2ses!4v1703770920804!5m2!1ses!2ses" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" target="_blank">Ir a Google Maps</link>
                    </div> */}
                        
                </div>
                
            </div>
        </>
    )
}