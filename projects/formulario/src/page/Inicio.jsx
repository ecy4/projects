
import { Link } from 'react-router'
const Inicio = () => {
  return (
    <div>
        <h1>hola mundo</h1>
        <Link to="agregarForm">
            <button>Agregar Persona</button>
        </Link>
        <div>
            <table>
                <thead>
                    <tr className='flex'>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Inicio

