import { useEffect } from "react"
import { Link } from "../Link.jsx"

export default function SearchPage({ routeParams }) {
  useEffect(() => {
    document.title = `Has buscado ${routeParams.query}`
  }, [routeParams.query])

  return (
    <section className="page-card">
      <h1>Has buscado: {routeParams.query}</h1>
      <Link to="/" className="link-button">
        Volver a Home
      </Link>
    </section>
  )
}