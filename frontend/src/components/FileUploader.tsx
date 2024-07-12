import React, { useRef } from "react";
import toast from "react-hot-toast";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
    toast.success(file?.name + " uploaded successfully");
  };
  const handleSummaryClick = () => {
    fileInputRef.current.click();
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
    </div>
  );
};

export default FileUploader;
