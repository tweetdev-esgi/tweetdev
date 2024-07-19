import React, { useRef, useState, useEffect } from "react";
import { Box, HStack, Text, Spinner } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { getSession } from "../services/sessionService";
import { useParams } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import Output from "../components/Output";
import SaveCode from "../components/program/SaveCode";
import LanguageSelector from "../components/program/LanguageSelector";
import { fetchProgramById } from "../api/programs";

export default function DetailsCode(props) {
  const { id } = useParams<{ id: string }>();
  const editorRef = useRef<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [programData, setProgramData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFoundPost, setNotFoundPost] = useState<boolean>(false);

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

  const handleFileUpload = (file: File) => {
    // const reader = new FileReader();
    // reader.onload = (event) => {
    //   const fileContent = event.target?.result;
    //   setProgramData((prevData) => ({
    //     ...prevData,
    //     content: fileContent as string,
    //   }));
    // };
    // reader.readAsText(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionToken = getSession();
        if (sessionToken && id) {
          const programData = await fetchProgramById(sessionToken, id);
          if (programData) {
            setProgramData(programData);
            setLoading(false);
            console.log(programData);
          } else {
            setNotFoundPost(true);
            setLoading(false);
          }
        }
      } catch (error) {
        setNotFoundPost(true);
        setLoading(false);
        console.error("Error fetching post:", error);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-20 mx-6">
        <Box>
          <div className="flex justify-center mb-6">
            <Spinner size="xl" />
          </div>
        </Box>
      </div>
    );
  }

  if (notFoundPost) {
    return (
      <div className="mt-20 mx-6">
        <Box>
          <div className="flex justify-center mb-6">
            <Text fontSize="xl" color="red.500">
              Program not found or ID not recognized.
            </Text>
          </div>
        </Box>
      </div>
    );
  }

  return (
    <div className="mt-20 mx-6">
      <Box>
        <div className="flex justify-center mb-6">
          <h1 className="font-semibold text-xl">Details Program</h1>
        </div>
        <Box>
          <HStack>
            <Box w="50%">
              <div className="flex mb-2 gap-2">
                {token && (
                  <SaveCode
                    initialCode={programData.content}
                    initialLanguage={programData.language}
                    token={token}
                    programData={programData}
                  />
                )}
                <LanguageSelector
                  language={programData.language}
                  onSelect={(language) => {
                    setProgramData((prevData) => ({
                      ...prevData,
                      language: language,
                      content: programData.content, // Reset content to default for the new language if needed
                    }));
                  }}
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
                language={programData.language}
                value={programData.content}
                onMount={onMount}
                onChange={(value) =>
                  setProgramData((prevData) => ({
                    ...prevData,
                    content: value || "",
                  }))
                }
              />
            </Box>
            <Output editorRef={editorRef} language={programData.language} />
          </HStack>
          <FileUploader onFileUpload={handleFileUpload} />
        </Box>
      </Box>
    </div>
  );
}
