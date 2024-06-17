import React, { useEffect, useState } from 'react';
import { fetchIsUserFollowed, fetchSelfInfo, fetchUserInfo, followUser} from '../api/user';
import { getSession } from '../services/sessionService';
import {convertTimestampToMonthYear, defaultUser} from '../utils/utils';
import '../styles/Profile.css';
import ModalProfileEdit from '../components/ModalProfileEdit';
import { fetchProfilePosts } from '../api/post';
import { Post } from '../interfaces';
import TweetDev from '../components/TweetDev';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ModalFollowers from '../components/ModalFollowers';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Profile() {
  const query = useQuery();
  const [selfInfo, setSelfInfo] = useState<UserResponse>(defaultUser);
  
  const [selfPosts, setSelfPosts] = useState<Post[]>([]);
  const [followersCount, setFollowersCount] = useState(0);
  
  const [isFollowed, setIsFollowed] = useState(false);
  const id = query.get('id');
  const followerText = followersCount > 1 ? 'followers' : 'follower';
  const sessionToken = getSession();

  const isUserFollowed = async()=>{
    if(sessionToken && id){
      try{

        const response = await fetchIsUserFollowed(sessionToken, id);
        return response.isFollowed;
      }catch(error){
        console.error("Error fetching user info:", error);
      }
    }
  }
  const showFollowersModal = () => {
    console.log('show followers modal');
  
  }

    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsFollowed(await isUserFollowed());
            if (sessionToken) {

              if(id==null) {
                const selfInfoData = await fetchSelfInfo(sessionToken);
                setSelfInfo(selfInfoData);
                setFollowersCount(selfInfoData.follow.length);
                const selfPostsData = await fetchProfilePosts(sessionToken);
                setSelfPosts(selfPostsData);
              }else{
                console.log(id)
                const selfInfoData = await fetchUserInfo(sessionToken, id);
                setSelfInfo(selfInfoData);
                setFollowersCount(selfInfoData.follow.length);
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

      const follow= async ()=>{
        if (isFollowed){
          setFollowersCount(followersCount-1);
        }
        else{
          setFollowersCount(followersCount+1);
        }
        setIsFollowed(!isFollowed);
        if(sessionToken && id){
          try{

            const response = await fetchIsUserFollowed(sessionToken, id);
            console.log(response);
          }catch(error){
            console.error("Error fetching user info:", error);
          }
          console.log(fetchIsUserFollowed(sessionToken, id));
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
                <ModalFollowers followersCount={followersCount} followersText={followerText}></ModalFollowers>
                {/* <a className='followers' onClick={showFollowersModal}>{followersCount} {followerText}</a> */}
                {!id && <ModalProfileEdit selfInfo={selfInfo}></ModalProfileEdit>}
                

                {id && (
                <Button variant="primary" onClick={follow} >
                  {isFollowed ? 'Unfollow' : 'Follow'}
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