import React from 'react';
import {ThumbsUp} from 'lucide-react'
function Button(props) {
    return (
        <div className='bg-blue-200  w-fit px-2 py-1 rounded-md flex items-center gap-1'>
            <ThumbsUp color='#1e40af' size={15}></ThumbsUp>
            <p className=' text-blue-800 text-xs font-medium'> 204</p>
        </div>
    );
}

export default Button;