import axios from "axios";

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
    const response = await axios.post('http://localhost:3000/api/executeCode', {
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
