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
function Shop() {
  // Loading trigger state 
  const [pageLoading, setPageLoading] = useState(true);
  //  Fetch Data from Custom Hooks 
  const products = UseFetch()


  // Loading Time Set 
  useEffect(() => {
    const loadingTime = setTimeout(() => setPageLoading(false), 2000);
    return () => clearTimeout(loadingTime)
  }, [])

  // play Audio Button 
  const play = () => {
    new Audio(water).play()
  }

  const { storeProduct } = useContext(MyContext)
    // Add product to Array 
  const productHandle = (myProduct) => {
    storeProduct(myProduct)
    play()
  }
  // console.log(myCart);
 
  return (
    <div className='min-h-screen'>
    
          <span className={`flex justify-center duration-100 ${!pageLoading ? 'hidden' : 'block'}`}><Loading ></Loading></span>
          

          <div className={`grid  place-items-center gap-y-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-6 ${pageLoading ? 'hidden' : 'block'}`} >

            {
              products.map((productsList, idx) => {
                return (<MultiActionAreaCard key={idx}  productsList={productsList} showButton={true} {...productsList} productHandle={productHandle} ></MultiActionAreaCard>
                )
              })
            }
          </div>

      }

      {/* <Products key={productsList.id} showAddCart={true} productsList={productsList} productHandle={productHandle} /> */}



    </div>
  )
}

export default Shop 