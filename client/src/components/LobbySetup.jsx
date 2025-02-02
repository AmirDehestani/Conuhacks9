import React, { useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { LobbyContext } from '../contexts/LobbyContext.js';
import { UsersContext } from '../contexts/UsersContext.js';

export const socket = io('http://25.46.70.149:5000');

function LobbySetup() {
    const [activeSection, setActiveSection] = useState('createLobby');
    const [playerName, setPlayerName] = useState('');
    const { lobbyCode, setLobbyCode } = useContext(LobbyContext);
    const { setUsersList } = useContext(UsersContext);
    const navigate = useNavigate();

    function activateCreateLobbySection() {
        setActiveSection('createLobby');
    }

    function activateJoinLobbyCodeSection() {
        setActiveSection('joinLobbyCode');
    }

    function createLobby() {
        socket.emit('createLobby', playerName.trim(), (response) => {
            if (response.status === 'Success') {
                console.log(`Lobby created by: ${playerName}`);
                setLobbyCode(response.lobbyCode);
                setUsersList(response.players);
                navigate('/lobby', { state: { isHost: true } });
            }
            console.log(response.error);
        });
    }

    function joinLobby() {
        socket.emit(
            'joinLobby',
            { lobbyId: lobbyCode, playerName: playerName.trim() },
            (response) => {
                if (response.status === 'Success') {
                    console.log(`Lobby join by: ${playerName}`);
                    setUsersList(response.players);
                    navigate('/lobby');
                }
                console.log(response.error);
            }
        );
    }

    return (
        <div className="pt-[75px]">
            <div className="flex flex-row justify-center gap-[75px]">
                <div className="w-[450px] h-[280px] cherrybomb text-white flex flex-col gap-5">
                    <div className="text-[50px]">Lobby Setup</div>
                    <div className="opacity-75 text-[15.5px]">
                        This is the page to join or create a lobby. 
                        You can create a lobby to start a new game and invite others to join, 
                        or you can join a lobby by entering a lobby code and jumping into the 
                        game with other players.
                    </div>
                    <div className="flex flex-row gap-10">
                        <button
                            className="cherrybomb text-white px-5 py-2 bg-[rgba(255,255,255,0.25)] w-[120px] rounded-[5px] shadow-md mt-3 hover:scale-[105%] cursor-pointer ease-in-out duration-300"
                            onClick={() => {
                                activateJoinLobbyCodeSection();
                            }}
                        >
                            Join
                        </button>
                        <button
                            className="cherrybomb text-white px-5 py-2 border-2 border-white w-[120px] rounded-[5px] shadow-md mt-3 hover:scale-[105%] cursor-pointer ease-in-out duration-300"
                            onClick={() => {
                                activateCreateLobbySection();
                            }}
                        >
                            Create
                        </button>
                    </div>
                </div>
                <div className="bg-white w-[2px] h-[280px] rounded-full opacity-[35%]"></div>
                <div className="w-[450px] h-[280px]">
                    {activeSection === 'createLobby' ? (
                        /* Create Lobby Section */
                        <div className="cherrybomb text-white flex flex-col gap-2 text-center">
                            <div className="text-[50px]">Game settings</div>
                            <div className="flex flex-col gap-1">
                                <p>Username</p>
                                <div className="flex justify-center">
                                    <input
                                        className="bg-[rgba(255,255,255,0.25)] border-2 border-white rounded-[3px] pl-3 w-[200px]"
                                        type="text"
                                        onChange={(e) =>
                                            setPlayerName(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="mt-5">
                                <button
                                    className="cherrybomb text-white bg-[rgba(255,255,255,0.25)] px-5 py-1 rounded-[5px] shadow-md hover:scale-[105%] cursor-pointer ease-in-out duration-300"
                                    onClick={createLobby}
                                >
                                    Create Lobby
                                </button>
                            </div>
                        </div>
                    ) : activeSection === 'joinLobbyCode' ? (
                        /* join Lobby Section */
                        <div>
                            <div className="cherrybomb text-white flex flex-col gap-2 text-center">
                                <div className="text-[50px]">Join the game</div>
                                <div className="flex flex-col gap-1">
                                    <p>Username</p>

                                    <div className="flex justify-center">
                                        <input
                                            className="bg-[rgba(255,255,255,0.25)] border-2 border-white rounded-[3px] pl-3 w-[200px]"
                                            type="text"
                                            onChange={(e) =>
                                                setPlayerName(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p>Lobby Code</p>
                                    <div className="flex justify-center">
                                        <input
                                            className="bg-[rgba(255,255,255,0.25)] border-2 border-white rounded-[3px] pl-3 w-[200px]"
                                            type="text"
                                            onChange={(e) =>
                                                setLobbyCode(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <button
                                        className="cherrybomb text-white bg-[rgba(255,255,255,0.25)] px-5 py-1 rounded-[5px] shadow-md hover:scale-[105%] cursor-pointer ease-in-out duration-300"
                                        onClick={joinLobby}
                                    >
                                        Join
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Error */
                        <div>error</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LobbySetup;
