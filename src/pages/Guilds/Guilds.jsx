import React, { useState, useEffect } from 'react';
import { getGuilds } from '../../services/apiCalls';
import { GuildCard } from '../../common/GuildCard/GuildCard';
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { saveGuild } from "../../pages/guildSlice";
import "./Guilds.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

export const Guilds = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [guilds, setGuilds] = useState([]);

    useEffect(() => {
        if (guilds.length === 0) {
            setTimeout(() => {
                getGuilds()
                .then(
                    results => {
                        setGuilds(results.data.data)
                        console.log (results)
                        }
                    )
                    .catch(error => {
                        console.log(error)
                    }
                    )
            }, 400)
        }
    }, [guilds]);

    const tellMe = (argumento) => {
        dispatch(saveGuild({ infoGuild: argumento }))
        setTimeout(() => {
            navigate("/storesByGuild");
        }, 500);
    }

    return (
        <>        
        <div className='cardsDesign'>
             {guilds.length > 0 ? (
                <div className='guildsRoster'>
                    {guilds.map(guild => {
                        return (
                            <GuildCard
                                key={guild.id}
                                name={guild.name}
                                selected={"selectedCard"}
                                selectFunction={() => tellMe(guild)}
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