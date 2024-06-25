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
import { Clock, PencilSimple, DotsThreeVertical, InstagramLogo, YoutubeLogo,XLogo, TwitterLogo, TwitchLogo, DiscordLogo,GithubLogo,PatreonLogo } from '@phosphor-icons/react';
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
  const followerText = followersCount > 1 ? 'Followers' : 'Follower';
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
        <div className='profile-container grid grid-cols-[1fr_3.5fr] gap-4 p-12 mt-6 '>
            {!selfInfo && ( <>Loading...</>)}
            
            {selfInfo && (
                <>
                <Favorites></Favorites>
                <div className='profile-card border-2 border-customGray rounded-xl grid grid-rows-[60fr_20fr_15fr] h-[700px] mr-6'>
                    <div className='border-b-2 border-customGray ' style={{ backgroundImage: `url(https://thejujutsukaisen.com/wp-content/uploads/2024/02/Jujutsu-Kaisen-Satoru_Gojo.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div className='p-2 border-b-2 border-customGray grid grid-cols-[19fr_80fr_15fr]'>
                      <div className='flex justify-center'>
                        <div className='h-[160px] w-[160px] border-4 border-cyan-400 rounded-full mt-[-60px]' 
                        style={{ backgroundImage: `url(https://64.media.tumblr.com/5b27f2fa31997d52b20a085729d79800/8a8beb1bdd1ae19a-3b/s1280x1920/0543189a41fb3bcaf0c8655a67b4b934e572e5be.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        </div>
                        <div>
                        <p className='text-xl font-semibold'>{selfInfo.username}</p>
                        <div className='flex flex-row gap-3'>
                        <ModalFollowers followersCount={followersCount} followersText={followerText}></ModalFollowers>
                        <ModalFollowers followersCount={followersCount} followersText={followerText}></ModalFollowers>
                        </div>
                    <p className='text-[#C7C9CE] text-xs font-medium'><Clock color='#C7C9CE' weight='bold' size={22}></Clock> Member Since {convertTimestampToMonthYear(selfInfo.joinDate)}</p>
                    </div>
                    <div className='grid grid-rows-[40fr_50fr]'> 
                      <div className='flex gap-3 p-2'>
                            <div className='edit-button cursor-pointer w-20 h-9 bg-red-600  rounded-xl flex justify-center items-center gap-2 text-sm font-medium text-[#C7C9CE] '><PencilSimple weight='bold' size={22}></PencilSimple> <div>Edit</div></div>
                         <div className='flex items-center cursor-pointer'><DotsThreeVertical size={30} weight='bold'></DotsThreeVertical></div>
                        </div> 
    
                    </div>
                    </div>
                    <div className='p-4 grid grid-cols-[68fr_32fr] gap-5'>
                      <div className=' text-[#C7C9CE] text-sm font-medium'>{selfInfo.aboutMe}Over eighteen months, I played a pivotal role ithe project culminated in developing a robust design system, solidifying the platform's visual consistency.</div>
                      <div className='flex justify-around items-center'>
                      <InstagramLogo size={24} weight='fill'></InstagramLogo>
                      <YoutubeLogo size={24} weight='fill'></YoutubeLogo>
                      <XLogo size={24} weight='fill'></XLogo>
                      <TwitchLogo size={24} weight='fill'></TwitchLogo>
                      <GithubLogo size={24} weight='fill'></GithubLogo>
                      </div>
                    </div>
                </div>
                </>
            )}

        </div>
    );
}

export default Profile2;