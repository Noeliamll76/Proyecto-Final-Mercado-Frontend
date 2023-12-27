import React, { useState, useEffect } from 'react';
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import "./ProfileBasket.css";
import { ordersBasket } from '../../services/apiCalls';
import { basketData } from '../basketSlice';
import { userData } from '../userSlice';
import { orderData, saveOrder } from '../orderSlice';
import { OrderCard } from '../../common/OrderCard/OrderCard';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

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
                    console.log(error)
                })
        }
        // }
    }, []);

    const calcularTotalImporte = (data) => {
        let total = 0;
        data.forEach(order => {
            total += order.import;
            console.log (total)
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

    return (
        <>
            <div className='cardsDesign'>
                {orders.length > 0 ? (
                    <div className='ordersRoster'>
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