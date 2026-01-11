import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-red-700'>
      <div className='text-center'> 
        <h1 className='text-4xl font-bold mb-4 '>404</h1>
        <p className='text-xl  text-gray-600 mb-4'>Oops page not found</p>
        <Link to={"/"} className='text-blue-500 underline'>
        Return to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
