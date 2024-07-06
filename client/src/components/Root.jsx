import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import PersistentDrawerRight from './PersistentDrawerRight'
function Root() {
  return (
    <div className='  lg:mt-2'>
      <PersistentDrawerRight />
       {/* <Navbar></Navbar> */}
        <Outlet />
        <Footer></Footer>
    </div>
  )
}

export default Root