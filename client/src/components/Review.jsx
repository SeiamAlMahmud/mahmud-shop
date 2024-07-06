import React, { useContext } from 'react'
import { MyContext } from '../contextAPI/MyArrayContext'
import ReviewCart from './ReviewCart'
import { NavLink } from 'react-router-dom'
import Searching from './Searching'
import MultiActionAreaCard from './MultiActionAreaCard'

function Review() {
    const { pdArray, removeToArray, storeProduct, uniqueArray, selectedPrice, vatVal, grandTotal, shipping} = useContext(MyContext);
   
    const removeCart = (idx) => {
        removeToArray(idx);
    }
    const addCart = (index) => {
        storeProduct(index);
    }
    
   
    return (
        <>
            <div className='flex flex-col  sm:flex-row sm:justify-between mx-5 sm:items-center'>
                <div className="text-2xl breadcrumbs my-4">
                    <ul>
                        <li>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            <NavLink to={'/'}> <span className='mx-2'>Home</span> </NavLink>

                        </li>
                        <li>
                            <span className="inline-flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                <span className='normal-case font-bold'> Review</span>
                            </span>

                        </li>
                    </ul>
                </div>
                {/* Checkout Box  */}
              {
                pdArray.length !== 0 ? (

              <div className="dropdown dropdown-end ">
                    <div tabIndex={0} role="button" className="btn m-1 bg-[#80669d]">CheckOut</div>
                    <span tabIndex={0} className="dropdown-content bg-[#5adbb5] z-[1]  pl-2  menu p-2 shadow relative  rounded-box w-56 gap-y-4 min-h-60">
                        <p className='text-xl' >Total items: {pdArray.length}</p>
                        <p className='text-xl' >Total price: $ {selectedPrice}</p>
                        <p className='text-xl' >Vat(5%): $ {vatVal}</p>
                        <p className='text-xl' >Shipping Cost: $ {shipping}</p>
                        <p className='text-xl inline-block  bg-[#508776] py-1 rounded text-white' >Grand Total: $ {grandTotal}</p>
                       
                    <button className='bg-black py-2  bottom-7  text-white hover:bg-[#57dfd8] hover:text-black' ><NavLink to={"/checkout"}>Check Out</NavLink></button>
                    </span>
                </div>
                ) : ""
              }  
            </div>

            {pdArray.length == 0 ? (
                <div className='items-center justify-end flex relative'>
                    <Searching></Searching>
                    <div className="alert alert-error max-w-56 hidden md:block absolute left-1 lg:left-7 xl:max-w-sm top-28">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 26C22.9 26 22 25.1 22 24V16C22 14.9 22.9 14 24 14C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26ZM26 34H22V30H26V34Z" fill="#E92C2C" />
                        </svg>
                        <div className="flex w-full justify-between">
                            <div className="flex flex-col">
                                <span className="text-content2">You didn't add product.</span>
                            </div>

                        </div>
                    </div>
                </div>

            ) : (<div className='flex justify-center items-center flex-col gap-3 mx-2 '>
                {
                    uniqueArray.map((productsList, index) => <ReviewCart addCart={addCart} index={index} removeCart={removeCart} productsList={productsList} key={index} />)
                }
            </div>


            )}
        </>
    )
}

export default Review