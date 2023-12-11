import './Register.css'

export const Register=()=>{
    const nombre="REGISTER"
    const interruptor = true
    const saludame = (vista) => {
        console.log(`Estoy en ${vista}`)
    }
    return (
        <div className="registerDesign">

            {
                //Interpolación condicional

                interruptor &&
                //En caso de pasar argumentos incluimos el callback
                <div onClick={()=>saludame("REGISTER")}>
                    Vista de {nombre}
                </div>
            }

            
            
        </div>
    )
}