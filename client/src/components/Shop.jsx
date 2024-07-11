import { useContext } from 'react'
import { useEffect, useState } from 'react';
import Products from './Products';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import { MyContext } from '../contextAPI/MyArrayContext';
import UseFetch from '../hooks/UseFetch';
import Loading from './Loading';
import MultiActionAreaCard from './MultiActionAreaCard';
import water from '../water/water_notification.mp3'
import 'ldrs/lineSpinner'


function Shop() {
  // Loading trigger state 
  const [pageLoading, setPageLoading] = useState(true);
  const [pageLoading2, setPageLoading2] = useState(true);
  const { storeProduct,count, setCount,products } = useContext(MyContext)
  //  Fetch Data from Custom Hooks 
console.log(products)

  // Loading Time Set 

  useEffect(() => {
    const loadingTime = setTimeout(() => setPageLoading2(false), 50);
    return () => clearTimeout(loadingTime)
  }, [])
  useEffect(() => {
    const loadingTime = setTimeout(() => setPageLoading(false), 50);
    
    return () => clearTimeout(loadingTime)
  }, [])
  
  // play Audio Button 
  const play = () => {
    new Audio(water).play()
  }

    // Add product to Array 
  const productHandle = (myProduct) => {
    storeProduct(myProduct)
    play()
  }
  // console.log(myCart);
 
  return (
    <div className='min-h-screen'>
    
          <span className={`flex justify-center items-center h-screen bg-gray-600 bg-opacity-70  duration-100 ${!pageLoading ? 'hidden' : 'block'}`}>
<l-line-spinner
  size="60"
  speed="1"
  color="white" 
></l-line-spinner></span>
          

          <div className={`grid  place-items-center gap-y-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-6 ${pageLoading2 ? 'hidden' : 'block'}`} >

            {
              products.map((productsList, idx) => {
                return (<MultiActionAreaCard key={idx}  productsList={productsList} showButton={true} {...productsList} productHandle={productHandle} ></MultiActionAreaCard>
                )
              })
            }
          </div>

    

      {/* <Products key={productsList.id} showAddCart={true} productsList={productsList} productHandle={productHandle} /> */}



    </div>
  )
}

export default Shop 