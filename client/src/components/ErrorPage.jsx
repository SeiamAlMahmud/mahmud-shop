import { NavLink, useRouteError } from "react-router-dom";
import error from '../lottie/error.json';
import Lottie from "lottie-react";
import Navbar from './Navbar'
import Footer from './Footer'
export default function ErrorPage() {
  // const error = useRouteError();

  return (
   <>
   <Navbar></Navbar>
   <div className=" min-h-screen bg-white flex items-center justify-center ">
      <div className="max-w-4xl text-center space-y-8">
        <Lottie animationData={error} loop={true} className=' -mt-5' />

        <button>
          <NavLink to={'/'} className="py-2 btn btn-error px-4 hover:bg-black hover:text-white mb-20  transition duration-300">
            Go Back Home
          </NavLink>

        </button>
      </div>
    </div>
   <Footer></Footer>
   </>
  );
}