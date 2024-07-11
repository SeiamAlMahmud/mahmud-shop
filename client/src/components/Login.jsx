import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../contextAPI/MyArrayContext';
import { useNavigate ,useLocation} from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState(1)
  // console.log(import.meta.env.API_KEY)
  const { setUserName, setEmail, setPassword, handleSignUp, user, setUser, handleSignIn ,isActive} = useContext(MyContext)

  useEffect(()=> {
if(user || isActive === true){
  navigate('/')
}
  },[user,isActive])
  
  return (
    <div className='flex flex-col gap-6 text-center justify-center items-center my-4'>
      <div className="flex gap-5 mt-6">
        <div className={`border-sky-500 border px-3 py-2  rounded-md cursor-pointer  duration-150 ${tab === 1 ? 'hover:bg-sky-700 bg-sky-400' : ''}`} onClick={() => setTab(1)}>Login</div>
        <div className={`border-sky-500 border px-3 py-2 rounded-md cursor-pointer  duration-150 ${tab === 2 ? 'hover:bg-sky-700 bg-sky-400' : ''}`} onClick={() => setTab(2)}>Registration</div>

      </div>
      <div className='h-64'>
        <div className={`flex flex-col gap-5  ${tab === 2 ? 'block' : 'hidden'}`}>
          <input type="text" className='text-black px-2 py-2 outline-none border-none bg-gray-200 placeholder:text-gray-500 rounded' name='name' placeholder='Your Name' onChange={(e) => setUserName(e.target.value)} required />
          <input type="email" className='text-black px-2 py-2 outline-none border-none bg-gray-200 placeholder:text-gray-500 rounded' name='email' placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} min={8} max={20} required />
          <input type="password" className='text-black px-2 py-2 outline-none border-none bg-gray-200 placeholder:text-gray-500 rounded' name='password' placeholder='Your Password' onChange={(e) => setPassword(e.target.value)} required />
          <button className='text-black px-2 py-2 outline-none border-none bg-green-400 hover:bg-green-500 duration-100 rounded' onClick={handleSignUp}>Sign up</button>
        </div>


        <div className={`flex flex-col gap-5 ${tab === 1 ? 'block' : 'hidden'}`}>
          <input type="text" className='text-black px-2 py-2 outline-none border-none bg-gray-200 placeholder:text-gray-500 rounded' name='email' placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" className='text-black px-2 py-2 outline-none border-none bg-gray-200 placeholder:text-gray-500 rounded' name='password' placeholder='Your Password' onChange={(e) => setPassword(e.target.value)} required />
          <button className='text-black px-2 py-2 outline-none border-none bg-green-400 hover:bg-green-500 duration-100 rounded' onClick={handleSignIn}>Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default Login