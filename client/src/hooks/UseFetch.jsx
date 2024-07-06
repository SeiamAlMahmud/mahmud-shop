import axios from 'axios';
import { useEffect, useState } from 'react';
import arrayShuffle from 'array-shuffle';

function UseFetch() {
  const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const url = "/products.json"
        axios(url)
          .then(axiosData => setProducts(arrayShuffle(axiosData.data)))
      }, [])
  return products
}

export default UseFetch