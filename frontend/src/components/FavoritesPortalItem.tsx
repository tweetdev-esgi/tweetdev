import React from 'react';
import Portal from '../interfaces/Portal';
function FavoritesPortalItem({ portal}:{portal:Portal} ) {
    return (
        <div className=' flex gap-2'>
            <div className='cursor-pointer bg-green-700 w-8 h-8 rounded-lg '></div>
            <p className='cursor-pointer text-[#C7C9CE] text-sm mt-[8px]'>{portal.name}</p>
            {/* <p className='text-[#C7C9CE] text-sm font-medium'>{portal.name}</p> */}
        </div>
    );
}

export default FavoritesPortalItem;