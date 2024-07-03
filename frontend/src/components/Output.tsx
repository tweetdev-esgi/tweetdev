import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
    const toast = useToast();
    const [output, setOutput] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const runCode = async () => {
        if (!editorRef.current) return;
        const sourceCode = editorRef.current.getValue();
        try {
            setIsLoading(true);
            const result = await executeCode(language, sourceCode);
            setOutput(result.output.split("\n"));
            setIsError(!!result.stderr);
            console.log("Execution result:", result);
        } catch (error) {
            console.error("Error executing code:", error);
            toast({
                title: "An error occurred.",
                description: error.message || "Unable to run code",
                status: "error",
                duration: 6000,
            });
        }finally {
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
