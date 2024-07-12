import React, { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector.tsx";
import { CODE_SNIPPETS } from "../constants.tsx";
import Output from "./Output.tsx";
import FileUploader from "./FileUploader.tsx";
import toast from "react-hot-toast";
// import { saveCode } from "../api";

const CodeEditor: React.FC = () => {
  const editorRef = useRef<any>(null);
  const [value, setValue] = useState<string>("");
  const [workflowName, setWorkflowName] = useState("Untitled Program");
  const [language, setLanguage] =
    useState<keyof typeof CODE_SNIPPETS>("javascript");

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language: keyof typeof CODE_SNIPPETS) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const handleFileUpload = (file: File) => {
    // const reader = new FileReader();
    // reader.onload = (event) => {
    //   const fileContent = event.target?.result;
    //   setValue(fileContent as string);
    // };
    // reader.readAsText(file);
  };

  const handleSaveCode = async (
    name: string,
    code: string,
    language: string
  ) => {
    try {
      //   await saveCode({ name, code, language });
      //   console.log(`Code sauvegarder: ${name} - ${language}`);
    } catch (error) {
      console.error("Nom du code:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveCode;

      toast.success(`${workflowName} saved`);
    }
  };
  const handleChange = (e) => {
    setWorkflowName(e.target.value);
    console.log(value);
  };
  return (
    <Box>
      <HStack>
        <Box w="50%">
          <div className="flex mb-2 gap-2">
            <input
              className="font-medium rounded px-2 outline-none "
              type="text"
              value={workflowName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />

            <LanguageSelector language={language} onSelect={onSelect} />
          </div>
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value || "")}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
      <FileUploader onFileUpload={handleFileUpload} />
    </Box>
  );
};

export default CodeEditor;
