
import React, { useState, useEffect } from 'react';
import './UpdateOrders.css'
import { validator } from "../../services/useful";
import { useNavigate } from 'react-router-dom';
import { orderUpdate, deleteOrder } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { orderData } from '../orderSlice';
import { productData } from '../productSlice';
import { userData } from '../userSlice';
import { CustomInputUd } from '../../common/CustomInputUd/CustomInputUd';
import { CustomInputDescription } from '../../common/CustomInputDescription/CustomInputDescription';
import { ProductCard } from '../../common/ProductCard/ProductCard';

export const UpdateOrders = () => {

    const navigate = useNavigate()
    const rdxProduct = useSelector(productData)
    
    const rdxUser = useSelector(userData)
    const token = rdxUser.credentials.token
    
    const rdxOrder = useSelector(orderData)
    const orderId = rdxOrder.infoOrder.id


    const [isEnabled, setIsEnabled] = useState(true)
    const [msgError, setMsgError] = useState()

    const [order, setOrder] = useState({
        ud: '',
        comment: ''
    });

    const [orderError, setOrderError] = useState({
        udError: '',
        commentError: ''
    });

    useEffect(() => {
        for (let test in order) {
            if (order[test] === "") {
                setOrder(rdxOrder.infoOrder)
            }
        }
    }, []);

    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);
        setOrderError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const functionHandler = (e) => {
        setOrder((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const deleteData = async () => {
        try {
            const borrado = await deleteOrder(orderId, token)
            setMsgError(borrado.data.message)
            console.log(borrado)
            setTimeout(() => {
                setIsEnabled(true)
                navigate("/ProfileBasket");
            }, 400);
        }
        catch (error) { console.log(error) }
    }

    const sendData = async () => {
        try {
            for (let test in order) {
                if (order.ud === "") return;
            }

            for (let test in orderError) {
                if (orderError[test] !== "") return;
            }

            const body = {
                ud: order.ud,
                comment: order.comment,
            };
            const response = await orderUpdate(orderId, body, token);
            setMsgError(response.data.message)
            setTimeout(() => {
                setIsEnabled(true)
                navigate("/ProfileBasket");
            }, 400);
        }
        catch (error) { console.log(error) }
    };

    return (
        <div className="orderDesign">
            <div className="orderForm">
                <ProductCard
                    key={rdxProduct.infoProduct.id}
                    image_id={rdxProduct.infoProduct.image_id}
                    category={rdxProduct.infoProduct.category}
                    name={rdxProduct.infoProduct.name}
                    variety={rdxProduct.infoProduct.variety}
                    origin={rdxProduct.infoProduct.origin}
                    price={rdxProduct.infoProduct.price}
                    selected={""}
                    selectFunction={""}
                />

                <div>Ud :
                    <CustomInputUd
                        disabled={!isEnabled}
                        design={`inputUdDesign ${orderError.udError !== "" ? 'inputUdDesignError' : ''}`}
                        type={"ud"}
                        name={"ud"}
                        placeholder={">0"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{orderError.udError}</div>
                </div>

                <div>Comentario :
                    <CustomInputDescription
                        disabled={!isEnabled}
                        design={`inputDesDesign ${orderError.commentError !== "" ? 'inputDesDesignError' : ''}`}
                        type={"comment"}
                        name={"comment"}
                        placeholder={"Sugerencia de preparación"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{orderError.commentError}</div>
                    <div className='errorMsg'>{msgError}</div>
                </div>

                <div className="button1Submit" onClick={() => sendData()}>UPDATE </div>
                <div className="buttonDelete" onClick={() => deleteData()}> X </div>
            </div>
        </div>
    );
}
