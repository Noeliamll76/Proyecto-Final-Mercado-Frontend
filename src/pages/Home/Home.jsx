import './Home.css'

export const Home=()=>{
    const nombre="HOME"
    const interruptor = true
    const saludame = (vista) => {
        console.log(`Estoy en ${vista}`)
    }
    return (
        <div className="homeDesign">

            {
                //Interpolación condicional

                interruptor &&
                //En caso de pasar argumentos incluimos el callback
                <div onClick={()=>saludame("HOME")}>
                    Vista de {nombre}
                </div>
            }

            
            
        </div>
    )
}