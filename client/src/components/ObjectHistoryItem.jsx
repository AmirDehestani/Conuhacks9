import React from 'react';

function ObjectHistoryItem({ object, index }) {
    return (
        <div className="bg-[rgba(255,255,255,0.25)] rounded-[3px] py-1 flex flex-row items-center pl-2 text-[15px]">
            <span className="pr-2 cherrybomb text-white">{index}. </span>{' '}
            <span className="text-white opacity-85">{object}</span>
        </div>
    );
}

export default ObjectHistoryItem;
