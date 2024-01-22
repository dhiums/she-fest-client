"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

const Navs = () => {
    const router = useRouter()
  return (
    <nav className="hidden lg:block">
    <ul className="flex flex-col items-end gap-1">
      <div className="flex gap-1">
        <li onClick={()=>{
            router.push('/result/final')
    }} className="cursor-pointer bg-yellow hover:bg-yellower transition-colors duration-300 px-3 py-2 border-2 border-black shadow-md rounded-md font-semibold">
          Results
        </li>
        <li onClick={()=>{
            router.push('/profile')
    }}  className="cursor-pointer bg-blue hover:bg-bluer transition-colors duration-300 px-3 py-2 border-2 border-black shadow-md rounded-md font-semibold">
          Candidates
        </li>
      </div>
      <div  className="flex gap-1">
        <li onClick={()=>{
            router.push('/download')
    }} className="cursor-pointer bg-orange hover:bg-oranger transition-colors duration-300 px-3 py-2 border-2 border-black shadow-md rounded-md font-semibold">
          Downloads
        </li>
        <li onClick={()=>{
            router.push('/login')
    }} className="cursor-pointer bg-pink hover:bg-pinker transition-colors duration-300 px-3 py-2 border-2 border-black shadow-md rounded-md font-semibold">
          Login
        </li>
      </div>
    </ul>
  </nav>
  )
}

export default Navs