import { Heart } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import { getSession } from '../../services/sessionService';
import { fetchIsPostLiked, patchToggleLikePost } from '../../api/post';

function LikeButton({sessionToken,postInfo}) {

    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(postInfo.like.length);

  const toggleLike = (postId:string)=>{
      console.log(isLiked);
      setIsLiked(!isLiked);
      if (sessionToken) {
          (async () => {
              try {
                  await patchToggleLikePost(sessionToken, {"post_id": postInfo.id});
                  
              } catch (error) {
                  console.error("Error fetching post liked status:", error);
              }
          })();
      }
      if(isLiked){
          setLikes(likes-1);
          
      }else{
          setLikes(likes+1);
      
      }
      
  }
  useEffect(() => {
            
    const sessionToken = getSession();
    
    if (sessionToken) {
        (async () => {
            try {
                const isLiked = await fetchIsPostLiked(sessionToken, postInfo._id);
                
                setIsLiked(isLiked.liked);
            } catch (error) {
                console.error("Error fetching post liked status:", error);
            }
        })();
    }
  }, []);

    return (
        <div>
            <div onClick={() =>toggleLike(postInfo.id)} className='edit-button cursor-pointer px-[12px] py-[6px] bg-accentColor hover:accentColorHover rounded-xl flex justify-center items-center gap-2 text-sm font-medium text-secondaryColor '>

                            {isLiked && <Heart size={16}  weight="fill" />} {}
        {!isLiked && <Heart size={16} weight='bold' />} {}
                 <div className='text-xs'>{}</div></div>

        </div>
    );
}

export default LikeButton;