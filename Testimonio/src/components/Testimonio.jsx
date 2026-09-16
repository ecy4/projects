import '../hojas-de-estilos/Testimonio.css'


export function Testimonio({id, Imagen, Nombre, Pais, Cargo, Empresa, TestimonioCliente, eliminar}) {

    return(
        <div className="Testimonio-container">
        
            <img className="imagen-testimonio"
             src= {Imagen}alt="Imagen" 
             />
            <div className="contenedor-texto-testimonio">
               <p className="nombre"><strong>{Nombre}</strong></p> 
               <p className="cargo-empresa">{Cargo} en <strong>{Empresa}</strong></p>
               <p className="pais">{Pais}</p>
               <p className="texto-testimonio">"{TestimonioCliente}"</p>
                 <button onClick={()=> eliminar(id)}>eliminar</button>
                
            </div> 

        </div>

        )
        


}