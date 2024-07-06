import React from 'react'
import { NavLink } from 'react-router-dom'

const CheckOut = () => {
  return (
   <>
   <div className="bg-[#5783db] mt-2 text-white p-8 rounded-md shadow- min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold">Thank you for your purchase!</h2>
      <p className="mt-2">
        Welcome to the <span className='bg-[#dd7973] -skew-x-12 rounded-md inline-block py-2 px-4'>Mahmud's Shop</span> family! We're thrilled you chose us.
      </p>
      <p className="mt-4">
        Your order is being processed and you will receive a confirmation email shortly.
      </p>
      <div className="mt-8 flex justify-center">
        <NavLink
         to={'/'}
          className="px-4 py-2 bg-white hover:bg-gray-100 text-green-500 font-bold rounded-md shadow-md"
        >
          Continue Shopping
        </NavLink>
      </div>
    </div>
   </>
  )
}

export default CheckOut