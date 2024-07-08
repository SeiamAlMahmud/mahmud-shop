import React, { useState, useRef, useEffect, useContext } from 'react';
import { MyContext } from '../contextAPI/MyArrayContext';
import { NavLink } from 'react-router-dom';

const Popup = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);
  const { pdArray, removeToArray, storeProduct, uniqueArray, selectedPrice, vatVal, grandTotal, shipping} = useContext(MyContext);

  const handleClickOutside = (event) => {
    if (!popupRef.current || popupRef.current === event.target) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleOpen = () => setIsVisible(true);
  const handleClose = () => setIsVisible(false);

  return (
    <>
      <button className='btn m-1 bg-[#791ce3] text-white hover:bg-teal-500' onClick={handleOpen}>Checkout</button>
      {isVisible && (
        <div
          ref={popupRef}
          className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 transition duration-300 ease-in-out ${
            isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-md p-4 py-7 px-5 mx-2">
          <div className="justify-evenly flex flex-col z-[1]  pl-2  menu p-2 shadow  rounded-box  gap-y-4 min-h-60 overflow-x-hidden">
                       <div className='flex justify-between'><p className='text-xl' >Total items: </p> <span className='text-xl'>{pdArray.length}</span>
                       </div> <hr />
                       <div className='flex justify-between'><p className='text-lg' >Price: </p> <span className='text-lg'>${selectedPrice}</span>
                       </div> <hr />
                       <div className='flex justify-between'><p className='text-lg' >Vat(5%):</p> <span className='text-lg'> ${vatVal}</span>
                       </div> <hr />
                       <div className='flex justify-between'><p className='text-lg' >Shipping Cost: </p> <span className='text-lg'> ${shipping}</span>
                       </div> <hr />
                       <div className='flex justify-between  bg-[#508776] py-3 px-2 rounded text-white'><p className='text-lg md:text-xl ' >Grand Total: </p> <span className='text-lg'> ${grandTotal}</span>
                       </div>
                        
                    </div>
                     {/* on button onClick={handleClose} */}
            <button className="text-white mt-4 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" >
              <NavLink to={'/checkout'}> Processed to Checkout</NavLink>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
