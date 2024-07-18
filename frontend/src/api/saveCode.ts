import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Sauvegarder un code
export const saveCode = async (codeData: { name: string, code: string, language: string }, token: string): Promise<any> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/save-code/save`, codeData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error saving code:", error);
        throw error;
    }
};

// Supprimer un code par son nom
export const deleteCodeByName = async (name: string, token: string): Promise<any> => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/save-code/delete?name=${name}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting code:", error);
        throw error;
    }
};

// Récupérer tous les codes sauvegardés
export const getAllSaveCodes = async (token: string): Promise<any> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/save-code/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching codes:", error);
        throw error;
    }
};

// Récupérer un code par son nom
export const getSaveCodeByName = async (name: string, token: string): Promise<any> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/save-code/by-name?name=${name}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching code:", error);
        throw error;
    }
};
