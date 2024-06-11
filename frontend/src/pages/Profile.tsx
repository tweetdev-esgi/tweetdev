import React, { useEffect, useState } from 'react';
import { fetchSelfInfo} from '../api/user';
import { getSession } from '../services/sessionService';
import {convertTimestampToMonthYear, defaultUser} from '../utils/utils';
import '../styles/Profile.css';
import ModalProfileEdit from '../components/ModalProfileEdit';
import { fetchProfilePosts } from '../api/post';
import { Post } from '../interfaces';
import TweetDev from '../components/TweetDev';

function Profile() {
  const [selfInfo, setSelfInfo] = useState<UserResponse>(defaultUser);
  
  const [selfPosts, setSelfPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const sessionToken = getSession();
            
            if (sessionToken) {
              const selfInfoData = await fetchSelfInfo(sessionToken);
              setSelfInfo(selfInfoData);
              const selfPostsData = await fetchProfilePosts(sessionToken);
              setSelfPosts(selfPostsData);
              console.log(selfPostsData);
            } else {
              console.error("Token de session null.");
            }
          } catch (error) {
            console.error("Error fetching self info:", error);
          }
        };
    
        fetchData();
      }, []);


    return (
        <div className='profile-container'>
            {!selfInfo && ( <>Loading...</>)}
            
            {selfInfo && (
                <>
                <div className='profile-card'>
                <h2>{selfInfo.username}</h2>
                <p> {selfInfo.aboutMe}</p>
                <p>Joined {convertTimestampToMonthYear(selfInfo.joinDate)}</p>
                <p>{selfInfo.follow.length} followers</p>
                <ModalProfileEdit selfInfo={selfInfo}></ModalProfileEdit>
                </div>
                <div className="feed-container">
                {selfPosts.map((_, index) => (
                    <TweetDev key={index} postInfo={selfPosts[index]} />
                  ))}
                </div>
                </>
            )}

        </div>
    );
}

export default Profile;