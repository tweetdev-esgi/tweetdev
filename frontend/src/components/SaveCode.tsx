import React, { useState, useEffect } from "react";
import { Box, Button} from "@chakra-ui/react";
import { saveCode } from "../api/saveCode";
import toast from "react-hot-toast";

interface SaveCodeProps {
    initialCode: string;
    initialLanguage: string;
    token: string;
}

const SaveCode: React.FC<SaveCodeProps> = ({ initialCode, initialLanguage, token }) => {
    const [code, setCode] = useState<string>(initialCode);
    const [language, setLanguage] = useState<string>(initialLanguage);
    const [name, setName] = useState<string>("Untitled Program");

    useEffect(() => {
        setCode(initialCode); // Assurez-vous que le code est mis à jour
        setLanguage(initialLanguage); // Assurez-vous que la langue est mise à jour
    }, [initialCode, initialLanguage]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSave = async () => {
        try {
            await saveCode({ name, code, language }, token);
            toast.success(`${name} saved successfully`);
        } catch (error) {
            console.error("Error saving code:", error);
            toast.error(`Failed to save ${name}`);
        }
    };

    return (
        <Box>
            <input
                className="font-medium rounded px-2 outline-none"
                type="text"
                value={name}
                onChange={handleChange}
            />
            <Button onClick={handleSave} colorScheme="teal">
                Save Code
            </Button>
        </Box>
    );
};

export default SaveCode;
