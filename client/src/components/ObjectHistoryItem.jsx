import React from 'react';

function ObjectHistoryItem({ object }) {
  return (
    <div className='bg-[rgba(255,255,255,0.25)] rounded-[3px] py-1 flex flex-row items-center pl-2 text-[15px]'>
      <span className='pr-2 cherrybomb text-white'>{object.id}. </span> <span className='text-white opacity-85'>{object.objectName}</span>
    </div>
  );
}

export default ObjectHistoryItem;