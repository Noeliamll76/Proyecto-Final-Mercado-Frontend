import React, { useState, useEffect } from 'react';
import { getStoresByGuild } from '../../services/apiCalls';
import { StoresCard } from '../../common/StoresCard/StoresCard';
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { guildData } from "../../pages/guildSlice";
import { saveStore } from "../../pages/storeSlice";
import "./StoresByGuild.css";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

export const StoresByGuild = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const rdxGuild = useSelector(guildData)
    const idGuild = rdxGuild.infoGuild.id

    const [stores, setStores] = useState([]);
    const [msgError, setMsgError] = useState('');


    useEffect(() => {
        if (stores.length === 0) {
            getStoresByGuild(idGuild)
                .then(results => {
                    setStores(results.data.data)
                    console.log(results.data.data)
                }
                )
                .catch(error => {
                    setMsgError("Actualmente no hay vendedores con este género")
                    setTimeout(() => {
                        navigate("/guilds");
                    }, 1500);
                    console.log(error)
                }
                )
        }
    }, [stores]);

    const tellMe = (argumento) => {
        dispatch(saveStore({ infoStore: argumento }))
        setTimeout(() => {
            navigate("/productsByStore");
        }, 500);
        console.log(argumento)
    }

    return (
        <>
            <div className='cardsDesign'>
                {stores.length > 0 ? (
                    <div className='storesRoster'>
                        {stores.map(store => {
                            return (
                                <
                                    StoresCard
                                    key={store.id}
                                    name={store.name}
                                    locaction={store.location}
                                    image={store.image}
                                    description={store.description}
                                    selected={"selectedCard"}
                                    selectFunction={() => tellMe(store)}
                                />
                            )
                        })
                        }
                    </div>
                )
                    :
                    (
                        <div>{msgError ?
                            (
                                <h3>{msgError}</h3>
                            )
                            : (
                                <div><LoadingSpinner /></div>
                            )
                        }
                        </div>
                    )
                }
            </div>
        </>
    )
}