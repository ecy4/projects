import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons'
import './Cart.css'
import { useCart } from '../hooks/useCart'

function CartItem ({ thumbnail, price, title, quantity, addToCart, decrementQuantity }) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />
      <div>

        <strong>{title}</strong> - ${price}
      </div>
      <footer>
        <button onClick={decrementQuantity}>-</button>
        <small>Cantidad: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

export function Cart () {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart, decrementQuantity } = useCart()

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              decrementQuantity={() =>
                decrementQuantity(product)}
              {...product}
            />
          ))}
        </ul>

        <div className='cart-actions'>
          <div className='cart-total'>
            <span>Total:</span>
            <strong>${total}</strong>
          </div>

          <button className='pay-button'>
            Pagar
          </button>

          <button className='clear-cart-button' onClick={clearCart}>
            <ClearCartIcon />
          </button>
        </div>
      </aside>

    </>

  )
}
