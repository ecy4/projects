import '../hojas-de-estilo/Contador.css'
export function Contador({ numClics }){
    return(
        <div className="contador">
            {numClics}
        </div>
    )
}