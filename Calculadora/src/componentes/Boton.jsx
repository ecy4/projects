import '../hojas-de-estilo/Boton.css'

export function Boton({children, manejarClic}) {

    const esOperador = valor => {
        return isNaN(valor) && (valor != '.') && (valor != '=')
    }
    return(
        <div 
            className={`boton-contenedor ${esOperador(children, {manejarClic}) ? 'operador': ''}`.trimEnd()}
            onClick={() => manejarClic(children)}>
            {children} 
        </div>
    )
}