import { useEffect, useState } from "react";

export function useCatImage({ fact }) {
    const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/says/';

    const [imageUrl, setImageUrl] = useState();
    useEffect(() => {
    if (!fact) return;

    const firstThreeWords = fact.split(' ', 3).join(' ');
    const url = `${CAT_PREFIX_IMAGE_URL}${encodeURIComponent(firstThreeWords)}?fontSize=50&fontColor=red`;
    setImageUrl(url);
    }, [fact]);
    return  { imageUrl } 
    
}