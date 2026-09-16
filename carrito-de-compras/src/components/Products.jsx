import { AddToCartIcon } from './Icons.jsx'
export function Products( { products }) {

    return (
        <main className='products'>
            <ul>
                {products.length === 0 ? (
                    <p> productos no disponibles </p>
                ): (
                    products.map((product) => (
                        <li key={product.id} >
                            <article>
                                <img src={product.images[0]} alt={product.name} />
                                <h3>{product.title}</h3>
                                <p>${product.price}</p>
                                <button onClick={() => console.log(`Agregando ${product.title} al carrito`)}>
                                    <AddToCartIcon />
                                </button>
                            </article>
                        </li>
                    ))
                )}
            </ul>   
        </main>
    )
}