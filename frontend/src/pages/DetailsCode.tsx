import React, { useRef, useState, useEffect } from "react";
import { Box, HStack, Text, Spinner } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { getSession } from "../services/sessionService";
import { useParams } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import Output from "../components/program/Output";
import SaveCode from "../components/program/SaveCode";
import LanguageSelector from "../components/program/LanguageSelector";
import {
  fetchProgramById,
  getIsProgramDeletable,
  executeProgram,
} from "../api/programs";
import OutputSelect from "../components/program/OutputSelect";
const outputFileType = [
  { name: "void" },
  { name: "png" },
  { name: "jpg" },
  { name: "py" },
  { name: "js" },
];
export default function DetailsCode(props) {
  const { id } = useParams<{ id: string }>();
  const editorRef = useRef<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [programData, setProgramData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFoundPost, setNotFoundPost] = useState<boolean>(false);
  const [isModifiable, setIsModifiable] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [outputType, setOutputType] = useState("void");
  const handleOutputTypeSelect = (name: string) => {
    setOutputType(name);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionToken = getSession();
        if (!sessionToken) {
          console.error("No session token found");
          return;
        }
        setToken(sessionToken);

        if (id) {
          const programData = await fetchProgramById(sessionToken, id);
          if (programData) {
            setProgramData(programData);
            setLoading(false);

            // Check if the program is deletable after fetching the program
            const response = await getIsProgramDeletable(sessionToken, id);
            setIsModifiable(response);
          } else {
            setNotFoundPost(true);
            setLoading(false);
          }
        }
      } catch (error) {
        setNotFoundPost(true);
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const runCode = async () => {
    if (!editorRef.current) return;
    const sourceCode = editorRef.current.getValue();
    try {
      const body = {
        language: programData?.language || "javascript",
        code: sourceCode,
        file: uploadedFile, // Add file to the body if it's set
      };
      console.log(body);
      const result = await executeProgram(token || "", body);

      console.log(result);
      setProgramData((prevData) => ({
        ...prevData,
        output: result,
      }));
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

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
                {token && programData && (
                  <SaveCode
                    initialCode={programData.content}
                    initialLanguage={programData.language}
                    token={token}
                    programData={programData}
                    isModifiable={isModifiable}
                  />
                )}
                <LanguageSelector
                  language={programData?.language || ""}
                  onSelect={(language) => {
                    setProgramData((prevData) => ({
                      ...prevData,
                      language,
                      content: prevData?.content || "",
                    }));
                  }}
                  isModifiable={isModifiable}
                />
              </div>
              <Editor
                options={{
                  minimap: {
                    enabled: true,
                  },
                  readOnly: !isModifiable,
                }}
                height="75vh"
                theme="vs-dark"
                language={programData?.language || "javascript"}
                value={programData?.content || ""}
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
                onChange={(value) =>
                  setProgramData((prevData) => ({
                    ...prevData,
                    content: value || "",
                  }))
                }
              />
            </Box>
            <Output
              editorRef={editorRef}
              language={programData?.language || "javascript"}
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
          </div>{" "}
        </Box>
      </Box>
    </div>
  );
}
