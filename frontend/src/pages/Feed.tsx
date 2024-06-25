import React, { useEffect, useState } from 'react';
import '../styles/Feed.css';
import { getSession } from '../services/sessionService';
import { fetchPosts } from '../api/post';
import { Post } from '../interfaces';
import TweetDev from '../components/TweetDev';
import Favorites from '../components/Favorites';
import Portal from '../interfaces/Portal';
import { Users } from '@phosphor-icons/react';
import { PortalSample } from '../interfaces/PortalSample';

function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [portals, setPortals]= useState<Portal[]>(PortalSample);

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
                    <TweetDev  postInfo={post} key={index}/>
                ))}
            </div>
            <div className='pt-4 px-10 font-medium flex flex-col gap-3 '>Featured Portals
                {portals.map((portal, index) => (
                    <div
                    key={index}
                    className='relative portal-element border-2 border-componentBorder rounded-xl p-4 w-96 h-40 overflow-hidden'
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center filter brightness-50 hover:brightness-75 transition-all" 
                      style={{ backgroundImage: `url(${portal.backgroundImageUrl})` }}
                    ></div>
                        <div className='flex gap-3 mb-3 '>
                            <div className='cursor-pointer w-10 h-10 rounded-lg z-10' 
                            style={{ backgroundImage: `url(${portal.profileImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            <div className='flex flex-col z-10'>
                                <div className='cursor-pointer text-sm font-semibold leading-normal '>{portal.name}</div>
                                <div className='inline mt-[-5px]'><span className='text-[13px] font-semibold leading-normal'><Users size={18} weight='bold'></Users> {formatPortalers(portal.numberOfPortalers)}</span>
</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feed;
