import React from 'react'
import Lottie from "lottie-react";
import loading from '../lottie/loading.json'

const Loading = () => {
  return (
    <Lottie animationData={loading} loop={true} className='lg:w-1/2 -mt-5' />
  )
}

export default Loading