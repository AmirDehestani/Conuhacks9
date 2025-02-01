import React from 'react';

function UserCard({ user }) {
  return (
    <div id={user.id} className='bg-[rgba(255,255,255,0.10)] rounded-[5px] py-3 flex flex-row items-center'>
        <div className='w-5 h-5 bg-white rounded-full ml-5'></div>
        <div className='px-10 '>{user.name}</div>
    </div>
  );
}

export default UserCard;