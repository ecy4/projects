import { Boton } from './componentes/Boton'
import './App.css'
import Eccylogo from './imagenes/LogoeEccy.png'
import { Contador } from './componentes/Contador'
import { useState } from 'react'
function App() {

  const [numClics, setNumClics] = useState(0)

    const manejarClic = () => {
      setNumClics(numClics + 1)
    }

    const reiniciarContador = () => {
      setNumClics(0)
    }
  return (
    <div className='App'>
      <div className='logo-Eccy'>
        <img
         className='Eccy-logo'
         src={Eccylogo}
         alt='Logo eccy' 
        />



      </div>
        <div className='CONTENEDOR'>
          <Contador numClics={numClics} />

          <Boton
            texto='Clic'
            esBotonDeClic={true}
            manejarClic={manejarClic} />
          <Boton
            texto='Reiniciar'
            esBotonDeClic={false}
            manejarClic={reiniciarContador} />
        </div>

    </div>
  )
}
export default App