import { Link } from '../Link.jsx'

export default function AboutPage() {
  return (
    <section className="page-card">
      <h1>About</h1>
      <div className="about-content">
        <img
          className="about-image"
          src="/imagen-about.jpg"
          alt="Foto de Eccy" 
        />
        <p>Hola me llamo Eccy y estoy creando un clon de React Router.</p>
      </div>
      <Link to='/' className="link-button">
        Ir a Home
      </Link>
    </section>
  )
}