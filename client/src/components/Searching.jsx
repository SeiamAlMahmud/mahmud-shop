import Lottie from 'lottie-react'
import React from 'react'
import searching from '../lottie/searching.json'

const Searching = () => {
  return (
    <Lottie animationData={searching} loop={true} className='lg:w-1/2 -mt-5' />
  )
}

export default Searching