import { PencilSimple } from '@phosphor-icons/react';
import React from 'react';

function FollowButton({text}) {
    return (
        <div>
            <div className='edit-button cursor-pointer px-[12px] py-2 bg-accentColor hover:accentColorHover rounded-xl flex justify-center items-center gap-2 text-sm font-medium text-secondaryColor '><PencilSimple weight='bold' size={22}></PencilSimple> <div>{text}</div></div>

        </div>
    );
}

export default FollowButton;