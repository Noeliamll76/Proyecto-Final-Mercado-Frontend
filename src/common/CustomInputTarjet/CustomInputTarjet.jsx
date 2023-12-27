
import React from 'react'
import './CustomInputTarjet.css'

export const CustomInputTarjet = ({design, type, name, placeholder, value}) => {
     return (
         <input 
            className={design}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            
         />

     )
}