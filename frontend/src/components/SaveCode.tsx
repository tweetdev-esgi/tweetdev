import React, {useState} from "react";
import {Box, Button, Input} from "@chakra-ui/react";
import {saveCode} from "../api/saveCode";
import toast from "react-hot-toast";
import {getSession} from "../services/sessionService";

interface SaveCodeProps {
    initialName: string;
    initialCode: string;
    initialLanguage: string;
    token: string;
}

const SaveCode: React.FC<SaveCodeProps> = ({initialName, initialCode, initialLanguage, token}) => {
    const [name, setName] = useState<string>(initialName);
    const [code] = useState<string>(initialCode);
    const [language] = useState<string>(initialLanguage);

    const handleSave = async () => {
        try {
            const token = getSession();
            if (token) {
                await saveCode({name, code, language}, token);
                toast.success(`${name} saved successfully`);
            }
        } catch (error) {
            console.error("Error saving code:", error);
            toast.error(`Failed to save ${name}`);
        }
    };

    return (
        <Box>
            <Input
                placeholder="Workflow Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                mb={2}
            />
            <Button onClick={handleSave} colorScheme="teal">
                Save Code
            </Button>
        </Box>
    );
};

export default SaveCode;
