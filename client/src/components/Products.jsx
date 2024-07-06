import React from 'react'
import { Link, NavLink } from 'react-router-dom';

function Products({productsList, showAddCart, productHandle}) {
    // console.log(props);
    const { name, img, seller, price , id, category} = productsList;
    return (
       <>

<div className="card w-96 my-4 sm:w-72  bg-base-100 shadow-xl ">
        <figure><img src={img} alt="Shoes" /></figure>
        <div className="card-body">
          <NavLink to={`/product/${id}`}>           
          <h2 className="card-title  text-blue-700">{name}</h2>
          </NavLink>
          <p className='font-semibold'>Price: $ {price}</p>
         <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.  </span>
          <div className="card-actions justify-end ">
            <button onClick={() => productHandle(productsList)} className="btn btn-warning">Add Cart</button>
          </div>
        </div>
      </div>
       </>

       
    )
}

export default Products