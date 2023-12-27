import React, { useState, useEffect } from 'react';
import { getImage_productById } from '../../services/apiCalls';
import { productProfileById } from '../../services/apiCalls';
import { userData } from '../../pages/userSlice';
import { saveProduct } from '../../pages/productSlice';
import { useSelector, useDispatch } from "react-redux";

import './OrderCard.css';

export const OrderCard = ({ product_id, ud, price, importe, comment, selected, selectFunction }) => {

    const dispatch = useDispatch()
    const rdxUser = useSelector(userData)
    const token = rdxUser.credentials.token

    const [change, setChange] = useState(true);
    const [image, setImage] = useState('');
    const [product, setProduct] = useState('');

    useEffect(() => {
        productProfileById(product_id, token)
            .then(
                productProfile => {
                    setProduct(productProfile.data.data)
                    showImage(productProfile.data.data)
                }
            )
            .catch(error => { console.log(error) }
            )
    }, []);

    const showImage = (data) => {
        getImage_productById(data.image_id)
            .then(
                results => {
                    setImage(results.data.data)
                })
            .catch(error => { console.log(error) }
            )
    }

    const callSelectClick = () => {
        dispatch(saveProduct({ infoProduct: product }))
        setChange(!change)
        selectFunction()
    }

    return (
        <div className={`ordersCardDesign ${!change ? selected : ''}`} onClick={callSelectClick}>
            <h4><img className='avatar' src={image} />
                Producto: {product.name},
                Ud: {ud},
                Precio: {price} €,
                Importe: {importe} €</h4>

            <div>Comentario: {comment} </div>
        </div>
    )
}