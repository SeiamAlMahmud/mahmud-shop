import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const Drawer = ({items}) => {
  const {img, name, id} = items;
  return (
   <>
   <div>

   <div className="avatar my-4 items-center gap-5 ">
  <div className="w-24 rounded">
    <img src={img} />
  </div> 
  <NavLink to={`/product/${id}`}>{name} </NavLink>
</div>
   </div>
   </>
  )
}

export default Drawer