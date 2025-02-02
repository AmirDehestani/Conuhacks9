import React from 'react';
import '../App.css';
import RockSVG from './RockSVG';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="px-[150px] pt-[75px]">
            <div className="flex flex-row justify-center gap-20">
                <div className="flex flex-col gap-5">
                    <div
                        id="title"
                        className="cherrybomb text-white text-[65px] leading-[60px]"
                    >
                        What Beats Rock Games ?
                    </div>
                    <div className="cherrybomb text-white opacity-50 text-[15px]">
                      Welcome to "What beats Rock?" – a fast-paced game where each player takes 
                      turns choosing an object that beats the previous one. Starting with Rock, 
                      the sequence grows with each round, but you can't repeat objects. 
                      If you run out of time or choose incorrectly, you're out. 
                      The last player standing wins!
                    </div>

                    <a
                        className="cherrybomb text-white px-5 py-2 bg-[rgba(255,255,255,0.25)] w-[120px] rounded-[5px] shadow-md mt-3 hover:scale-[105%] cursor-pointer ease-in-out duration-300"
                        onClick={() => navigate('/lobby-setup')}
                    >
                        Play Game
                    </a>
                </div>

                <div>
                    <RockSVG />
                </div>
            </div>
        </div>
    );
}

export default Home;
