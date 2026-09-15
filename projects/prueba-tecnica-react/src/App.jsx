import './App.css';
import { useCatImage } from "./hooks/useCatImage";
import { useCatFact } from './hooks/useCatFact';
import { Otro } from './componets/Otro';

export function App() {

    const {fact, refreshFact} = useCatFact()
    const { imageUrl } = useCatImage({ fact })
   
    const handleClick = async ()=> {
       await refreshFact()
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            <button onClick={handleClick}>Get new fact</button>
            <div className='contenedor'>
                <section className='fact1'>
                {fact && <p>{fact}</p>}
                {imageUrl && (
                    <img 
                        src={imageUrl} 
                         alt={`Gato diciendo las palabras: ${fact}`} 
                    />  
                )}
                </section>
                <section>
                    {fact && <p>{fact}</p>}
                    <Otro />
                </section>
            
           
            </div>
            
            
        </main>
    );
}