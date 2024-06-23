import React, { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import FileUploader from "./FileUploader";
import SaveCode from "./SaveCode.tsx";

const CodeEditor: React.FC = () => {
    const editorRef = useRef<any>(null);
    const [value, setValue] = useState<string>("");
    const [language, setLanguage] = useState<keyof typeof CODE_SNIPPETS>("javascript");

    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelect = (language: keyof typeof CODE_SNIPPETS) => {
        setLanguage(language);
        setValue(CODE_SNIPPETS[language]);
    };

    const handleFileUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target?.result;
            setValue(fileContent as string);
        };
        reader.readAsText(file);
    };

    const handleSaveCode = (name: string, code: string, language: string) => {
        // Ajouter la logique pour sauvegarder le code ici
        // Cela pourrait impliquer un appel à une API backend pour stocker le code
        console.log(`Saving code: ${name} - ${language}`);
        // Exemple : saveCodeToServer(name, code, language);
    };

    return (
        <Box>
            <HStack>
                <Box w="50%">
                    <LanguageSelector language={language} onSelect={onSelect} />
                    <FileUploader onFileUpload={handleFileUpload} />
                    <SaveCode code={value} language={language} onSave={handleSaveCode} />
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
        </Box>
    );
};

export default CodeEditor;
