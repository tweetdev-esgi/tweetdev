import axios from "axios";

const API_BASE_URL = "http://localhost:3000";


export const fetchHubs = async (token: string): Promise<any> => {
    try {
        let hubsData = await getHubs(token);
        return hubsData;
    } catch (error) {
        console.error("Error fetching hubs:", error);
        throw error;
    }
  };

  export const getHubs = async (token: string): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hub`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching hubs:", error);
      throw error;
    }
  };
  
  export const getHubByName = async (token: string, name:string): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hub/by-name?name=${name}`, {

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching hubs:", error);
      throw error;
    }
  };

  
  export const fetchHubByName = async (token: string, name:string): Promise<any> => {
    try {
        let hubsData = await getHubByName(token, name);
        return hubsData;
    } catch (error) {
        console.error("Error fetching hubs:", error);
        throw error;
    }
  };

  export const getHubPosts = async (token: string, name:string): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hub/posts?name=${name}`, {

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching hubs:", error);
      throw error;
    }
  };

  
  export const fetchHubPosts = async (token: string, name:string): Promise<any> => {
    try {
        let hubsData = await getHubPosts(token, name);  
        return hubsData;
    } catch (error) {
        console.error("Error fetching hubs:", error);
        throw error;
    }
  };
