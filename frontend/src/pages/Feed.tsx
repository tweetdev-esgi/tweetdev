import React, { useEffect, useState } from 'react';
import TweetDev from '../components/TweetDev';
import '../styles/Feed.css';
import { getSession } from '../services/sessionService';
import { fetchPosts } from '../api/post';
import { Post } from '../interfaces';
import FeedChoice from '../components/FeedChoice';

function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedMode, setSelectedMode] = useState(false); // State to track selected mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sessionToken = getSession();

                if (sessionToken) {
                    const postsData = await fetchPosts(sessionToken, selectedMode); // Pass selected mode to fetchPosts
                    setPosts(postsData);
                } else {
                    console.error('Error fetching posts');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, [selectedMode]); // Fetch data whenever selectedMode changes

    const handleModeChange = (mode) => {
        setSelectedMode(mode);
    };

    return (
        <div className="feed-container">
            <FeedChoice onSelectMode={handleModeChange} />
            {posts.map((post, index) => (
                <TweetDev key={index} postInfo={post} />
            ))}
        </div>
    );
}

export default Feed;
