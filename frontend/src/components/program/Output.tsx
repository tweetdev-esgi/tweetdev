import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import RunCodeButton from "./RunButton";

const Output = ({ editorRef, language }) => {
  // const initialOutput = [
  //   "Compilation started...",
  //   "Compilation successful.",
  //   "Running the code...",
  //   "Output:",
  //   "Hello, world!",
  // ];

  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <Box w="50%" mb={-8}>
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
        p={16}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        backgroundColor={"#1E1E1E"}
        borderColor={isError ? "red.500" : "#333"}
      >
        {/* {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'} */}
        <div className="text-sm font-normal">{output}</div>
      </Box>
    </Box>
  );
};
export default Output;
