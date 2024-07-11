import { Button, useToast } from "@chakra-ui/react";
const RunCodeButton = ({
  editorRef,
  language,
  isLoading,
  setIsLoading,
  setIsError,
  setOutput,
}) => {
  const toast = useToast();

  const runCode = async () => {
    if (!editorRef.current) return;
    const sourceCode = editorRef.current.getValue();
    try {
      setIsLoading(true);
      //   const result = await executeCode(language, sourceCode);
      //   setOutput(result.output.split("\n"));
      //   setIsError(!!result.stderr);
      console.log("Execution result:", "not implemented");
    } catch (error) {
      console.error("Error executing code:", error);
      toast({
        title: "An error occurred.",
        // description: error.message || "Unable to run code",
        description: "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      colorScheme="green"
      mb={4}
      isLoading={isLoading}
      onClick={runCode}
    >
      Run Code
    </Button>
  );
};

export default RunCodeButton;
