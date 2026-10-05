import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'
import { Star, PackageX } from 'lucide-react'

export function Products ({ products }) {
  const { addToCart, removeFromCart, cart } = useCart()

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  if (products.length === 0) {
    return (
      <div className='no-products-container'>
        <PackageX size={48} className='no-products-icon' />
        <h3>No se encontraron productos</h3>
        <p>Prueba ajustando el filtro de precio o seleccionando otra categoría.</p>
      </div>
    )
  }

  return (
    <main className='products-grid-section'>
      <div className='products-grid'>
        {products.map(product => {
          const isProductInCart = checkProductInCart(product)

          return (
            <article key={product.id} className='product-card'>
              <div className='product-image-wrapper'>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading='lazy'
                  className='product-image'
                />
                <span className='product-category-tag'>
                  {product.category || 'General'}
                </span>
              </div>

              <div className='product-body'>
                <div className='product-rating'>
                  <Star size={14} fill='#fbbf24' color='#fbbf24' />
                  <span>{product.rating || '4.8'}</span>
                </div>

                <h4 className='product-title'>{product.title}</h4>
                <p className='product-description'>
                  {product.description || 'Producto disponible con garantía oficial'}
                </p>

                <div className='product-footer'>
                  <div className='product-price-group'>
                    <span className='product-price-label'>Precio</span>
                    <strong className='product-price'>${product.price}</strong>
                  </div>

                  <button
                    type='button'
                    className={`btn-cart-action ${isProductInCart ? 'in-cart' : ''}`}
                    title={isProductInCart ? 'Quitar del carrito' : 'Añadir al carrito'}
                    onClick={() => {
                      isProductInCart
                        ? removeFromCart(product)
                        : addToCart(product)
                    }}
                  >
                    {isProductInCart ? (
                      <>
                        <RemoveFromCartIcon />
                        <span>Quitar</span>
                      </>
                    ) : (
                      <>
                        <AddToCartIcon />
                        <span>Añadir</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
