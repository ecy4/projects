import { Link } from '../Link.jsx'

export default function Page404 () {
  return (
    <section className="page-card not-found">
      <h1 className="not-found-title">404</h1>
      <img
        className="not-found-image"
        src="https://images.openai.com/static-rsc-4/2mdlcw4Ur3u8fit4kMLOWVo_MMq7ldgCzilFjrbu2FcoyvOrDjvL4htTZAYjSPVzqEGHNUpKDIzNGbdq26GA-kPUtpyVtNSkn69D4hKhu8BQE0IF6lSl4PmVreI33EhOC4soLk4KDRJLIF05KSqWR_o711jwD9Sl3e9JF3z8nJ2RufR_BbyuU_n0yDWnwX4f?purpose=fullsize"
        alt="Nave a la deriva" 
      />
      <h2>🚀 ¡Houston, tenemos un 404!</h2>

      <div className="not-found-text">
        <p>No pudimos contactar con la base.</p>
        <p>Parece que se ha perdido la conexión.</p>
      </div>

      <Link to='/' className="link-button">
        Volver a la base
      </Link>
    </section>
  )
}