import { Button, useToast } from "@chakra-ui/react";
import { Play } from "lucide-react";
import CustomButton from "../buttons/CustomButton";
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
      setOutput("fsdf");
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
    <div onClick={runCode}>
      <CustomButton color={"#355cc9"} Icon={Play} text={"Run Code"} />
    </div>
  );
};

export default RunCodeButton;
