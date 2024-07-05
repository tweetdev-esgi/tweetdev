import React, { useEffect, useState } from "react";
import Favorites from "../components/Favorites";
import { getSession } from "../services/sessionService";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../api/post";
import { IPost } from "../interfaces";
import Post from "../components/Post";

function DetailsPost(props) {
  let { id } = useParams();
  const [notFoundPost, setNotFoundPost] = useState("not Found Post");
  const [post, setPost] = useState<IPost>({
    authorName: "",
    content: "",
    like: [],
    comments: [],
    creationDate: "",
    username: "",
    hubname: undefined,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionToken = getSession();

        if (sessionToken && id) {
          const postsData = await fetchPostById(sessionToken, id);
          setPost(postsData);
          console.log(postsData);
        }
      } catch (error) {
        setNotFoundPost("This post doesn’t exist");
        console.error("Error fetching hub info:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="profile-container grid grid-cols-[1fr_3.5fr] gap-4 p-12 mt-6 ">
      <div className="hidden lg:block">
        <Favorites></Favorites>
      </div>
      <div className="profile-card  rounded-xl   mr-6 col-span-2 lg:col-span-1">
        {post.authorName == "" && notFoundPost}
        <Post postInfo={post}></Post>
      </div>
    </div>
  );
}

export default DetailsPost;
