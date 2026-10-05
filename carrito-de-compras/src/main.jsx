import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FiltersProvider } from './contex/filters.jsx'
import { AuthProvider } from './contex/auth.jsx'
import { ProductsProvider } from './contex/products.jsx'
import { CartProvider } from './contex/cart.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ProductsProvider>
      <FiltersProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FiltersProvider>
    </ProductsProvider>
  </AuthProvider>
)
