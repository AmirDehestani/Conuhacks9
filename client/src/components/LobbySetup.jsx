import React from 'react'
import { useState } from 'react'

function LobbySetup() {

    const [activeSection, setActiveSection] = useState('createLobby')

    function activateCreateLobbySection(){
        setActiveSection('createLobby');
    }

    function activateJoinLobbyCodeSection(){
        setActiveSection('joinLobbyCode');
    }


  return (
    <div className='pt-[75px]'>
        <div className='flex flex-row justify-center gap-[75px]'>
            <div className='w-[450px] h-[280px] cherrybomb text-white flex flex-col gap-5'>
                <div className='text-[50px]'>Lobby Setup</div>
                <div className='opacity-75 text-[15.5px]'>
                    is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley.
                </div>
                <div className='flex flex-row gap-10'>
                    <button className='cherrybomb text-white px-5 py-2 bg-[rgba(255,255,255,0.25)] w-[120px] rounded-[5px] shadow-md mt-3 hover:scale-[105%] cursor-pointer ease-in-out duration-300' onClick={()=>{activateJoinLobbyCodeSection()}}>Join</button>
                    <button className='cherrybomb text-white px-5 py-2 border-2 border-white w-[120px] rounded-[5px] shadow-md mt-3 hover:scale-[105%] cursor-pointer ease-in-out duration-300' onClick={()=> {activateCreateLobbySection()}}>Create</button>
                </div>
            </div>
            <div className='bg-white w-[2px] h-[280px] rounded-full opacity-[35%]'></div>
            <div className='w-[450px] h-[280px]'>
                
                {activeSection === 'createLobby' ?
                
                /* Create Lobby Section */
                <div className='cherrybomb text-white flex flex-col gap-2 text-center'>
                    <div className='text-[50px]'>Game settings</div>
                    <div className='flex flex-col gap-1'>
                        <p>Username</p>
                        <div className='flex justify-center'>
                            <input className='bg-[rgba(255,255,255,0.25)] border-2 border-white rounded-[3px] pl-3 w-[200px]' type="text" />
                        </div>
                    </div>

                    <div className='mt-5'>
                        <button className='cherrybomb text-white bg-[rgba(255,255,255,0.25)] px-5 py-1 rounded-[5px] shadow-md hover:scale-[105%] cursor-pointer ease-in-out duration-300'>Create Lobby</button>
                    </div>

                </div> : activeSection === 'joinLobbyCode'?

                /* join Lobby Section */
                <div>

                    <div className='cherrybomb text-white flex flex-col gap-2 text-center'>
                        <div className='text-[50px]'>Join the game</div>
                        <div className='flex flex-col gap-1'>
                            <p>Username</p>

                            <div className='flex justify-center'>
                                <input className='bg-[rgba(255,255,255,0.25)] border-2 border-white rounded-[3px] pl-3 w-[200px]' type="text" />
                            </div>
                            
                        </div> 

                        <div className='flex flex-col gap-1'>
                            <p>Lobby Code</p>
                            <div className='flex justify-center'>
                                <input className='bg-[rgba(255,255,255,0.25)] border-2 border-white rounded-[3px] pl-3 w-[200px]' type="text" />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <button className='cherrybomb text-white bg-[rgba(255,255,255,0.25)] px-5 py-1 rounded-[5px] shadow-md hover:scale-[105%] cursor-pointer ease-in-out duration-300'>Join</button>
                        </div>
                        
                    </div>
                    

                </div> : 
                
                /* Error */
                <div>error</div>
                
                }
            </div>
        </div>
    </div>
  )
}

export default LobbySetup