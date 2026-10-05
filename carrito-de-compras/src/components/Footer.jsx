import { useFilters } from '../hooks/useFilters'
import { ShieldCheck, Lock, Code2 } from 'lucide-react'
import './Footer.css'

export function Footer () {
  const { filters } = useFilters()

  return (
    <footer className='app-footer'>
      <div className='footer-main-content'>
        <div className='footer-brand-summary'>
          <h4>ShopMaster Pro</h4>
          <p>Plataforma de comercio electrónico moderna desarrollada con React, Context API y Redux Architecture.</p>
        </div>

        <div className='footer-security-badges'>
          <div className='security-pill'>
            <ShieldCheck size={16} className='pill-icon' />
            <span>Consultas SQL Parametrizadas</span>
          </div>
          <div className='security-pill'>
            <Lock size={16} className='pill-icon' />
            <span>Sanitización XSS Activa</span>
          </div>
          <div className='security-pill'>
            <Code2 size={16} className='pill-icon' />
            <span>0 Puertas Traseras</span>
          </div>
        </div>
      </div>

      <div className='footer-bottom-bar'>
        <span>Filtro activo: Mínimo <strong>${filters.minPrice}</strong> | Categoría: <strong>{filters.category}</strong></span>
        <span>© 2026 ShopMaster Pro. Todos los derechos reservados.</span>
      </div>
    </footer>
  )
}
