import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      onFileUpload(file);
      toast.success(`${file.name} uploaded successfully`);
    }
  };

  const handleSummaryClick = () => {
    fileInputRef.current?.click();
  };

  const handleDiscardFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input value
    }
  };

  return (
    <div>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <summary className="btn px-2 min-h-0 h-6" onClick={handleSummaryClick}>
        Upload File
      </summary>
      {uploadedFile && (
        <div className="mt-2 flex items-center">
          <summary className="btn px-2 min-h-0 h-6">
            <span>{uploadedFile.name}</span>
          </summary>
          <summary
            className="btn px-2 min-h-0 h-6 flex justify-center items-center"
            onClick={handleDiscardFile}
          >
            <span className="">X</span>
          </summary>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
