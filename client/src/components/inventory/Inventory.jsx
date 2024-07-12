import React, { useState } from 'react'
import UseFetch from '../../hooks/UseFetch'
import toast from 'react-hot-toast';
import axios from 'axios';
const Inventory = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [file, setFile] = useState(null)
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [description, setDescription] = useState('')
  const products = {
    name,
    price,
    quantity,
    file,
    category,
    description
   
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
 
  if (!name) {
    toast.error('Fill name input')
  }
  if (!description) {
    toast.error('Fill description input')
  }
  if (!file) {
    toast.error('Fill File input')
  }
  if (!price) {
    toast.error('Fill Price input')
  }
  if (!quantity) {
    toast.error('Fill Quantity input')
  }
    // products[0].roll = 'admin'
   
    if(file && price && quantity && name && description){
      
      
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('description', description);
    
        try {
          const response = await axios.post('http://127.0.0.1:3000/addProduct', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(response.data);
          toast.success('Product added successfully');
          // Clear form fields
          // setFile(null);
          // setName('');
          // setPrice('');
          // setQuantity('');
        } catch (error) {
          console.error('Error uploading product:', error);
          toast.error('Error uploading product');
        }
      
      
    }
    }
  return (
    <div className='h-screen mb-32 mt-7'>
      <form action="/addProduct" onSubmit={handleAddProduct} className=' flex flex-col justify-center items-center gap-3'>
        <p className='flex flex-col justify-start text-xl font-semibold'>
          <label htmlFor="1int">Product Name:</label>
          <input type="text" onChange={e => setName(e.target.value)} className='bg-gray-300 font-normal border-none outline-1 px-1 py-1 rounded-md w-64' id="1int" />
        </p>
        <p className='flex flex-col justify-start text-xl font-semibold'>
          <label htmlFor="2int">Category:</label>
          <input type="text" onChange={e => setCategory(e.target.value)} className='bg-gray-300 font-normal border-none outline-1 px-1 py-1 rounded-md w-64' id="2int" />
        </p>
       
        <p className='flex flex-col justify-start text-xl font-semibold'>
          <label htmlFor="3int">Price</label>
          <input type="text" onChange={e => setPrice(e.target.value)} className='bg-gray-300 font-normal border-none outline-1 px-1 py-1 rounded-md w-64' id="3int" />
        </p>
        <p className='flex flex-col justify-start text-xl font-semibold'>
          <label htmlFor="4int">Quantity </label>
          <input type="text" onChange={e => setQuantity(e.target.value)} className='bg-gray-300 font-normal border-none outline-1 px-1 py-1 rounded-md w-64' id="4int" />
        </p>
        <p className='flex flex-col justify-start text-xl font-semibold'>
          <label htmlFor="4int">Product Image: </label>
          <input type="file" onChange={e => setFile(e.target.files[0])} accept='png,jpeg,jpg,svg' className='bg-gray-300 font-normal border-none outline-1 px-1 py-1 rounded-md w-64' id="4int" />
        </p>
        <p className='flex flex-col justify-start text-xl font-semibold'>
          <label htmlFor="4int">Description: </label>
          <textarea type="text" onChange={e => setDescription(e.target.value)} className='bg-gray-300 font-normal border-none outline-1 px-1 py-1 rounded-md w-64 resize-x text-sm h-48 ' id="4int" />
        </p>
        <button type='submit' className='btn btn-success mt-3' >Add Product</button>
      </form>
    </div>
  )
}

export default Inventory