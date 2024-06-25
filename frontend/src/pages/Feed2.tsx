import React, { useEffect, useState } from 'react';
import '../styles/Feed.css';
import { getSession } from '../services/sessionService';
import { fetchPosts } from '../api/post';
import { Post } from '../interfaces';
import TweetDev2 from '../components/TweetDev2';
import Favorites from '../components/Favorites';
import Portal from '../interfaces/Portal';
import { Users } from '@phosphor-icons/react';
function Feed2() {
    const [posts, setPosts] = useState<Post[]>([]);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sessionToken = getSession();

                if (sessionToken) {
                    const postsData = await fetchPosts(sessionToken, true); 
                    setPosts(postsData);
                } else {
                    console.error('Error fetching posts');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, []); 


    function formatPortalers(numberOfPortalers:number){
        if(numberOfPortalers >= 1000000){
            return (numberOfPortalers/1000000).toFixed(1) + "M"
        }else if(numberOfPortalers >= 1000){
            return (numberOfPortalers/1000).toFixed(1) + "k"
        }
        return numberOfPortalers
    }
    return (
        <div className="feed-container grid grid-cols-[1fr_2fr_1.5fr] gap-4 p-12 mt-6">
            <Favorites></Favorites>
            <div className='flex flex-column gap-3'>
                {posts.map((post, index) => (
                    // <TweetDev key={index} postInfo={post} />
                    <TweetDev2  />
                ))}
            </div>
            <div className='pt-4 px-10 font-medium flex flex-col gap-3 '>Featured Portals
                {portals.map((portal, index) => (
                    <div key={index} className='portal-element border-2 border-customGray rounded-xl p-4 w-96 h-40 '
                    style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFx9ycqzSiehlKBCMmzUjDQatfLpCa9-jD9w&s)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className='flex gap-3 mb-3'>
                            <div className='cursor-pointer bg-green-700 w-10 h-10 rounded-lg '></div>
                            <div className='flex flex-col'>
                                <div className='cursor-pointer text-sm font-medium leading-normal'>{portal.name}</div>
                                <div className='inline mt-[-5px]'><span className='text-[13px] font-normal leading-normal'><Users size={18} weight='bold'></Users> {formatPortalers(portal.numberOfPortalers)}</span>
</div>
                            </div>
                            {/* <div className='cursor-pointer ml-auto'>⋯</div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feed2;
