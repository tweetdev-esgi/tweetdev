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
import Favorites from '../components/Favorites';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Profile2() {
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
                setFollowersCount(selfInfoData.followers.length);
                const selfPostsData = await fetchProfilePosts(sessionToken);
                setSelfPosts(selfPostsData);
              }else{
                console.log(id)
                const selfInfoData = await fetchUserInfo(sessionToken, id);
                setSelfInfo(selfInfoData);
                setFollowersCount(selfInfoData.followers.length);
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
        <div className='profile-container grid grid-cols-[1fr_3.5fr] gap-12 p-12 mt-6 '>
            {!selfInfo && ( <>Loading...</>)}
            
            {selfInfo && (
                <>
                <Favorites></Favorites>
                <div className='profile-card border-2 border-customGray rounded-xl grid grid-rows-[60fr_30fr_20fr] h-[700px]'>
                    <div className='border-b-2 border-customGray ' style={{ backgroundImage: `url(https://media.discordapp.net/attachments/1157269425796435998/1254963812516368455/image.png?ex=667b67a1&is=667a1621&hm=6d03b6f3aaabc54115e93cf4196485d0b1b1eea37ef289b2f6995260007b420b&=&format=webp&quality=lossless)`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div className='p-4 border-b-2 border-customGray '>
                        <div className=''></div>
                        <p>{selfInfo.username}</p>
                        <ModalFollowers followersCount={followersCount} followersText={followerText}></ModalFollowers>
                        <ModalFollowers followersCount={followersCount} followersText={followerText}></ModalFollowers>
                    <p>Joined {convertTimestampToMonthYear(selfInfo.joinDate)}</p>

                    </div>
                    <div className='p-4 '>d</div>
                </div>
                </>
            )}

        </div>
    );
}

export default Profile2;