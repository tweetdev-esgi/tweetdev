import React from "react";

import { Box } from "@chakra-ui/react";
import CodeEditor from "../components/CodeEditor";
function CodeExecution(props) {
  return (
    <div className="mt-20 mx-6">
      <Box>
        <CodeEditor />
      </Box>
    </div>
  );
}

export default CodeExecution;
