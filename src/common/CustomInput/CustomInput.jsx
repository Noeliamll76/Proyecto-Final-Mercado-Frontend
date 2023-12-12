
import React from 'react'
import './CustomInput.css'

export const CustomInput = ({design, type, name, placeholder, value, functionProp}) => {
     return (
         <input 
            className={design}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e)=>functionProp(e)}
            // onBlur={}
         />

     )
}