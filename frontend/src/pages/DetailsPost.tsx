import React, { useEffect, useState } from "react";
import Favorites from "../components/Favorites";
import { getSession } from "../services/sessionService";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../api/post";
import { IPost } from "../interfaces";
import Post from "../components/Post";

function DetailsPost() {
  const { id } = useParams<{ id: string }>();
  const [notFoundPost, setNotFoundPost] = useState(false);
  const [loading, setLoading] = useState(true);
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
          const postData = await fetchPostById(sessionToken, id);
          if (postData) {
            setPost(postData);
            setLoading(false);
          } else {
            setNotFoundPost(true);
            setLoading(false);
          }
        }
      } catch (error) {
        setNotFoundPost(true);
        setLoading(false);
        console.error("Error fetching post:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="profile-container grid grid-cols-[1fr_3.5fr] gap-4 p-12 mt-6">
      <div className="hidden lg:block">
        <Favorites />
      </div>
      <div className="profile-card rounded-xl mr-6 col-span-2 lg:col-span-1">
        {loading ? (
          <p>Loading...</p>
        ) : notFoundPost ? (
          <p>This post doesn’t exist</p>
        ) : (
          <Post postInfo={post} />
        )}
      </div>
    </div>
  );
}

export default DetailsPost;
