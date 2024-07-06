import React, { useContext } from 'react'
import UseFetch from '../hooks/UseFetch'
import water from '../water/water_notification.mp3'
import { MyContext } from '../contextAPI/MyArrayContext';
import MultiActionAreaCard from './MultiActionAreaCard';
const MySneakers = () => {
  const products = UseFetch();
  const bagList = products.filter(bag => bag.category == "Men's Sneaker")
    console.log(products);

         // play Audio Button 
  const play = () => {
    new Audio(water).play()
  }

  const {storeProduct} = useContext(MyContext)
    // Add product to Array 
    const productHandle = (myProduct) => {
      storeProduct(myProduct)
      play()
    }
  return (
   <>
   <div className='grid place-items-center min-h-screen gap-y-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-6'>
   {
        bagList.map((productsList,idx) => <MultiActionAreaCard key={idx}  productsList={productsList} showButton={true} {...productsList} productHandle={productHandle} ></MultiActionAreaCard>)
    }
   </div>
   </>
  )
}

export default MySneakers