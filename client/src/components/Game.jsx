import React, { useState } from 'react';
import ObjectHistoryItem from './ObjectHistoryItem';
import PlayerItem from './PlayerItem';

function Game() {
  const objectItem = { id: 1, objectName: 'Rock' };
  const playerItem = { id: 1, name: 'Player_1' };

  const [usersList, setUsersList] = useState([playerItem]);
  const [objectsHistory, setObjectsHistory] = useState([objectItem]);
  const [playerTurn, setPlayerTurn] = useState('Player_1');
  const [currentUser, setCurrentUser] = useState({ id: 1, name: 'Player_1' });
  const [previousObject, setPreviousObject] = useState('Rock');
  const [currentObject, setCurrentObject] = useState('????');

  function SendAnswer(){
    const input = document.getElementById('inputAnswer');
    setCurrentObject(input.value);
    input.value = '';
  }

  function userIconSVG() {
    return (
      <div>
        <svg width="25" viewBox="0 0 107 134" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="54.8049" cy="39.1463" rx="39.1463" ry="39.1463" fill="#BCBCBC" />
          <path d="M0 133.097C0 107.154 21.0317 86.1218 46.9756 86.1218H60.0244C85.9683 86.1218 107 107.154 107 133.097V133.097H0V133.097Z" fill="#BCBCBC" />
        </svg>
      </div>
    );
  }

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col gap-5'>
        {/* TOP SECTION */}
        <div className='flex flex-row justify-between w-[974px] h-[40px]'>
          <div className='flex flex-row items-center gap-5'>
            <div className='bg-white w-[50px] h-[50px] rounded-full shadow-md'>
              <div className='flex justify-center items-center w-full h-full'>
                {userIconSVG()}
              </div>
            </div>
            <div id={currentUser.id} className='text-white'>{currentUser.name}</div>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className='flex justify-center'>
          <div className='flex flex-row gap-3'>
            <div className='flex flex-col gap-3'>
              <div className='w-[250px] h-[150px] bg-[rgba(255,255,255,0.25)] rounded-[3px] p-4'>
                <div className='cherrybomb text-white underline'>Players</div>
                <div className='flex flex-col gap-1 mt-2 pr-1 h-[90px] overflow-y-auto'>
                  {usersList.length !== 0 ? usersList.map((user) => <PlayerItem player={user} />) 
                  : <div className='text-white'>Empty</div>}
                </div>
              </div>
              <div className='w-[250px] h-[150px] bg-[rgba(255,255,255,0.25)] rounded-[3px] p-4'>
                <div className='cherrybomb text-white underline'>Player Turn</div>
                <div className='cherrybomb text-white text-[30px] mt-5'>{playerTurn}</div>
              </div>
            </div>
            <div className='w-[450px] h-[312px] bg-[rgba(255,255,255,0.25)] rounded-[3px] p-4 flex flex-col gap-5'>
              <div className='cherrybomb text-white underline'>Game Arena</div>
              <div className='flex flex-row gap-5 justify-center cherrybomb text-white items-center mt-5'>
                <div className='text-[35px]'>{previousObject}</div>
                <div className='bg-[rgba(0,0,0,0)] border-[5px] border-white w-[75px] h-[75px] rounded-full shadow-md flex justify-center items-center'>
                  <span className='text-[25px]'>VS</span>
                </div>
                {/* use  animate-bounce to make the text bounce*/}
                <div className='text-[35px]'>{currentObject}</div>
              </div>
              <div className='text-white text-center text-[15px]'>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley.
              </div>
            </div>
            <div className='w-[250px] h-[312px] bg-[rgba(255,255,255,0.25)] rounded-[3px] p-4'>
              <div className='cherrybomb text-white underline'>Object's History</div>
              <div className='flex flex-col gap-1 mt-2 pr-1 h-[245px] overflow-y-auto '>
                {objectsHistory.length !== 0 ? objectsHistory.map((object) => <ObjectHistoryItem key={object.id} object={object} />)
                  :
                  <div className='text-white'>Empty</div>}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className='flex justify-center'>
          <div className='flex flex-row gap-5 cherrybomb'>
            <div>
              <input id='inputAnswer' type="text" className='text-[25px] rounded-[3px] px-2 border-2 border-white bg-[rgba(255,255,255,0.25)] text-white w-[250px]' />
            </div>
            <div className='bg-white rounded-[3px] hover:scale-[105%] cursor-pointer ease-in-out duration-300 shadow-md'>
              <div onClick={()=>{SendAnswer()}} className='py-2 px-5 rounded-[3px] text-transparent bg-clip-text bg-gradient-to-r from-[#7D00C6] to-[#DF00A4]'>SEND</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;