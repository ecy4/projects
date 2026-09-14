import { useEffect, useState } from "react";
import './App.css';

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/says/';

export function App() {
    const [fact, setFact] = useState();
    const [imageUrl, setImageUrl] = useState();

    const getRandomFact= () => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => {
                if (!res.ok) throw new Error('Error al obtener el hecho');
                return res.json();
            })
            .then(data => {
                const { fact } = data;
                setFact(fact);
            })
            .catch(error => console.error("Error al obtener los datos:", error));

    }

    
    useEffect(getRandomFact, []);

    
    useEffect(() => {
        if (!fact) return;

        const firstThreeWords = fact.split(' ', 3).join(' ');
        const url = `${CAT_PREFIX_IMAGE_URL}${encodeURIComponent(firstThreeWords)}?fontSize=50&fontColor=red`;
        setImageUrl(url);
    }, [fact]);

    const handleClick = ()=> {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => {
                if (!res.ok) throw new Error('Error al obtener el hecho');
                return res.json();
            })
            .then(data => {
                const { fact } = data;
                setFact(fact);
            })
        
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            <button onClick={handleClick}>Get new fact</button>
            <section>
                {fact && <p>{fact}</p>}
                {imageUrl && (
                    <img 
                        src={imageUrl} 
                        alt={`Gato diciendo las palabras: ${fact}`} 
                    />
                )}
            </section>
        </main>
    );
}