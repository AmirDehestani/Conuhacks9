import React from 'react'
import RockSVG from './RockSVG'

function HowToPlay() {
    
  return (
    <div>
        <div>

<div className='flex flex-row justify-center items-center'>
    <div className='transform scale-x-[-1]'><RockSVG/></div>
    <div className='text-white cherrybomb text-[75px]'>How To Play ?!</div >
    <div><RockSVG/></div>
</div>

</div>

<div>
    <div className='text-center text-white opacity-[70%] cherrybomb'>1. Start with Rock: The game begins with the object Rock.</div>
    <div className='text-center text-white opacity-[70%] cherrybomb'>2. Take Turns: Players take turns entering an object that beats the previous object in the sequence.</div>
    <div className='text-center text-white opacity-[70%] cherrybomb'>- For example: Paper beats Rock, Fire beats Paper, Water beats Fire, and so on.</div>
    <div className='text-center text-white opacity-[70%] cherrybomb'>3. Time Limit: Each player has a limited time to make their move.</div>
    <div className='text-center text-white opacity-[70%] cherrybomb'>- If you run out of time or pick an object that doesn't beat the previous one, you lose.</div>
    <div className='text-center text-white opacity-[70%] cherrybomb'>4. No Repeating Objects: Once an object has been used, no one can use it again. Each player must choose a new object each time.</div>
    <div className='text-center text-white opacity-[70%] cherrybomb'>5. Last Player Standing Wins: The game continues until only one player remains. The last player standing is the winner!</div>
</div>
    </div>
    

    
  )
}

export default HowToPlay

