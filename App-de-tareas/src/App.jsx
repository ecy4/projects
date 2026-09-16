import './App.css'
import logo from './imagenes/logo.png'
import { ListaDeTareas } from './componentes/ListaDeTareas'
function App () {
  return (
    <div className='App'>
      <div className='contenedor-logo'>
        <img
          src={logo}
          className='logo'
          alt=''
        />

      </div>
      <div className='lista-principal'>
        <h1>Mis Tareas</h1>
        <ListaDeTareas />

      </div>

    </div>
  )
}

export default App
