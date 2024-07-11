import React from "react";
import { Box, Button, Input } from "@chakra-ui/react";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <Box mb={4}>
      <Input
        type="file"
        onChange={handleFileChange}
        display="none"
        id="file-upload"
      />
      <Button
        as="label"
        htmlFor="file-upload"
        variant="outline"
        colorScheme="blue"
      >
        Upload File
      </Button>
    </Box>
  );
};

export default FileUploader;
