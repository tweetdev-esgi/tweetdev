import React, { useState } from 'react';
import Portal from '../interfaces/Portal';
import FavoritesPortalItem from './FavoritesPortalItem';
import { ApplePodcastsLogo, Users } from '@phosphor-icons/react';
function Favorites(props) {
    const [portals, setPortals]= useState<Portal[]>([
        {
          name: "Jujutsu Kaisen",
          url: "https://portalone.com",
          description: "A gateway to new adventures.",
          image: "https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg?twic=v1/resize=760/step=10/quality=80",
          _id: "1",
          numberOfPortalers: 1200000,
        },
        {
          name: "Blue Lock",
          url: "https://portaltwo.com",
          description: "Explore the unknown.",
          image: "https://media.discordapp.net/attachments/1157269425796435998/1254963812516368455/image.png?ex=667b67a1&is=667a1621&hm=6d03b6f3aaabc54115e93cf4196485d0b1b1eea37ef289b2f6995260007b420b&=&format=webp&quality=lossless",
          _id: "2",
          numberOfPortalers: 1200,
        },
        {
          name: "Cyberpunk Edgerunners",
          url: "https://portalthree.com",
          description: "A portal to endless possibilities.",
          image: "https://media.discordapp.net/attachments/1157269425796435998/1254963812516368455/image.png?ex=667b67a1&is=667a1621&hm=6d03b6f3aaabc54115e93cf4196485d0b1b1eea37ef289b2f6995260007b420b&=&format=webp&quality=lossless",
          _id: "3",
          numberOfPortalers: 2000,
        }
      ]);
    return (
        <div className='flex flex-col h-[700px] pt-4 px-10 overflow-auto data-twe-perfect-scrollbar-init'>
            <h1 className='text-lg'>Favorites</h1>
            <div className='ml-1 mt-2'>
            <h2 className='text-base font-medium text-[#C7C9CE]'> <ApplePodcastsLogo weight='bold' size={23} color='#C7C9CE'></ApplePodcastsLogo> Portals</h2>
            <div className='flex flex-col gap-2 mt-3 '>
            {portals.map((portal, index) => (
                    <FavoritesPortalItem portal={portal} key={index}/>
                ))}
                </div>
            </div>
            <div className='ml-1 mt-4'>
            <h2 className='text-base font-medium text-[#C7C9CE]'><Users size={23} weight='bold' color='#C7C9CE'></Users> People</h2>
            <div className='flex flex-col gap-2 mt-3 '>
            {portals.map((portal, index) => (
                    <FavoritesPortalItem portal={portal} key={index}/>
                ))}
                </div>
            </div>
            <div className='ml-1 mt-4'>
            <h2 className='text-base font-medium text-[#C7C9CE]'><Users size={23} weight='bold' color='#C7C9CE'></Users> People</h2>
            <div className='flex flex-col gap-2 mt-3 '>
            {portals.map((portal, index) => (
                    <FavoritesPortalItem portal={portal} key={index}/>
                ))}
                </div>
            </div><div className='ml-1 mt-4'>
            <h2 className='text-base font-medium text-[#C7C9CE]'><Users size={23} weight='bold' color='#C7C9CE'></Users> People</h2>
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