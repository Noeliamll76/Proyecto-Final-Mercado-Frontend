import React, { useState, useEffect } from 'react';
import { getGuilds } from '../../services/apiCalls';
import { GuildCard } from '../../common/GuildCard/GuildCard';
import "./Guilds.css";

export const Guilds = () => {

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
        console.log(argumento)
    }

    return (
        <>        
        <div>ESTOY EN GUILDS</div>
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
                    <div>Esperar datos</div>
                )
            }
        </div>
        </>
    )
}