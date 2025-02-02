import React, { useContext, useEffect, useState } from 'react';
import UserCard from './UserCard';
import { LobbyContext } from '../contexts/LobbyContext.js';
import { UsersContext } from '../contexts/UsersContext.js';
import { socket } from './LobbySetup.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

let currentPlayerName = '';

function Lobby() {
    const { usersList, setUsersList } = useContext(UsersContext);
    const { lobbyCode } = useContext(LobbyContext);
    const location = useLocation();
    const isHost = location.state?.isHost || false;
    const navigate = useNavigate();

    function startGame() {
        socket.emit('startGame', lobbyCode);
    }

    useEffect(() => {
        // fetch users list from server
        socket.on('usersList', (users, hostId) => {
            if (hostId === socket.id) {
                console.log(`HOST ID: ${hostId}`);
            } else {
                console.log(`USER ID THAT ISNT HOST ID: ${hostId}`);
            }
            setUsersList(users);
        });

        socket.on('gameStarted', () => {
            console.log('supposed to nav');
            navigate('/game');
        });
    }, []);

    return (
        <div className="">
            <div className="flex flex-row justify-center gap-[75px]">
                <div className="w-[450px] h-[350px] text-white flex flex-col gap-5">
                    <div className="cherrybomb">
                        <div className="text-[50px]">Lobby</div>
                        <div className="text-[25px]">Users</div>
                    </div>

                    <div className="flex flex-col gap-2 h-[200px] overflow-auto">
                        {/* map users here*/}
                        {usersList.length !== 0 ? (
                            usersList.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))
                        ) : (
                            <div></div>
                        )}

                        <div className="animate-pulse cherrybomb">
                            Waiting for players...
                        </div>
                    </div>
                </div>
                <div className="bg-white w-[2px] h-[280px] rounded-full opacity-[35%] mt-5 "></div>

                <div className="w-[450px] h-[280px] flex justify-items-center items-center">
                    <div>
                        <div className="cherrybomb text-white flex flex-col gap-2 ">
                            <div className="text-[35px]">Lobby Code:</div>
                            <div className="flex flex-col gap-1">
                                <input
                                    className="bg-[rgba(255,255,255,0)] border-2 border-white rounded-[3px] text-center w-[250px] text-[35px]"
                                    type="text"
                                    value={lobbyCode}
                                />
                            </div>

                            {isHost && (
                                <div className="mt-2">
                                    <button
                                        onClick={() => startGame(lobbyCode)}
                                        className="cherrybomb text-white bg-[rgba(255,255,255,0.25)] px-5 py-1 rounded-[5px] shadow-md hover:scale-[105%] cursor-pointer ease-in-out duration-300"
                                    >
                                        Start Game
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lobby;
