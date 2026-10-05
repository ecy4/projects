import { createContext, useState, useEffect } from 'react'
import { products as initialProducts } from '../mocks/products.json'
import { sanitizeInput } from '../services/supabase'

export const ProductsContext = createContext()

export function ProductsProvider ({ children }) {
  // Lista de productos con persistencia local y soporte para CRUD
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('shopping_cart_products')
      return saved ? JSON.parse(saved) : initialProducts
    } catch {
      return initialProducts
    }
  })

  // Lista de pedidos reales realizados mediante el carrito
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('shopping_cart_orders')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('shopping_cart_products', JSON.stringify(products))
    } catch {
      // Ignorar errores de almacenamiento local
    }
  }, [products])

  useEffect(() => {
    try {
      localStorage.setItem('shopping_cart_orders', JSON.stringify(orders))
    } catch {
      // Ignorar errores de almacenamiento local
    }
  }, [orders])

  // Crear nuevo producto con sanitizacion estricta contra inyecciones
  const addProduct = ({ title, description, price, category, thumbnail }) => {
    const cleanTitle = sanitizeInput(title)
    const cleanDescription = sanitizeInput(description)
    const cleanCategory = sanitizeInput(category)
    const cleanThumbnail = sanitizeInput(thumbnail)
    const numPrice = Number(price)

    if (!cleanTitle || isNaN(numPrice) || numPrice <= 0) {
      throw new Error('El título y un precio válido son obligatorios')
    }

    const newProduct = {
      id: Date.now(),
      title: cleanTitle,
      description: cleanDescription || 'Sin descripción',
      price: numPrice,
      category: cleanCategory || 'general',
      thumbnail: cleanThumbnail || 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
      rating: 5.0,
      stock: 10
    }

    setProducts(prev => [newProduct, ...prev])
    return newProduct
  }

  // Actualizar producto existente
  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          title: sanitizeInput(updatedFields.title) || p.title,
          description: sanitizeInput(updatedFields.description) || p.description,
          price: Number(updatedFields.price) || p.price,
          category: sanitizeInput(updatedFields.category) || p.category,
          thumbnail: sanitizeInput(updatedFields.thumbnail) || p.thumbnail
        }
      }
      return p
    }))
  }

  // Eliminar producto
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  // Registrar un nuevo pedido real tras el checkout
  const createOrder = ({ customerName, customerEmail, cart, total }) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: sanitizeInput(customerName) || 'Cliente Registrado',
      customerEmail: sanitizeInput(customerEmail) || 'sin-email@tienda.com',
      date: new Date().toISOString().split('T')[0],
      total,
      itemsCount: cart.reduce((acc, item) => acc + item.quantity, 0),
      items: cart,
      status: 'Procesado'
    }

    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }

  return (
    <ProductsContext.Provider value={{
      products,
      orders,
      addProduct,
      updateProduct,
      deleteProduct,
      createOrder
    }}>
      {children}
    </ProductsContext.Provider>
  )
}
