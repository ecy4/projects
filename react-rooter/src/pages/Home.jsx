import { Link } from '../Link.jsx'

export default function HomePage() {
  return (
    <section className="page-card">
      <h1>Home</h1>
      <p>Esta es una página de ejemplo para crear un React Router desde cero.</p>
      <Link to='/about' className="link-button">
        Ir a Sobre nosotros
      </Link>
    </section>
  )
}
