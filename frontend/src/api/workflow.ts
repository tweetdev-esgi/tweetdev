import axios from "axios";

const API_BASE_URL = "http://localhost:3000";


export const fetchWorkflows = async (token: string): Promise<any> => {
    try {
        let hubsData = await getWorkflows(token);
        return hubsData;
    } catch (error) {
        console.error("Error fetching Workflows:", error);
        throw error;
    }
  };

  export const getWorkflows  = async (token: string): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/workflow`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching Workflows:", error);
      throw error;
    }
  };
  
//   export const getHubByName = async (token: string, name:string): Promise<any> => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/hub/by-name?name=${name}`, {

//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching hubs:", error);
//       throw error;
//     }
//   };

  
//   export const fetchHubByName = async (token: string, name:string): Promise<any> => {
//     try {
//         let hubsData = await getHubByName(token, name);
//         return hubsData;
//     } catch (error) {
//         console.error("Error fetching hubs:", error);
//         throw error;
//     }
//   };

//   export const getHubPosts = async (token: string, name:string): Promise<any> => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/hub/posts?name=${name}`, {

//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching hubs:", error);
//       throw error;
//     }
//   };

  
//   export const fetchHubPosts = async (token: string, name:string): Promise<any> => {
//     try {
//         let hubsData = await getHubPosts(token, name);  
//         return hubsData;
//     } catch (error) {
//         console.error("Error fetching hubs:", error);
//         throw error;
//     }
//   };

//   export const getIsHubFollowedBySelf = async (token: string, name:string): Promise<any> => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/hub/is-followed?name=${name}`, {

//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching hubs:", error);
//       throw error;
//     }
//   };

  
//   export const fetchIsHubFollowedBySelf = async (token: string, name:string): Promise<any> => {
//     try {
//         let hubsData = await getIsHubFollowedBySelf(token, name);  
//         return hubsData;
//     } catch (error) {
//         console.error("Error fetching hubs:", error);
//         throw error;
//     }
//   };

//   export const toggleFollowHub = async (token: string, name:string): Promise<any> => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/hub/follow?name=${name}`,  
//         {},  
//          {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error following:", error);
//       throw error;
//     }
//   };
  

//   export const createHub = async (token: string,formData: {  name:string, description:string, profileImageUrl:string, coverImageUrl:string }): Promise<any> => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/hub/create`, formData, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error creating hub :", error);
//       throw error;
//     }
//   };

  export const deleteWorkflowVersionByIdandName = async (token: string,id:string,versionName:string): Promise<any> => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/workflow/delete/version/?id=${id}`, 
        versionName,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting version :", error);
      throw error;
    }
  };

//   export const getIsAdminHub = async (token: string, name:string): Promise<any> => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/hub/is-admin?name=${name}`, {

//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching hubs:", error);
//       throw error;
//     }
//   };

  
//   export const fetchIsAdminHub = async (token: string, name:string): Promise<any> => {
//     try {
//         let hubsData = await getIsAdminHub(token, name);
//         return hubsData;
//     } catch (error) {
//         console.error("Error fetching hubs:", error);
//         throw error;
//     }
//   };

  export const updateWorkflow = async (token: string,id:string, workflowInfo: any,): Promise<any> => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/workflow/?id=${id}`,
        workflowInfo, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating hub info:", error);
      throw error;
    }
  };
  
  export const upgradeWorkflow = async (token: string,id:string, workflowInfo: any,): Promise<any> => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/workflow/upgrade/?id=${id}`,
        workflowInfo, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating hub info:", error);
      throw error;
    }
  };
  