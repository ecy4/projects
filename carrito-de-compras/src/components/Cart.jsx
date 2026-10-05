import { useState } from 'react'
import { ClearCartIcon } from './Icons'
import './Cart.css'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { useProducts } from '../hooks/useProducts'
import { X, ShoppingBag, Plus, Minus, CheckCircle2 } from 'lucide-react'

function CartItem ({ thumbnail, price, title, quantity, addToCart, decrementQuantity }) {
  return (
    <li className='cart-item'>
      <img
        src={thumbnail}
        alt={title}
        className='cart-item-thumb'
      />
      <div className='cart-item-details'>
        <strong className='cart-item-title'>{title}</strong>
        <span className='cart-item-price'>${price} c/u</span>

        <div className='cart-item-controls'>
          <button type='button' className='qty-btn' onClick={decrementQuantity} title='Restar cantidad'>
            <Minus size={14} />
          </button>
          <span className='qty-value'>{quantity}</span>
          <button type='button' className='qty-btn' onClick={addToCart} title='Aumentar cantidad'>
            <Plus size={14} />
          </button>
        </div>
      </div>
      <div className='cart-item-total'>
        ${(price * quantity).toLocaleString()}
      </div>
    </li>
  )
}

export function Cart ({ isOpen, onClose, onOpenLogin }) {
  const { cart, clearCart, addToCart, decrementQuantity } = useCart()
  const { user } = useAuth()
  const { createOrder } = useProducts()
  const [orderSuccess, setOrderSuccess] = useState(null)

  const numTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const formattedTotal = numTotal.toLocaleString()

  const handleCheckout = () => {
    if (cart.length === 0) return

    const newOrder = createOrder({
      customerName: user ? user.name : 'Cliente Invitado',
      customerEmail: user ? user.email : 'invitado@tienda.com',
      cart,
      total: numTotal
    })

    setOrderSuccess(newOrder)
    clearCart()
  }

  if (!isOpen) return null

  return (
    <div className='cart-backdrop' onClick={onClose}>
      <aside className='cart-drawer' onClick={e => e.stopPropagation()}>
        {/* Cabecera del carrito */}
        <div className='cart-header'>
          <div className='cart-header-title'>
            <ShoppingBag size={22} className='cart-title-icon' />
            <h3>Tu Carrito ({cart.reduce((sum, i) => sum + i.quantity, 0)})</h3>
          </div>
          <button className='cart-close-btn' onClick={onClose} aria-label='Cerrar carrito'>
            <X size={20} />
          </button>
        </div>

        {/* Notificacion de pedido completado */}
        {orderSuccess ? (
          <div className='order-success-panel'>
            <CheckCircle2 size={54} className='success-icon' />
            <h4>¡Pedido Realizado con Éxito!</h4>
            <p className='success-order-id'>Orden: <strong>{orderSuccess.id}</strong></p>
            <p className='success-text'>
              Muchas gracias por tu compra. Tu pedido ha sido registrado y procesado correctamente en el sistema.
            </p>
            <button
              className='btn-primary-action'
              onClick={() => {
                setOrderSuccess(null)
                onClose()
              }}
            >
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            {/* Lista de productos en el carrito */}
            <div className='cart-body'>
              {cart.length === 0 ? (
                <div className='cart-empty'>
                  <ShoppingBag size={48} className='empty-cart-icon' />
                  <p>Tu carrito de compras está vacío</p>
                  <span>Agrega productos desde el catálogo para comenzar tu pedido.</span>
                </div>
              ) : (
                <ul className='cart-items-list'>
                  {cart.map(product => (
                    <CartItem
                      key={product.id}
                      addToCart={() => addToCart(product)}
                      decrementQuantity={() => decrementQuantity(product)}
                      {...product}
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* Pie de carrito con totales y botones */}
            {cart.length > 0 && (
              <div className='cart-footer'>
                <div className='cart-summary-row'>
                  <span>Subtotal:</span>
                  <strong>${formattedTotal}</strong>
                </div>
                <div className='cart-summary-row' style={{ color: 'var(--text-muted)' }}>
                  <span>Envío:</span>
                  <span className='free-shipping-tag'>Gratis</span>
                </div>
                <div className='cart-total-row'>
                  <span>Total a pagar:</span>
                  <span className='cart-total-amount'>${formattedTotal}</span>
                </div>

                {!user && (
                  <p className='checkout-guest-note'>
                    Estás comprando como invitado.{' '}
                    <button type='button' className='inline-login-btn' onClick={onOpenLogin}>
                      Inicia sesión
                    </button>{' '}
                    para guardar tus pedidos en tu cuenta.
                  </p>
                )}

                <div className='cart-actions-group'>
                  <button className='btn-checkout-action' onClick={handleCheckout}>
                    Finalizar Compra
                  </button>
                  <button
                    className='btn-clear-cart'
                    onClick={clearCart}
                    title='Vaciar todo el carrito'
                  >
                    <ClearCartIcon />
                    <span>Vaciar</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  )
}
