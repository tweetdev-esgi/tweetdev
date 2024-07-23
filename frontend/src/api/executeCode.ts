import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

type ExecuteCodeResponse = {
    output: string;
};


export const executeCode = async (language: string, code: string): Promise<ExecuteCodeResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/executeCode`, {
            language : language,
            code : code,
            files: [
                {
                    content: code,
                },
            ],
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error executing code:", error.response ? error.response.data : error.message);
            throw error;
        } else {
            throw new Error("Unexpected error occurred");
        }
    }
};
