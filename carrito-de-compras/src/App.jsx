import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Filters } from './components/Filters'
import { Products } from './components/Products'
import { Dashboard } from './components/Dashboard'
import { Cart } from './components/Cart'
import { LoginModal } from './components/LoginModal'
import { Footer } from './components/Footer'
import { useProducts } from './hooks/useProducts'
import { useFilters } from './hooks/useFilters'
import { useAuth } from './hooks/useAuth'

function App () {
  const [currentView, setCurrentView] = useState('store')
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { isAdmin } = useAuth()
  const { products } = useProducts()
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(products)

  const activeView = (currentView === 'dashboard' && isAdmin) ? 'dashboard' : 'store'

  return (
    <>
      <Navbar
        currentView={activeView}
        onViewChange={setCurrentView}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {activeView === 'dashboard' ? (
        <Dashboard onGoToStore={() => setCurrentView('store')} />
      ) : (
        <main className='main-content-layout'>
          <Filters />
          <Products products={filteredProducts} />
        </main>
      )}

      <Footer />
    </>
  )
}

export default App
