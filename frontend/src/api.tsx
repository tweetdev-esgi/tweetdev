import axios from "axios";

const API_URL = 'http://localhost:5000/api'; // Assurez-vous que l'URL correspond à votre backend

type ExecuteCodeResponse = {
  run: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
  };
  compile?: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
  };
};
export const executeCode = async (language: string, code: string): Promise<ExecuteCodeResponse> => {
  try {
    const response = await axios.post(`${API_URL}/executeCode`, {
      language: language,
      code: code,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error executing code:", error.response ? error.response.data : error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
};

export const saveCode = async (codeData: { name: string, code: string, language: string }) => {
  try {
    const response = await axios.post(`${API_URL}/save`, codeData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
