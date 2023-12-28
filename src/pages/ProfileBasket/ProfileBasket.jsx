import React, { useState, useEffect } from 'react';
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import "./ProfileBasket.css";
import { ordersBasket } from '../../services/apiCalls';
import { basketData } from '../basketSlice';
import { userData } from '../userSlice';
import { saveTotal_import } from '../total_importSlice';
import { saveOrder } from '../orderSlice';
import { OrderCard } from '../../common/OrderCard/OrderCard';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import bienvenida from '../../../public/image/bienvenida.jpg'


export const ProfileBasket = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const rdxBasket = useSelector(basketData)
    const rdxUser = useSelector(userData)
    const token = rdxUser.credentials.token

    const [orders, setOrders] = useState([]);
    const [totalImporte, setTotalImporte] = useState(0);


    useEffect(() => {
        if (orders.length === 0) {
            ordersBasket(token)
                .then(
                    results => {

                        setOrders(results.data.data)
                        calcularTotalImporte(results.data.data)
                    })
                .catch(error => {
                    if (error.response.data.message === "No tiene nada en la cesta") { navigate("/") }

                })
        }
        // }
    }, []);

    const calcularTotalImporte = (data) => {
        let total = 0;
        data.forEach(order => {
            total += order.import;
        });
        setTotalImporte(total);
    }

    const tellMe = (argumento) => {
        console.log(argumento)
        dispatch(saveOrder({ infoOrder: argumento }))
        setTimeout(() => {
            navigate("/UpdateOrders");
        }, 500);
    }

    const confirmBasket = async () => {
        try {
            dispatch(saveTotal_import({ infoTotal_import: totalImporte }))
            console.log(totalImporte)
            navigate("/ConfirmBasket");
        }
        catch (error) { console.log(error) }
    }

    return (
        <>
            <div className='cardsBasketDesign'>
                {orders.length > 0 ? (
                    <div className='contenedorBasket1'>

                        <div className='basketBox1'>
                            <div><img className="basketBox1-1" src={bienvenida} /></div>

                        </div>
                        
                        <div className='basketRoster'>
                            {orders.map(order => {
                                return (
                                    <
                                        OrderCard
                                        key={order.id}
                                        product_id={order.product_id}
                                        ud={order.ud}
                                        price={order.price}
                                        importe={order.import}
                                        comment={order.comment}
                                        selected={"selectedCard"}
                                        selectFunction={() => tellMe(order)}
                                    />
                                )
                            })
                            }
                            <h3>IMPORTE TOTAL: {totalImporte.toFixed(2)} €</h3>
                            <div className="buttonConfirmBasket" onClick={() => confirmBasket()}> CONFIRM BASKET </div>
                        </div>
                    </div>
                )
                    : (
                        <div><LoadingSpinner /></div>
                    )
                }
            </div>
        </>
    )
}