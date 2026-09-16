import { Products } from './components/products.jsx'
import { product } from './mooks/products.js'

function App() {
  const { products } = product
  return (
  <> < Products products={products}  />  </>
  )
}

export default App
