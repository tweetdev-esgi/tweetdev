import React, { useEffect, useState } from 'react';
import {Heart, ChatCircle} from "@phosphor-icons/react";
import "../styles/TweetDev.css"
import { fetchIsPostLiked, patchToggleLikePost } from '../api/post';
import { getSession } from '../services/sessionService';
import { Link } from 'react-router-dom';
function TweetDev({ postInfo}) {
        const [input, setInput] = useState('');
        const [likes, setLikes] = useState(postInfo.like.length);
        const [output, setOutput] = useState('');
        const [isLiked, setIsLiked] = useState(false);
        const sessionToken = getSession();
        const authorUrl = `/profile?id=${postInfo.userId}`;
        const toggleLike = ()=>{
            console.log(isLiked);
            setIsLiked(!isLiked);
            if (sessionToken) {
                (async () => {
                    try {
                        await patchToggleLikePost(sessionToken, {"post_id": postInfo._id});
                        
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
        const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
            setInput(event.target.value);
        };
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
        const run = () => {
            setOutput("run");
        }
    return (
        <div className="tweetDev-container">
            <div className='up'>
                <div className='author'><a href={authorUrl}>{postInfo.authorName}</a></div>
                <div className='title'>{postInfo.title}</div>
            </div>
            <div className='code'>
                <pre> {postInfo.description}</pre>
            </div>
            <div className='details'>
                <div className='engagement'>
                    <div className='likes' onClick={()=>toggleLike()}>{likes } <span className='icon'>       
                        {isLiked && <Heart size={22}  weight="fill" />} {}
        {!isLiked && <Heart size={22} />} {}
  </span></div>
                    <div className='comments'>{postInfo.comments.length} <span className='icon'><ChatCircle size={22} /></span></div>
                </div>
                <div className='specs'>
                    <div className='format'>{postInfo.format}</div>
                    <div className='language'>{postInfo.language}</div>
                </div>
             
            </div>
            <div className='down'>
                    <div className='input'>
                    <textarea 
                        value={input}
                        onChange={handleChange} id="input" name="input" rows={5} cols={50} placeholder='Enter input here'>

</textarea>
                    </div>
                    <div className='run'><button onClick={()=>run()} className='run-button'>RUN</button></div>
                    <div className='result'>
                    
                    <textarea 
                        value={output} readOnly id="result" name="result" rows={5} cols={50} placeholder='Result'>
</textarea></div>
                </div>
        </div>
    );
}

export default TweetDev;