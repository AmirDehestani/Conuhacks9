import React from 'react'

function NavBar() {
  return (
    <div className='flex justify-center py-10'>
        <div className='cherrybomb text-white flex flex-row gap-5'>
            <a className='px-3 py-1 hover:scale-[105%] cursor-pointer ease-in-out duration-300' href="/">Home</a>
            <a className='px-3 py-1 hover:scale-[105%] cursor-pointer ease-in-out duration-300' href="/createJoin">Play</a>
            <a className='bg-[rgba(255,255,255,0.25)] rounded-[5px] shadow-md hover:scale-[105%] cursor-pointer ease-in-out duration-300 px-3 py-1' href="/info">How to play ?</a>
        </div>
    </div>
  )
}

export default NavBar