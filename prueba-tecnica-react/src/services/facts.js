const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';



export const getRandomFact= async () => {
        try {
        const res = await fetch(CAT_ENDPOINT_RANDOM_FACT);
        if (!res.ok) throw new Error('Error al obtener el hecho');
        const data = await res.json();
        const { fact } = data;
        return fact;
    } catch (error) {
        return console.error("Error al obtener los datos:", error);
    }

    }