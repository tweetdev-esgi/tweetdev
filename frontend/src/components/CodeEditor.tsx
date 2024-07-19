import React, { useRef, useState, useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import FileUploader from "./FileUploader";
import SaveCode from "./SaveCode";
import { getSession } from "../services/sessionService";

const CodeEditor: React.FC = () => {
  const editorRef = useRef<any>(null);
  const [value, setValue] = useState<string>("");
  const [language, setLanguage] =
    useState<keyof typeof CODE_SNIPPETS>("javascript");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const sessionToken = getSession();
    if (sessionToken) {
      setToken(sessionToken);
    } else {
      console.error("No session token found");
    }
  }, []);

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

  return (
    <Box>
      <HStack>
        <Box w="50%">
          <div className="flex mb-2 gap-2">
            {token && (
              <SaveCode
                initialCode={value}
                initialLanguage={language}
                token={token}
              />
            )}
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
