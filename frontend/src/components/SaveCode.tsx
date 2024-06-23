import React, { useState } from 'react';
import { Box, Button, Input, useToast } from '@chakra-ui/react';
import { saveCode } from '../api';

interface SaveCodeProps {
    code: string;
    language: string;
}

const SaveCode: React.FC<SaveCodeProps> = ({ code, language }) => {
    const [name, setName] = useState('');
    const toast = useToast();

    const handleSave = async () => {
        try {
            await saveCode({ name, code, language });
            toast({
                title: 'Code saved.',
                description: `Your code "${name}" has been saved.`,
                status: 'success',
                duration: 6000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'An error occurred.',
                description: 'Unable to save code.',
                status: 'error',
                duration: 6000,
                isClosable: true,
            });
        }
    };

    return (
        <Box mb={4}>
            <Input
                placeholder="Enter code name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                mb={2}
            />
            <Button onClick={handleSave} colorScheme="blue">
                Save Code
            </Button>
        </Box>
    );
};

export default SaveCode;
