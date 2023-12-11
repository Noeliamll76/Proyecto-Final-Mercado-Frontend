import './Login.css'

export const Login=()=>{
    const nombre="LOGIN"
    const interruptor = true
    const saludame = (vista) => {
        console.log(`Estoy en ${vista}`)
    }
    return (
        <div className="loginDesign">

            {
                //Interpolación condicional

                interruptor &&
                //En caso de pasar argumentos incluimos el callback
                <div onClick={()=>saludame("LOGIN")}>
                    Vista de {nombre}
                </div>
            }

            
            
        </div>
    )
}