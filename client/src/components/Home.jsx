import React from 'react';
import '../App.css';
import RockSVG from './RockSVG';

function Home() {
  return (
    <div className='px-[150px] pt-[75px]'> 
      
      <div className='flex flex-row justify-center gap-20'>
        <div className='flex flex-col gap-5'>

          <div id='title' className='cherrybomb text-white text-[65px] leading-[60px]'>What Beats Rock Games ?</div>
          <div className='cherrybomb text-white opacity-50 text-[15px]'>
            is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five.
          </div> 
          
          <a href='/lobby-setup' className='cherrybomb text-white px-5 py-2 bg-[rgba(255,255,255,0.25)] w-[120px] rounded-[5px] shadow-md mt-3 hover:scale-[105%] cursor-pointer ease-in-out duration-300'>Play Game</a>
        </div>
        
        <div>
          <RockSVG />
        </div>
      </div>
      
     
      
    </div>
  );
}

export default Home;