import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getSelfInfo = async (token: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching self info:", error);
    throw error;
  }
};

export const fetchSelfInfo = async (token: string) => {
  try {
    const userData = await getSelfInfo(token);
    return userData;
  } catch (error) {
    console.error("Error fetching self info:", error);
    throw error;
  }
};

export const getUserInfo = async (token: string, userId:string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/one`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        id: userId
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching self info:", error);
    throw error;
  }
};

export const fetchUserInfo = async (token: string, userId:string) => {
  try {
    const userData = await getUserInfo(token, userId);
    return userData;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export const updateUser = async (token: string, userInfo: any): Promise<any> => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/user/`,
      userInfo, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};

export const followUser = async (token: string, userId:string): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/follows`,
      {"user_id":userId}, // No data in the body
       {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error following:", error);
    throw error;
  }
};

export const getIsUserFollowed = async (token: string, id: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/is-liked`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        id: id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const fetchIsUserFollowed = async (token: string, id: string) => {
  try {
    const response = await getIsUserFollowed(token, id);
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getFollowers = async (token: string, id: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/follow`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        user_id: id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

