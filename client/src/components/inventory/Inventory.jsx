import React from 'react'
import UseFetch from '../../hooks/UseFetch'

const Inventory = () => {
  const products = UseFetch();
    const handleAddProduct = () => {
  // products[0].roll = 'admin'
      fetch('http://127.0.0.1:3000/addProduct', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(products)
      })
      .then(res=> res.json())
      .then(data=> console.log(data))

      console.log(products[0])
    }
  return (
    <div className='h-screen'>
      <button className='btn btn-success mt-3' onClick={handleAddProduct}>Add Product</button>
    </div>
  )
}

export default Inventory