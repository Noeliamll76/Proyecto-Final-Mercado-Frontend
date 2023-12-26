
import React from 'react'
import './CustomInputDescription.css'

export const CustomInputDescription = ({design, type, name, placeholder, value, functionProp, functionBlur}) => {
     return (
         <input 
            className={design}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e)=>functionProp(e)}
            onBlur={(e)=>functionBlur(e)}
         />

     )
}