import React, { useState, useEffect } from 'react';
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import "./ProfileBasket.css";
import { ordersBasket } from '../../services/apiCalls';
import { basketData } from '../basketSlice';
import { userData } from '../userSlice';
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
    const [msgError, setMsgError] = useState();


    useEffect(() => {
        if (orders.length === 0) {
            ordersBasket(token)
                .then(
                    results => {
                        setOrders(results.data.data)
                        console.log(results.data.data)
                    })
                .catch(error => {
                    console.log(error)
                })
        }
        // }
    }, []);
    console.log(orders)

    const tellMe = (argumento) => {
        console.log(argumento)
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
                        <div>IMPORTE TOTAL: </div>
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