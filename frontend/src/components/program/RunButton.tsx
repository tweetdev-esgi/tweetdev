import { Button, useToast } from "@chakra-ui/react";
import { Play } from "lucide-react";
import CustomButton from "../buttons/CustomButton";
import { executeProgram } from "../../api/programs";
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
      const body = {
        language,
        code: sourceCode,
      };
      const result = await executeProgram("66942a72221193cfb4796a69", body);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
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
    <summary className="btn mb-2 px-2 min-h-0 h-6 " onClick={runCode}>
      Run Code
    </summary>
  );
};

export default RunCodeButton;
