import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'
import { useProducts } from '../hooks/useProducts'
import { Filter, DollarSign } from 'lucide-react'

export function Filters () {
  const { filters, setFilters } = useFilters()
  const { products } = useProducts()

  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  // Extraer categorias unicas dinamicamente de los productos disponibles
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]

  const handleChangeMinPrice = (event) => {
    setFilters(prev => ({
      ...prev,
      minPrice: Number(event.target.value)
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters(prev => ({
      ...prev,
      category: event.target.value
    }))
  }

  return (
    <section className='filters-card'>
      <div className='filter-header'>
        <Filter size={18} className='filter-icon' />
        <h3>Filtrar Catálogo</h3>
      </div>

      <div className='filters-grid'>
        <div className='filter-item'>
          <label htmlFor={minPriceFilterId} className='filter-label'>
            <DollarSign size={16} />
            <span>Precio mínimo a partir de:</span>
            <strong className='price-indicator'>${filters.minPrice}</strong>
          </label>
          <input
            type='range'
            id={minPriceFilterId}
            min='0'
            max='2000'
            step='10'
            onChange={handleChangeMinPrice}
            value={filters.minPrice}
            className='range-slider'
          />
        </div>

        <div className='filter-item'>
          <label htmlFor={categoryFilterId} className='filter-label'>
            <span>Categoría:</span>
          </label>
          <select
            id={categoryFilterId}
            onChange={handleChangeCategory}
            value={filters.category}
            className='category-select'
          >
            <option value='all'>Todas las categorías</option>
            {categories.filter(c => c !== 'all').map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}
