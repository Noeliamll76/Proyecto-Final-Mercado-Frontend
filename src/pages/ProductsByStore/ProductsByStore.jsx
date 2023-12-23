import React, { useState, useEffect } from 'react';
import { getProductsByStore } from '../../services/apiCalls';
import { ProductCard } from '../../common/ProductCard/ProductCard';
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

import { storeData } from "../../pages/storeSlice";
import "./ProductsByStore.css";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

export const ProductsByStore = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const rdxStore = useSelector(storeData)
    const idStore = rdxStore.infoStore.id
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (products.length === 0) {
            setTimeout(() => {
                getProductsByStore(idStore)
                    .then(
                        results => {
                            setProducts(results.data.data)
                            console.log(results.data.data)
                        }
                    )
                    .catch(error => {
                        console.log(error)
                    }
                    )
            }, 400)
        }
    }, [products]);

    const tellMe = (argumento) => {
        dispatch(saveProducts({ infoProduct: argumento }))
        setTimeout(() => {
            console.log ("comprobar que existe el token de usuario y si no mandar a login, y despues de login mandar a guilds otra vez. Si hay token hacer un update del producto")
            // navigate("/productsStore");
        }, 500);
        console.log(argumento)
    }

    return (
        <>
            <div className='cardsDesign'>
                {products.length > 0 ? (
                    <div className='productsRoster'>
                        {products.map(product => {
                            return (
                                < 
                                ProductCard
                                    key={product.id}
                                    image_id={product.image_id}
                                    category={product.category}
                                    name={product.name}
                                    variety={product.variety}
                                    origin={product.origin}
                                    price={product.price}
                                    selected={"selectedCard"}
                                    selectFunction={() => tellMe(product)}
                                />
                            )
                        })
                        }
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