import React, { useEffect, useState } from 'react';
import { fetchSelfInfo, fetchUserInfo, followUser} from '../api/user';
import { getSession } from '../services/sessionService';
import {convertTimestampToMonthYear, defaultUser} from '../utils/utils';
import '../styles/Profile.css';
import ModalProfileEdit from '../components/ModalProfileEdit';
import { fetchProfilePosts } from '../api/post';
import { Post } from '../interfaces';
import TweetDev from '../components/TweetDev';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Profile() {
  const query = useQuery();
  const [selfInfo, setSelfInfo] = useState<UserResponse>(defaultUser);
  
  const [selfPosts, setSelfPosts] = useState<Post[]>([]);

  const id = query.get('id');
  const followerCount = selfInfo.follow.length;
  const followerText = followerCount === 1 ? 'follower' : 'followers';
  const sessionToken = getSession();
    useEffect(() => {
        const fetchData = async () => {
          try {
            
            
            if (sessionToken) {

              if(id==null) {
                const selfInfoData = await fetchSelfInfo(sessionToken);
                setSelfInfo(selfInfoData);
                const selfPostsData = await fetchProfilePosts(sessionToken);
                setSelfPosts(selfPostsData);
              }else{
                console.log(id)
                const selfInfoData = await fetchUserInfo(sessionToken, id);
                setSelfInfo(selfInfoData);
                const selfPostsData = await fetchProfilePosts(sessionToken, id);
                setSelfPosts(selfPostsData);
              }
            } else {
              console.error("Token de session null.");
            }
          } catch (error) {
            console.error("Error fetching self info:", error);
          }
        };
        fetchData();
      }, []);

      const follow= ()=>{
        console.log(sessionToken, id);
        if(sessionToken && id){
          followUser(sessionToken,id);
        }
      }
    return (
        <div className='profile-container'>
            {!selfInfo && ( <>Loading...</>)}
            
            {selfInfo && (
                <>
                <div className='profile-card'>
                <h2>{selfInfo.username}</h2>
                <p> {selfInfo.aboutMe}</p>
                <p>Joined {convertTimestampToMonthYear(selfInfo.joinDate)}</p>
                <p>{followerCount} {followerText}</p>
                {!id && <ModalProfileEdit selfInfo={selfInfo}></ModalProfileEdit>}
                

                {id && (
                <Button variant="primary" onClick={follow} >
                  Follow
                </Button>)}
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