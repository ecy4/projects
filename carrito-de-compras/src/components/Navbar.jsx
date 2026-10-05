import { ShoppingBag, LayoutDashboard, Store, LogIn, LogOut, User as UserIcon, Shield } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'

export function Navbar ({ currentView, onViewChange, onOpenLogin, onOpenCart }) {
  const { user, isAdmin, logout } = useAuth()
  const { cart } = useCart()

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className='top-navbar'>
      <div className='navbar-content'>
        {/* Marca y logotipo */}
        <div className='brand-container' onClick={() => onViewChange('store')}>
          <div className='brand-icon-wrapper'>
            <ShoppingBag size={22} />
          </div>
          <div className='brand-text'>
            <span className='brand-name'>Shop<span className='brand-accent'>Master</span></span>
            <span className='brand-badge'>Pro</span>
          </div>
        </div>

        {/* Enlaces de navegacion */}
        <nav className='nav-links'>
          <button
            className={`nav-btn ${currentView === 'store' ? 'active' : ''}`}
            onClick={() => onViewChange('store')}
          >
            <Store size={18} />
            <span>Tienda</span>
          </button>

          {isAdmin && (
            <button
              className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => onViewChange('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
              <span className='admin-tag'>Admin</span>
            </button>
          )}
        </nav>

        {/* Acciones de usuario y carrito */}
        <div className='nav-actions'>
          {user ? (
            <div className='user-profile-menu'>
              <div className='user-avatar-badge' title={`Conectado como ${user.role}`}>
                {isAdmin ? <Shield size={16} className='shield-icon' /> : <UserIcon size={16} />}
                <span className='user-name-display'>{user.name}</span>
              </div>
              <button className='btn-icon-action' onClick={logout} title='Cerrar sesión'>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button className='btn-login-action' onClick={onOpenLogin}>
              <LogIn size={18} />
              <span>Ingresar</span>
            </button>
          )}

          {/* Boton del carrito */}
          <button className='cart-toggle-btn' onClick={onOpenCart} aria-label='Abrir carrito'>
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className='cart-count-badge'>{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
