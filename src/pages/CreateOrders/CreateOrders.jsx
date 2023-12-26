
import './CreateOrders.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";
import { useSelector } from 'react-redux'
import { productData } from '../productSlice';
import { userData } from '../userSlice';
import { ProductCard } from '../../common/ProductCard/ProductCard';
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { createOrders } from '../../services/apiCalls';


export const CreateOrders = () => {

    const navigate = useNavigate()
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
     
        for (let test in order)
            {if (order.ud[test] === "") { return; } }
        for (let test in orderError) 
            {if (orderError[test] !== "") { return; } }

        createOrders(body, token)
            .then(resultado => {
                if (resultado.data.message === "Error registering order") {
                    setMsgError("Incorrect data order ")
                    return;
                }
                setTimeout(() => {
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
            <div className='orderDesign'>
                <div className='cardsDesign'>
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
                <div>Ud :
                    <CustomInput
                        design={`inputDesign ${orderError.udError !== "" ? 'inputDesignError' : ''}`}
                        type={"ud"}
                        name={"ud"}
                        placeholder={">0"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{orderError.udError}</div>
                </div>

                <div>Comentario de preparación :
                    <CustomInput
                        design={`inputDesign ${orderError.commentError !== "" ? 'inputDesignError' : ''}`}
                        type={"comment"}
                        name={"comment"}
                        placeholder={"Forma de preparación"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{orderError.commentError}</div>
                </div>


                <div className='errorMsg'>{msgError}</div>

                <div className='buttonSubmit' onClick={Submit}>AÑADIR A LA CESTA</div>
            </div>
        </>
    )
}