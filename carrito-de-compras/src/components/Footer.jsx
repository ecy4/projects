import { useFilters } from '../hooks/useFilters'
import './Footer.css'

export function Footer () {
  const { filters } = useFilters()

  return (
    <footer className='footer'>
      <div className='footer-info'>
        <h4>Prueba técnica de React ⚛️ <span>@Eccy</span></h4>
        <h5>Shopping Cart con <code>useContext</code> & <code>useReducer</code></h5>
      </div>

      <div className='footer-debug'>
        <span>Min: <strong>${filters.minPrice}</strong></span>
        <span>Cat: <strong>{filters.category}</strong></span>
      </div>
    </footer>
  )
}
