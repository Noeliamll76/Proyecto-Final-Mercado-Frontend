
import './CreateOrders.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";
import { useSelector, useDispatch } from 'react-redux'
import { productData } from '../productSlice';
import { userData } from '../userSlice';
import { saveBasket } from '../basketSlice';
import { ProductCard } from '../../common/ProductCard/ProductCard';
import { CustomInputDescription } from "../../common/CustomInputDescription/CustomInputDescription";
import { CustomInputUd } from "../../common/CustomInputUd/CustomInputUd";
import { createOrders, ordersBasket } from '../../services/apiCalls';


export const CreateOrders = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const rdxProduct = useSelector(productData)
    const productId = rdxProduct.infoProduct.id
    const rdxUser = useSelector(userData)
    const token = rdxUser.credentials.token

    const [msgError, setMsgError] = useState('')

    const [order, setOrder] = useState({
        ud: '',
        comment: ''
    });

    const [orderError, setOrderError] = useState({
        udError: '',
        commentError: ''
    });

    const functionHandler = (e) => {
        setOrder((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        setMsgError("")
    };

    const errorCheck = (e) => {
        let error = ""
        error = validator(e.target.name, e.target.value);
        setOrderError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const Submit = () => {
        let body = {
            product_id: productId,
            ud: order.ud,
        }
        if (order.comment !== "") {
            body = {
                product_id: productId,
                ud: order.ud,
                comment: order.comment,
            }
        }

        for (let test in order) { if (order.ud[test] === "") { return; } }
        for (let test in orderError) { if (orderError[test] !== "") { return; } }

        createOrders(body, token)
            .then(resultado => {
                if (resultado.data.message === "Error registering order") {
                    setMsgError("Incorrect data order ")
                    return;
                }
                setTimeout(() => {
                    ordersBasket(token)
                        .then(orders => {
                            dispatch(saveBasket({ infoBasket: orders.data.data }))
                            console.log(orders.data.data)
                        })
                        .catch(error => console.log(error));
                    navigate("/productsByStore");
                }, 500)
            }
            )
            .catch(error => console.log(error));
    }
    const tellMe = (argumento) => {
        console.log(argumento)
    }

    return (
        <>
            <div className='createOrderDesign'>
                <div className='boxContainer'>

                    <div className='createOrderBox1'>
                        <div className='orderRoster'>
                            <ProductCard
                                key={rdxProduct.infoProduct.id}
                                image_id={rdxProduct.infoProduct.image_id}
                                category={rdxProduct.infoProduct.category}
                                name={rdxProduct.infoProduct.name}
                                variety={rdxProduct.infoProduct.variety}
                                origin={rdxProduct.infoProduct.origin}
                                price={rdxProduct.infoProduct.price}
                                selected={"selectedCard"}
                                selectFunction={() => tellMe(rdxProduct)}
                            />
                        </div>
                    </div>

                    <div className='createOrderBox2'>
                        <h3>Ud :  
                            <CustomInputUd
                                design={`inputUdDesign ${orderError.udError !== "" ? 'inputUdDesignError' : ''}`}
                                type={"ud"}
                                name={"ud"}
                                placeholder={">0"}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                            />
                            <div className='errorMsg'>{orderError.udError}</div>
                        </h3>

                        <h3>Comentario :
                            <CustomInputDescription
                                design={`inputDesDesign ${orderError.commentError !== "" ? 'inputDesDesignError' : ''}`}
                                type={"comment"}
                                name={"comment"}
                                placeholder={"Sugerencia de preparación"}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                            />
                            <div className='errorMsg'>{orderError.commentError}</div>
                        </h3>
                    <div className='errorMsg'>{msgError}</div>

                    <div className='buttonSubmit' onClick={Submit}>AÑADIR A LA CESTA</div>
                    </div>

                </div>
            </div >
        </>
    )
}