import React, { useContext } from 'react'
import { MyContext } from '../contextAPI/MyArrayContext';

function Cart() {
  const { pdArray: myCart,
    sumPrice } = useContext(MyContext)
  // console.log(myCart);
  let shipping = 0;
  if (sumPrice > 0) {
    shipping = 29.99
  } else if (sumPrice > 99) {
    shipping = 19.99
  }


  let vatVal = sumPrice / 5;
  let vat = vatVal.toFixed(2)
  let GrandTotal = sumPrice + Number(vat) + shipping;


  // console.log(props.cart);
  return (
    <>
      <h2>Products Summary: {myCart.length}</h2>
      <br />
      <h1> price: $ {sumPrice}</h1>
      <br />
      <h1>Shipping Cost: $ {shipping}</h1>
      <br />
      <p>Tax + Vat : $ {Number(vat)}</p>
      <p className='text-wrap bg-yellow-600 px-5 py-2 mt-4'>Grand Total: $ {Number(GrandTotal.toFixed(2))}</p>
    </>
  )
}

export default Cart