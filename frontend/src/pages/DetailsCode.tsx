import React, { useRef, useState, useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { getSession } from "../services/sessionService";

import { useParams } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import Output from "../components/Output";
import SaveCode from "../components/program/SaveCode";
import LanguageSelector from "../components/program/LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
export default function DetailsCode(props) {
  const { id } = useParams<{ id: string }>();
  const editorRef = useRef<any>(null);
  const [language, setLanguage] =
    useState<keyof typeof CODE_SNIPPETS>("javascript");
  const [value, setValue] = useState<string>("");
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
    <div className="mt-20 mx-6">
      <Box>
        <div className="flex justify-center mb-6">
          <h1 className="font-semibold text-xl ">Details Program</h1>
        </div>
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
      </Box>
    </div>
  );
}
