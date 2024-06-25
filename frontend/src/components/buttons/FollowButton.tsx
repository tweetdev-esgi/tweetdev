
import React, { useEffect, useState } from 'react';
import { fetchIsUserFollowed, followUser } from '../../api/user';
import { getSession } from '../../services/sessionService';
import { useLocation } from 'react-router-dom';
import { UserCirclePlus, UserCircleMinus } from '@phosphor-icons/react';
function FollowButton({increment, decrement}) {

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
    const sessionToken = getSession();
    const [isFollowed, setIsFollowed] = useState(false);
    const id = query.get('id');
    const followedText = isFollowed ? "Unfollow" : "Follow";
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
      const follow= async ()=>{
        if (isFollowed){
          decrement();
        }
        else{
          increment();
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
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsFollowed(await isUserFollowed());
          
        } catch (error) {
          console.error("Error fetching self info:", error);
        }
      };
      fetchData();
    }, []);

    
    return (
        <div onClick={()=> follow()}>
            <div className='edit-button cursor-pointer px-[12px] py-2 bg-accentColor hover:accentColorHover rounded-xl flex justify-center items-center gap-2 text-sm font-medium text-secondaryColor '>
              
              {
                isFollowed && (<>
                              <UserCircleMinus weight='bold' size={22}></UserCircleMinus> <div>{followedText}</div>
                </>
                )
              }
{
                !isFollowed && (<>
                              <UserCirclePlus weight='bold' size={22}></UserCirclePlus> <div>{followedText}</div>
                </>
                )
              }
              </div>

        </div>
    );
}

export default FollowButton;