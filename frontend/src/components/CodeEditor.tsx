import React, { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor, Monaco } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";

const CodeEditor: React.FC = () => {
    const editorRef = useRef<any>(null);
    const [value, setValue] = useState<string>("");
    const [language, setLanguage] = useState<keyof typeof CODE_SNIPPETS>("javascript");

    const onMount = (editor: Monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelect = (language: keyof typeof CODE_SNIPPETS) => {
        setLanguage(language);
        setValue(CODE_SNIPPETS[language]);
    };

    return (
        <Box>
            <HStack spacing={4}>
                <Box w="50%">
                    <LanguageSelector language={language} onSelect={onSelect} />
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
            </HStack>
        </Box>
    );
};

export default CodeEditor;
