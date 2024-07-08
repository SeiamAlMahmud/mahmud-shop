import { useContext, useEffect, useState } from 'react'
import { MyContext } from '../contextAPI/MyArrayContext'
import { Link } from 'react-router-dom';
import Drawer from './Drawer';

const Navbar = () => {
  const { pdArray: myCart } = useContext(MyContext);
  const [toggleNavbar, setToggleNavbar] = useState(false)

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.querySelector('html').setAttribute("data-theme", theme);
  }, [theme]);


  const toggleHandeler = () => {
    setToggleNavbar(!toggleNavbar)
  
  }
 
  return (
    <div className='relative'>
      <div className="navbar  rounded-lg dark:text-white  bg-[#41B3A3]">
        <div className="flex-1">
          <Link to={"/"} className='py-2 px-4'>
            <button className="btn btn-ghost btn-primary dark:text-white text-xl ">Mahmud's Shop</button>
          </Link>
        </div>
       
        <div className="flex-none ">
          <div className='flex gap-5'>

            <button className=' text-lg px-1 py-3 hidden sm:block rounded-xl  font-bold shadow-blue-400 bg-transparent hover:bg-pink-600 duration-300 hover:border-none dark:text-white'>
              <Link to={"/review"} className='py-1 px-4'> Review </Link>
            </button>
          </div>
          <div className="dropdown dropdown-end ">



            {/* Drawer  */}
            <div className="drawer drawer-end">
              <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="drawer-button ">

                  {/* Set Image  */}

                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ml-2">
                    <div className="indicator ">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      <span className={`badge badge-sm indicator-item ${myCart.length > 0 ? "block" : "hidden"}`}>  {myCart.length}</span>
                      {/* <span className={!cart.length > 0 ? "hidden" : "badge badge-sm indicator-item " }>  {cart.length}</span> */}
                    </div>
                  </div>
                </label>
              </div>
              <div className="drawer-side z-20">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-cyan-400 text-base-content">
                  {/* Sidebar content here */}
                  {
                    myCart.map((items, idx) => <Drawer key={idx} items={items}></Drawer>)
                  }
                </ul>
              </div>
            </div>

          </div>

          <div id='sidebar' onClick={toggleHandeler}>
            {
              !toggleNavbar ? <i className='bx bx-menu text-3xl sm:text-5xl cursor-pointer'></i> : <i className='bx bx-menu-alt-right text-3xl sm:text-5xl cursor-pointer'  ></i>

            }
          </div>
        </div>
      </div>
      <ul className={`bg-[#c1d9de] absolute justify-center items-center w-full z-30 dark:text-black  duration-300 ${toggleNavbar ? 'left-[0]' : 'left-[-170rem]'}`}>
        <li><Link to={'/review'} className='inline-block w-full pl-6 py-2 text-lg shadow-blue-500 border font-semibold'>Review</Link></li>
        <li><Link to={'/'} className='inline-block w-full pl-6 py-2 text-lg shadow-blue-500 border font-semibold'>Home</Link></li>
        <li><Link to={'/'} className='inline-block w-full pl-6 py-2 text-lg shadow-blue-500 border font-semibold'>Home</Link></li>
        <li><Link to={'/'} className='inline-block w-full pl-6 py-2 text-lg shadow-blue-500 border font-semibold'>Home</Link></li>
        <li><Link to={'/'} className='inline-block w-full pl-6 py-2 text-lg shadow-blue-500 border font-semibold'>Home</Link></li>
      </ul>
    </div>
  )
}

export default Navbar