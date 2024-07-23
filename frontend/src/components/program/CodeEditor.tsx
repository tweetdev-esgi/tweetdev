import React, { useRef, useState, useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../../constants";
import { getSession } from "../../services/sessionService";
import FileUploader from "../FileUploader";
import Output from "./Output";
import LanguageSelector from "./LanguageSelector";
import CreateCode from "../../components/program/CreateCode";
import OutputSelect from "./OutputSelect";

const outputFileType = [
  { name: "void" },
  { name: "png" },
  { name: "jpg" },
  { name: "py" },
  { name: "js" },
];

const CodeEditor: React.FC = () => {
  const editorRef = useRef<any>(null);
  const [language, setLanguage] =
    useState<keyof typeof CODE_SNIPPETS>("javascript");
  const [value, setValue] = useState<string>(CODE_SNIPPETS[language]);
  const [token, setToken] = useState<string | null>(null);
  const [outputType, setOutputType] = useState("void");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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

  const handleOutputTypeSelect = (name: string) => {
    setOutputType(name);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  return (
    <Box>
      <HStack>
        <Box w="50%">
          <div className="flex gap-2">
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
                enabled: true,
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
        <Output
          editorRef={editorRef}
          language={language}
          uploadedFile={uploadedFile}
        />
      </HStack>
      <div className="flex flex-row justify-between">
        <FileUploader
          onFileUpload={handleFileUpload}
          uploadedFile={uploadedFile}
        />
        <details className="dropdown relative">
          <summary className="btn px-2 min-h-0 h-6">
            Output Type : {outputType}
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow absolute bottom-full right-full">
            {outputFileType.map((type, key) => (
              <OutputSelect
                name={type.name}
                updateParentState={handleOutputTypeSelect}
                key={key}
              />
            ))}
          </ul>
        </details>
      </div>
    </Box>
  );
};

export default CodeEditor;
