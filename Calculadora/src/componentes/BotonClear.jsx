import '../hojas-de-estilo/BotonClear.css'
export const BotonClear = ({children, manejarClear}) => (
    <button className='boton-clear' onClick={manejarClear}>
        {children}
    </button>
)