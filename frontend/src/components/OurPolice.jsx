import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolice = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between'>
        <div className='flex flex-col items-center justify-center space-y-1'>
            <img src={assets.exchange_icon} alt="icon" className='w-7'/>
            <p className='text-sm space-y-2'>Easy Exchange Policy</p>
            <p className='text-slate-500'>We offer hassle free  exchange policy</p>
        </div>
         <div className='flex flex-col items-center justify-center space-y-1'>
            <img src={assets.quality_icon} alt="icon" className='w-7'/>
            <p className='text-sm space-y-2'>7 Days Return Policy</p>
            <p className='text-slate-500'>We offer hassle free  exchange policy</p>
        </div>
         <div className='flex flex-col items-center justify-center space-y-1'>
            <img src={assets.support_img} alt="icon" className='w-7'/>
            <p className='text-sm space-y-2'>Best Customer Support</p>
            <p className='text-slate-500'>We offer hassle free  exchange policy</p>
        </div>

    </div>
  )
}

export default OurPolice