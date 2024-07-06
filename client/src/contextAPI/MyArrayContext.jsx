import { createContext, useState } from 'react'

export const MyContext = createContext(null);
function MyArrayContext({ children }) {
  const [pdArray, setPdArray] = useState([]);
  const [unique, setUnique] = useState(null);
  const [sumPrice, setSumPrice] = useState(0)

  const storeProduct = (newProduct) => {
    setPdArray((prevProducts) => [...prevProducts, newProduct]);
    console.log(pdArray);
  };

  const removeToArray = (productsCard) => {
    const removeArray = pdArray.filter((elements => elements.id !== productsCard.id))
    setPdArray([...removeArray]);
    console.log(pdArray);
  }
  // Function to find unique elements (considering object properties)
  const findUnique = () => {
    return new Set(pdArray.map((obj) => JSON.stringify(obj))); // Unique Set based on object stringification
  };
  const uniqueSet = findUnique();
  const uniqueArray = Array.from(uniqueSet).map((str) => JSON.parse(str));
  const decreaseArray = (_,idx)=>{
    const clickIdx = pdArray.filter((_,index) => idx !== index);
    setPdArray(clickIdx);
    console.log(pdArray);

  }

  const selectedPrice = pdArray.reduce((prev, last) => {
    return prev = prev + last.price
  }, 0)

  let shipping;
  if (selectedPrice < 75) {
    shipping = 19.99
  } else if (selectedPrice == 75 || selectedPrice > 75) {
    shipping = 40
  }
  
    const vat = selectedPrice / 5;
    const vatVal = Number(vat.toFixed(2))
    const grandTotal = Number((vatVal + selectedPrice + shipping).toFixed(2));

 

  const info = { setPdArray, pdArray, storeProduct, removeToArray, uniqueArray, selectedPrice, vatVal, grandTotal ,shipping, decreaseArray}
  return (
    <MyContext.Provider value={info}>
      {children}
    </MyContext.Provider>
  )
}

export default MyArrayContext

