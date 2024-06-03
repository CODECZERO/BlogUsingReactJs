import React from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <>
      <div className="inset-0 w-fu sm:my-20 sm:pt-1 pt-12 h-full md:ml-56 md:flex-col ">
        <span className='text-xs text-slate-800 hover:text-blue-800 truncate'>Photo by Steve Johnson</span>
        <Link to="https://www.pexels.com/photo/multicolored-abstract-painting-1269968/">
          <img className="w-[450px] h-full " src="https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Photo by Steve Johnson:https://www.pexels.com/photo/multicolored-abstract-painting-1269968/" /> 
        </Link>
        <div>  <h1 className="text-center text-2xl sm:text-5xl font-medium ml-9">Ankit Mahar Project</h1></div>
      </div>
      <div className="font-sans italic text-4xl mt-14 mb-24 text-slate-700 ml-16 md:ml-[800px]">Wlecome <span className=''>Here!</span></div>
      <div className="grid  place-items-center sm:mt-20  md:ml-[800px]">
        <Link to="https://www.pexels.com/photo/green-leaves-1454794/">
          <img className="sm:w-96 w-[450px]" src="https://images.pexels.com/photos/1454794/pexels-photo-1454794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Photo by Min An: https://www.pexels.com/photo/green-leaves-1454794/" />
        </Link>
        <span className='text-xs text-slate-800 hover:text-blue-800 truncate'>Photo by Min An</span>
      </div>

    </>
  )
}