import { useContext } from "react";
import { MyContext } from "../contextAPI/MyArrayContext";

const ReviewCart = ({ productsList, removeCart, addCart ,index}) => {
    const { name, id, img, seller, price } = productsList;
    const {pdArray,decreaseArray} = useContext(MyContext);
    const counterArray = pdArray.filter(items => items.id == productsList.id);
  
    
    return (
        <>


            <div className=' flex flex-col justify-center items-center'>
                <div className='flex lg:gap-36 gap-10 mx-16 flex-col sm:flex-row items-center'>
                    <img src={img} alt={name} className=' sm:w-1/5 sm:h-1/5 md:w-1/6 md:h-1/6  bg-base-200' />
                    <div className='flex-col relative '>
                        <h1 className='text-2xl lg:text-2xl'>{name}</h1>
                        <p className='mt-6 text-xl'>By: {seller}</p>
                        <p className='mt-6 mb-32 text-xl'>Price: $ {price}</p>
                        <div className='absolute bottom-0 flex gap-5  justify-center items-center'>
                            <button onClick={() => addCart(productsList)} className='border bg-green-300 py-2 px-4 rounded-lg  hover:bg-green-400 ease-in-out duration-300'>+</button>

                            <p>{counterArray.length}</p>

                            <button onClick={()=> decreaseArray(productsList,index)}  className='border bg-red-200 py-2 px-4 rounded-lg  hover:bg-red-400 ease-in-out duration-300'>-</button>

                            <button onClick={() => removeCart(productsList)} className='border bg-red-300 py-2 px-4 rounded-lg hover:bg-red-400 ease-in-out duration-300'> <i className='bx bx-no-entry'></i> </button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="divider"></div>
        </>
    )
}

export default ReviewCart