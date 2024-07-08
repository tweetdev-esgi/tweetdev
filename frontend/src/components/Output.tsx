import {useState} from "react";
import {Box, Text} from "@chakra-ui/react";
import RunCodeButton from "./RunButton.tsx";

const Output = ({editorRef, language}) => {
    const [output, setOutput] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    return (
        <Box w="50%">
            <Text mb={2} fontSize="lg">
                Output
            </Text>
            <RunCodeButton
                editorRef={editorRef}
                language={language}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setIsError={setIsError}
                setOutput={setOutput}
            />
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
