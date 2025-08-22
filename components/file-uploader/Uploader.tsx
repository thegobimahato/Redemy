"use client";

import { useCallback, useState } from "react";

import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { v4 as uuidV4 } from "uuid";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "../ui/card";
import { RenderEmptyState, RenderErrorState } from "./RenderEmptyState";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

const Uploader = () => {
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
  });

  const uploadFile = async (file: File) => {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    try {
      // get presigned URL
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        }),
      });

      if (!presignedResponse.ok) {
        toast.error("Failed to get presigned URL");
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }));

        return;
      }

      const { presignedUrl, key } = await presignedResponse.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100;
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentageCompleted),
            }));
          }
        };

        xhr.onload = () => {
          console.log("Tigris response:", xhr.status, xhr.responseText);
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              progress: 100,
              uploading: false,
              key: key,
            }));

            toast.success("File uploaded successfully");
            resolve();
          } else {
            toast.error(`Upload failed...: ${xhr.status}`);
            reject(
              new Error(`Upload failed: ${xhr.status} ${xhr.responseText}`),
            );
          }
        };

        xhr.onerror = () => {
          reject(new Error("Upload failed"));
        };

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error("Something went wrong");

      setFileState((prev) => ({
        ...prev,
        error: true,
        progress: 0,
        uploading: false,
      }));
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      setFileState({
        file: file,
        uploading: false,
        progress: 0,
        objectUrl: URL.createObjectURL(file),
        error: false,
        id: uuidV4(),
        isDeleting: false,
        fileType: "image",
      });

      uploadFile(file);
    }
  }, []);

  const rejectedFiles = (fileRejection: FileRejection[]) => {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files",
      );

      if (tooManyFiles) {
        toast.error("Too many files selected, max is 1");
      }

      const filesSizeToBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large",
      );

      if (filesSizeToBig) {
        toast.error("File size exceeds the limit, Max is 5MB");
      }
    }
  };

  const renderContent = () => {
    if (fileState.uploading) {
      return <h1>Uploading...</h1>;
    }

    if (fileState.error) {
      return <RenderErrorState />;
    }

    if (fileState.objectUrl) {
      return <h1>Upload file</h1>;
    }

    return <RenderEmptyState isDragActive={isDragActive} />;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5mb
    onDropRejected: rejectedFiles,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative w-full h-72 border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out cursor-pointer",
        isDragActive
          ? "border-primary bg-primary/5 shadow-md scale-[1.01]"
          : "border-border hover:border-primary/70 hover:shadow-sm",
      )}
    >
      <CardContent className="flex items-center justify-center w-full h-full p-6">
        <input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default Uploader;
