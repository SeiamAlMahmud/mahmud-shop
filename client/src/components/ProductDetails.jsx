import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import products from '../productsData/products.json'
import Products from './Products';
import IconBreadcrumbs from './IconBreadcrumbs';
import { CardMedia } from '@mui/material';
import AOS from 'aos';
// import Navbar from './Navbar';
function ProductDetails() {
  const { id } = useParams();
  const [myData, setMyData] = useState([]);
  // AOS call
  AOS.init();
  const updateData = products.find(item => item.id == id)
  const { name, img, seller } = updateData;

  // console.log(id,updateData);
  return (
    <div className='flex flex-col justify-center items-center '>
      {/* Navigation Bar  */}



      <div  className="hero min-h-screen  mt-5 " style={{ backgroundImage: `url(${img})` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-sm">
            <h1 className="mb-5 text-5xl text-white font-bold font-mono">{name}</h1>
            <p className="mb-5 text-3xl text-pink-600 font-semibold">{seller} </p>

          </div>
        </div>
      </div>

      <div className="divider"></div>
  
    </div>
  )
}

export default ProductDetails