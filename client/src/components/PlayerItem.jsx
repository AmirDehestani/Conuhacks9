import React from 'react'

function PlayerItem({player}) {

    function gamepadIconSVG() {
        return (
            <div>
                <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7H9M7 5V9M14 8H14.01M17 6H17.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 1H3C1.89543 1 1 1.89543 1 3V11C1 12.1046 1.89543 13 3 13H19C20.1046 13 21 12.1046 21 11V3C21 1.89543 20.1046 1 19 1Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        );
    }

  return (
    <div className='bg-[rgba(255,255,255,0.25)] rounded-[3px] py-1 flex flex-row items-center pl-2 pr-3 text-[15px] justify-between'>
        <div className='flex flex-row items-center'>
            <div className='w-[10px] h-[10px] bg-white rounded-full mr-2'></div> <span className='text-[12px] text-white'>{player.name}</span>
        </div>

        <div>{gamepadIconSVG()}</div>
    </div>
  )
}

export default PlayerItem