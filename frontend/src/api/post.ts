import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getPosts = async (token: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/post/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getFollowedUsersPosts = async (token: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/post/followed-users-posts`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};


export const fetchPosts = async (token: string, fetchAllPosts: boolean): Promise<any> => {
  try {
      let postsData;
      if (fetchAllPosts) {
          postsData = await getPosts(token);
      } else {
          postsData = await getFollowedUsersPosts(token);
      }
      return postsData;
  } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
  }
};
  export const getProfilePosts = async (token: string, username?: string): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/post/user-posts`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        params: username ? { username } : {}
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };
  export const fetchProfilePosts = async (token: string, username?: string) => {
    try {
      const postsData = await getProfilePosts(token, username);
      return postsData;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

  export const getIsPostLiked = async (token: string, postId: string): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/post/is-liked`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        params: {
          post_id: postId
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

  export const fetchIsPostLiked = async (token: string, postId: string) => {
    try {
      const postsData = await getIsPostLiked(token, postId);
      return postsData;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };


  export const patchToggleLikePost = async (token: string, likeInfo: any): Promise<any> => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/post/like`,
        likeInfo,
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };
  export const createPost = async (token: string,formData: {  content:string, hubname?:string }): Promise<any> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/post`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error creating post :", error);
      throw error;
    }
  };