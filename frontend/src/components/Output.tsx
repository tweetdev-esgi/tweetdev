import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface OutputProps {
    output: string;
}

const Output: React.FC<OutputProps> = ({ output }) => {
    return (
        <Box w="50%">
            <Text mb={2} fontSize="lg">
                Output
            </Text>
            <Box
                height="75vh"
                p={2}
                border="1px solid"
                borderRadius={4}
                borderColor="#333"
                overflowY="auto"
            >
                <Text whiteSpace="pre-wrap">{output || 'Click "Run Code" to see the output here'}</Text>
            </Box>
        </Box>
    );
};

export default Output;
