import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ObjectHistoryItem from './ObjectHistoryItem';
import PlayerItem from './PlayerItem';
import { socket } from './LobbySetup';
import { LobbyContext } from '../contexts/LobbyContext.js';

function Game() {
    const location = useLocation();
    const gameData = location.state.gameData.data;
    const [usersList, setUsersList] = useState(gameData.players);
    const [objectsHistory, setObjectsHistory] = useState(
        gameData.game.previousMoves
    );
    const [playerTurn, setPlayerTurn] = useState(
        gameData.game.alivePlayers[gameData.game.currentTurnIndex]
    );
    const [currentUser, setCurrentUser] = useState({ id: 1, name: 'Player_1' });
    const [previousObject, setPreviousObject] = useState(objectsHistory[0]);
    const [currentObject, setCurrentObject] = useState('????');
    const [reasoning, setReasoning] = useState('');
    const [roundInProgress, setRoundInProgress] = useState(true);

    const [item, setItem] = useState('');
    const { lobbyCode } = useContext(LobbyContext);

    function playerMove() {
        // IMPORTANT TODO: don't allow sending multiple requests
        socket.emit('playerMove', { lobbyCode, item });
    }

    function nextRound() {
        socket.emit('nextRound', lobbyCode);
    }

    function userIconSVG() {
        return (
            <div>
                <svg
                    width="25"
                    viewBox="0 0 107 134"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <ellipse
                        cx="54.8049"
                        cy="39.1463"
                        rx="39.1463"
                        ry="39.1463"
                        fill="#BCBCBC"
                    />
                    <path
                        d="M0 133.097C0 107.154 21.0317 86.1218 46.9756 86.1218H60.0244C85.9683 86.1218 107 107.154 107 133.097V133.097H0V133.097Z"
                        fill="#BCBCBC"
                    />
                </svg>
            </div>
        );
    }

    useEffect(() => {
        socket.on('updateGame', (res) => {
            const data = res.data;
            console.log('Updated Data:', data);
            setObjectsHistory(data.game.previousMoves);
            setPlayerTurn(data.game.alivePlayers[data.game.currentTurnIndex]);
            setPreviousObject(data.game.previousMoves.slice(-1)[0]);
            setCurrentObject('????');
            setReasoning('');
            setRoundInProgress(true);
        });

        socket.on('roundFinished', (res) => {
            const { roundItem, roundWinner, roundMessage } = res;
            setReasoning(roundMessage);
            setCurrentObject(roundItem);
            setRoundInProgress(false);
        });

        socket.on('playerEliminated', (res) => {
            const { alivePlayers } = res;
            setUsersList(alivePlayers);
        });
    }, []);

    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-5">
                {/* TOP SECTION */}
                <div className="flex flex-row justify-between w-[974px] h-[40px]">
                    <div className="flex flex-row items-center gap-5">
                        <div className="bg-white w-[50px] h-[50px] rounded-full shadow-md">
                            <div className="flex justify-center items-center w-full h-full">
                                {userIconSVG()}
                            </div>
                        </div>
                        <div id={currentUser.id} className="text-white">
                            {currentUser.name}
                        </div>
                    </div>
                </div>
                {/* MIDDLE SECTION */}
                <div className="flex justify-center">
                    <div className="flex flex-row gap-3">
                        <div className="flex flex-col gap-3">
                            <div className="w-[250px] h-[150px] bg-[rgba(255,255,255,0.25)] rounded-[3px] p-4">
                                <div className="cherrybomb text-white underline">
                                    Players
                                </div>
                                <div className="flex flex-col gap-1 mt-2 pr-1 h-[90px] overflow-y-auto">
                                    {usersList.length !== 0 ? (
                                        usersList.map((user) => (
                                            <PlayerItem player={user} />
                                        ))
                                    ) : (
                                        <div className="text-white">Empty</div>
                                    )}
                                </div>
                            </div>
                            <div className="w-[250px] h-[150px] bg-[rgba(255,255,255,0.25)] rounded-[3px] p-4">
                                <div className="cherrybomb text-white underline">
                                    Player Turn
                                </div>
                                <div className="cherrybomb text-white text-[30px] mt-5">
                                    {playerTurn.name}
                                </div>
                            </div>
                        </div>
                        <div className="w-[450px] h-[312px] bg-[rgba(255,255,255,0.25)] rounded-[3px] p-4 flex flex-col gap-5">
                            <div className="cherrybomb text-white underline">
                                Game Arena
                            </div>
                            <div className="flex flex-row gap-5 justify-center cherrybomb text-white items-center mt-5">
                                <div className="text-[35px]">
                                    {previousObject}
                                </div>
                                <div className="bg-[rgba(0,0,0,0)] border-[5px] border-white w-[75px] h-[75px] rounded-full shadow-md flex justify-center items-center">
                                    <span className="text-[25px]">VS</span>
                                </div>
                                {/* use  animate-bounce to make the text bounce*/}
                                <div className="text-[35px]">
                                    {currentObject}
                                </div>
                            </div>
                            <div className="text-white text-center text-[15px]">
                                {reasoning}
                            </div>
                        </div>
                        <div className="w-[250px] h-[312px] bg-[rgba(255,255,255,0.25)] rounded-[3px] p-4">
                            <div className="cherrybomb text-white underline">
                                Object's History
                            </div>
                            <div className="flex flex-col gap-1 mt-2 pr-1 h-[245px] overflow-y-auto ">
                                {objectsHistory.length !== 0 ? (
                                    objectsHistory.map((object, index) => (
                                        <ObjectHistoryItem
                                            key={index}
                                            object={object}
                                            index={index + 1}
                                        />
                                    ))
                                ) : (
                                    <div className="text-white">Empty</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* BOTTOM SECTION */}
                {roundInProgress
                    ? playerTurn.id === socket.id && (
                          <div className="flex justify-center">
                              <div className="flex flex-row gap-5 cherrybomb">
                                  <div>
                                      <input
                                          id="inputAnswer"
                                          type="text"
                                          className="text-[25px] rounded-[3px] px-2 border-2 border-white bg-[rgba(255,255,255,0.25)] text-white w-[250px]"
                                          onChange={(e) =>
                                              setItem(e.target.value)
                                          }
                                      />
                                  </div>
                                  <div className="bg-white rounded-[3px] hover:scale-[105%] cursor-pointer ease-in-out duration-300 shadow-md">
                                      <div
                                          onClick={() => {
                                              playerMove();
                                          }}
                                          className="py-2 px-5 rounded-[3px] text-transparent bg-clip-text bg-gradient-to-r from-[#7D00C6] to-[#DF00A4]"
                                      >
                                          SEND
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )
                    : playerTurn.id === socket.id && (
                          <div className="flex justify-center">
                              <div className="flex flex-row gap-5 cherrybomb">
                                  <div className="bg-white rounded-[3px] hover:scale-[105%] cursor-pointer ease-in-out duration-300 shadow-md">
                                      <div
                                          onClick={() => {
                                              nextRound();
                                          }}
                                          className="py-2 px-5 rounded-[3px] text-transparent bg-clip-text bg-gradient-to-r from-[#7D00C6] to-[#DF00A4]"
                                      >
                                          NEXT ROUND
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )}
            </div>
        </div>
    );
}

export default Game;
