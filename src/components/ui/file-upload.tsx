"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export const FileUpload = ({
  className,
  onFileChange,
  maxSizeMB = 10,
  acceptedFileTypes = [".pdf", ".docx", ".doc", ".txt"],
}: {
  className?: string;
  onFileChange?: (file: File) => void;
  maxSizeMB?: number;
  acceptedFileTypes?: string[];
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (selectedFile: File): boolean => {
    setError(null);

    // Check file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return false;
    }

    // Check file type
    const fileExtension = `.${selectedFile.name.split('.').pop()?.toLowerCase()}`;
    if (!acceptedFileTypes.includes(fileExtension)) {
      setError(`File type not supported. Please upload ${acceptedFileTypes.join(', ')}`);
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        if (onFileChange) {
          onFileChange(selectedFile);
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        if (onFileChange) {
          onFileChange(droppedFile);
        }
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full max-w-lg mx-auto",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 transition-all duration-200 shadow-sm",
          isDragging && "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 scale-[1.02] shadow-md",
          file && "border-green-500 bg-green-50/50 dark:bg-green-900/20 scale-[1.02] shadow-md"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className={cn(
              "w-16 h-16 mb-4 text-gray-400",
              isDragging && "text-blue-500",
              file && "text-green-500"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          {file ? (
            <div className="text-center">
              <p className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                <span className="font-semibold">{file.name}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <>
              <p className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                PDF, DOCX, or TXT (MAX. 10MB)
              </p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileChange}
        />
      </div>
      {error && (
        <div className="mt-2 text-red-500 text-sm font-medium">
          {error}
        </div>
      )}
    </div>
  );
};
