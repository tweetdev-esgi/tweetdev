import React, { useState } from 'react';
import Portal from '../interfaces/Portal';
import FavoritesPortalItem from './FavoritesPortalItem';
import { ApplePodcastsLogo, Users } from '@phosphor-icons/react';
import { PortalSample } from '../interfaces/PortalSample';
function Favorites(props) {
    const [portals, setPortals]= useState<Portal[]>(PortalSample);
    return (
        <div className='flex flex-col h-[700px] pt-4 px-10 overflow-auto data-twe-perfect-scrollbar-init'>
            <h1 className='text-lg'>Favorites</h1>
            <div className='ml-1 mt-2'>
            <h2 className='text-base font-medium text-secondaryColor'> <ApplePodcastsLogo weight='bold' size={23} color='#C7C9CE'></ApplePodcastsLogo> Portals</h2>
            <div className='flex flex-col gap-2 mt-3 '>
            {portals.map((portal, index) => (
                    <FavoritesPortalItem portal={portal} key={index}/>
                ))}
                </div>
            </div>
            <div className='ml-1 mt-4'>
            <h2 className='text-base font-medium text-secondaryColor'><Users size={23} weight='bold' color='#C7C9CE'></Users> People</h2>
            <div className='flex flex-col gap-2 mt-3 '>
            {portals.map((portal, index) => (
                    <FavoritesPortalItem portal={portal} key={index}/>
                ))}
                </div>
            </div>
            <div className='ml-1 mt-4'>
            <h2 className='text-base font-medium text-secondaryColor'><Users size={23} weight='bold' color='#C7C9CE'></Users> People</h2>
            <div className='flex flex-col gap-2 mt-3 '>
            {portals.map((portal, index) => (
                    <FavoritesPortalItem portal={portal} key={index}/>
                ))}
                </div>
            </div><div className='ml-1 mt-4'>
            <h2 className='text-base font-medium text-secondaryColor'><Users size={23} weight='bold' color='#C7C9CE'></Users> People</h2>
            <div className='flex flex-col gap-2 mt-3 '>
            {portals.map((portal, index) => (
                    <FavoritesPortalItem portal={portal} key={index}/>
                ))}
                </div>
            </div>
        </div>
    );
}

export default Favorites;