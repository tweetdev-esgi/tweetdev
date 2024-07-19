import React, { useRef, useState, useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../../constants";
import { getSession } from "../../services/sessionService";
import FileUploader from "../FileUploader";
import Output from "../Output";
import LanguageSelector from "./LanguageSelector";
import CreateCode from "../../components/program/CreateCode";
const CodeEditor: React.FC = () => {
  const editorRef = useRef<any>(null);
  const [language, setLanguage] =
    useState<keyof typeof CODE_SNIPPETS>("javascript");
  const [value, setValue] = useState<string>(CODE_SNIPPETS[language]);
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
              <CreateCode
                initialCode={value}
                initialLanguage={language}
                token={token}
              />
            )}
            <LanguageSelector
              language={language}
              onSelect={onSelect}
              isModifiable={true}
            />
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
