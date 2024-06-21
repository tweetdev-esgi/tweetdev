import React from 'react';
import {Box, VStack} from '@chakra-ui/react';
import CodeEditor from '../components/CodeEditor';

const CodeEditorPage: React.FC = () => {
    return (
        <Box>
            <VStack spacing={4} align="stretch">
                <CodeEditor/>
            </VStack>
        </Box>

    );
};

export default CodeEditorPage;
