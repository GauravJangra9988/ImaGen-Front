import React, { useContext } from 'react'
import { plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const BuyCredit = () => {

  const {user} = useContext(AppContext) 

  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose Plans</h1>
    
      <div className='flex gap-4 flex-wrap text-left justify-center'>
        {plans.map((items,index)=>(
          <div key={index} className='bg-white drop-shadow-sm border rounded-lg py-10 px-20 text-gray-600 hover:scale-110 transition-all duration-500 '>
            <p className='text-2xl font-medium'>{items.id}</p>
            <p>{items.desc}</p>
            <p><span className='text-2xl font-medium'>Rs.{items.price}</span> / {items.credits} credits</p>
            <button className='mt-5 rounded-full bg-black text-white whitespace-nowrap px-2 py-2 hover:scale-110 transition all duration-200'>{user ? 'Get Credits Now' : 'Get Started'}</button>
          </div>
        ))}
      </div>
    
    </div>
  )
}

export default BuyCredit