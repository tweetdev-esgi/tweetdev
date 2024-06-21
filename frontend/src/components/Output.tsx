import React, { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { AxiosError } from "axios";

interface OutputProps {
    editorRef: React.RefObject<any>;
    language: string;
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
    const toast = useToast();
    const [output, setOutput] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        try {
            setIsLoading(true);
            const result = await executeCode(language, sourceCode);
            setOutput(result.run.output.split("\n"));
            setIsError(result.run.code !== 0);
        } catch (error) {
            let description = "Unable to run code";
            if (error instanceof AxiosError) {
                description = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                description = error.message;
            }

            console.log(error);
            toast({
                title: "An error occurred.",
                description: description,
                status: "error",
                duration: 6000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box w="50%">
            <Text mb={2} fontSize="lg">
                Output
            </Text>
            <Button
                variant="outline"
                colorScheme="green"
                mb={4}
                isLoading={isLoading}
                onClick={runCode}
            >
                Run Code
            </Button>
            <Box
                height="75vh"
                p={2}
                color={isError ? "red.400" : ""}
                border="1px solid"
                borderRadius={4}
                borderColor={isError ? "red.500" : "#333"}
            >
                {output
                    ? output.map((line, i) => <Text key={i}>{line}</Text>)
                    : 'Click "Run Code" to see the output here'}
            </Box>
        </Box>
    );
};

export default Output;
