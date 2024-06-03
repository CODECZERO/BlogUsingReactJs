import React from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    
<div className="mx-auto w-full max-w-7xl">
      <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
        <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
            <h2 className="text-4xl font-bold sm:text-5xl italic">
              Welcome
              <span className="hidden sm:block text-4xl">Here!</span>
            </h2>
          </div>
        </div>
        <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">

          <span className='text-xs text-slate-800 hover:text-blue-800 truncate'>Photo by Steve Johnson</span>
          <Link to=" https://www.pexels.com/photo/multicolored-abstract-painting-1269968/"><img className="w-96" src="https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="image1" /> </Link>
        </div>
      </aside>

      <div className="grid  place-items-center sm:mt-20">
        <img className="sm:w-96 w-48" src="https://images.pexels.com/photos/1454794/pexels-photo-1454794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Photo by Min An: https://www.pexels.com/photo/green-leaves-1454794/" />
        <span className='text-xs text-slate-800 hover:text-blue-800 truncate'>Photo by Min An: https://www.pexels.com/photo/green-leaves-1454794/</span>
      </div>

      <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Lorem Ipsum Yojo</h1>
    </div>
  )
}