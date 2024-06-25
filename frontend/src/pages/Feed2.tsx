import React, { useEffect, useState } from 'react';
import '../styles/Feed.css';
import { getSession } from '../services/sessionService';
import { fetchPosts } from '../api/post';
import { Post } from '../interfaces';
import TweetDev2 from '../components/TweetDev2';
import Favorites from '../components/Favorites';

function Feed2() {
    const [posts, setPosts] = useState<Post[]>([]);

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

    return (
        <div className="feed-container  grid grid-cols-[1fr_2fr_1.5fr] gap-4 p-12  w-[100vw] mt-6">
            <Favorites></Favorites>
            <div className='flex flex-column gap-3'>
                {posts.map((post, index) => (
                    // <TweetDev key={index} postInfo={post} />
                    <TweetDev2  />
                ))}
            </div>
            <div className='p-4 border border-customGray'>dsqdq</div>
        </div>
    );
}

export default Feed2;
