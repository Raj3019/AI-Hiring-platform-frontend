"use client";;
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Upload, FileText, X, CheckCircle, Loader2 } from "lucide-react";

export default function FileUpload06({ onFilesChange }) {
  const [uploads, setUploads] = useState([]);
  const filePickerRef = useRef(null);

  useEffect(() => {
    if (onFilesChange) {
      const completedFiles = uploads
        .filter((u) => u.status === "completed")
        .map((u) => u.file);
      onFilesChange(completedFiles);
    }
  }, [uploads, onFilesChange]);

  const openFilePicker = () => {
    filePickerRef.current?.click();
  };

  const onFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      const maxSize = 5 * 1024 * 1024; // 5MB
      const filteredFiles = filesArray.filter(file => allowedTypes.includes(file.type) && file.size <= maxSize);
      const newUploads = filteredFiles.map((file, idx) => ({
        id: `${file.name}-${Date.now()}-${idx}`,
        name: file.name,
        progress: 0,
        status: "uploading",
        file,
      }));
      setUploads((prev) => [...prev, ...newUploads]);

      // Simulate upload progress for each file
      newUploads.forEach((upload) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.floor(Math.random() * 20) + 10;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setUploads((prev) =>
              prev.map((u) =>
                u.id === upload.id ? { ...u, progress, status: "completed" } : u
              )
            );
          } else {
            setUploads((prev) =>
              prev.map((u) =>
                u.id === upload.id ? { ...u, progress } : u
              )
            );
          }
        }, 400);
      });
      event.target.value = "";
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDropFiles = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      const filesArray = Array.from(droppedFiles);
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      const maxSize = 5 * 1024 * 1024; // 5MB
      const filteredFiles = filesArray.filter(file => allowedTypes.includes(file.type) && file.size <= maxSize);
      const newUploads = filteredFiles.map((file, idx) => ({
        id: `${file.name}-${Date.now()}-${idx}`,
        name: file.name,
        progress: 0,
        status: "uploading",
        file,
      }));
      setUploads((prev) => [...prev, ...newUploads]);

      // Simulate upload progress for each file
      newUploads.forEach((upload) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.floor(Math.random() * 20) + 10;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setUploads((prev) =>
              prev.map((u) =>
                u.id === upload.id ? { ...u, progress, status: "completed" } : u
              )
            );
          } else {
            setUploads((prev) =>
              prev.map((u) =>
                u.id === upload.id ? { ...u, progress } : u
              )
            );
          }
        }, 400);
      });
    }
  };

  const removeUploadById = (id) => {
    setUploads(uploads.filter((file) => file.id !== id));
  };

  const activeUploads = uploads.filter((file) => file.status === "uploading");
  const completedUploads = uploads.filter((file) => file.status === "completed");

  return (
    <div className="mx-auto flex w-full flex-col gap-y-6">
      <Card
        className="group flex max-h-[200px] w-full flex-col items-center justify-center gap-4 py-8 border-dashed text-sm cursor-pointer hover:bg-muted/50 transition-colors"
        onDragOver={onDragOver}
        onDrop={onDropFiles}
        onClick={openFilePicker}>
        <div className="grid space-y-3">
          <div className="flex items-center gap-x-2 text-muted-foreground">
            <Upload className="size-5" />
            <div>
              Drop files here or{" "}
              <Button
                variant="link"
                className="text-primary p-0 h-auto font-normal"
                onClick={openFilePicker}>
                browse files
              </Button>{" "}
              to add
            </div>
          </div>
        </div>
        <input
          ref={filePickerRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          multiple
          onChange={onFileInputChange} />
        <span
          className="text-base/6 text-muted-foreground group-disabled:opacity-50 mt-2 block sm:text-xs">
          Supported: PDF, DOC, DOCX (max 5 MB)
        </span>
      </Card>
      <div className="flex flex-col gap-y-4">
        {activeUploads.length > 0 && (
          <div>
            <h2
              className="text-foreground text-lg flex items-center font-mono font-normal uppercase sm:text-xs mb-4">
              <Loader2 className="size-4 mr-1 animate-spin" />
              Uploading
            </h2>
            <div className="-mt-2 divide-y">
              {activeUploads.map((file) => (
                <div key={file.id} className="group flex items-center py-4 pr-4">
                  <div
                    className="mr-3 grid size-10 shrink-0 place-content-center rounded border bg-muted">
                    <FileText className="inline size-4 group-hover:hidden" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden size-4 group-hover:inline p-0 h-auto"
                      onClick={() => removeUploadById(file.id)}
                      aria-label="Cancel">
                      <X className="size-4" />
                    </Button>
                  </div>
                  <div className="flex flex-col w-full mb-1 pr-4">
                    <div className="flex justify-between gap-2">
                      <span
                        className="select-none text-base/6 text-foreground group-disabled:opacity-50 sm:text-sm/6">
                        {file.name}
                      </span>
                      <span className="text-muted-foreground text-sm tabular-nums">
                        {file.progress}%
                      </span>
                    </div>
                    <Progress value={file.progress} className="mt-1 h-2 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeUploads.length > 0 && completedUploads.length > 0 && (
          <Separator className="my-0" />
        )}

        {completedUploads.length > 0 && (
          <div>
            <h2
              className="text-foreground text-lg flex items-center font-mono font-normal uppercase sm:text-xs mb-4">
              <CheckCircle className="mr-1 size-4" />
              Finished
            </h2>
            <div className="-mt-2 divide-y">
              {completedUploads.map((file) => (
                <div key={file.id} className="group flex items-center py-4 pr-4">
                  <div
                    className="mr-3 grid size-10 shrink-0 place-content-center rounded border bg-muted">
                    <FileText className="inline size-4 group-hover:hidden" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden size-4 group-hover:inline p-0 h-auto"
                      onClick={() => removeUploadById(file.id)}
                      aria-label="Remove">
                      <X className="size-4" />
                    </Button>
                  </div>
                  <div className="flex flex-col w-full mb-1 pr-4">
                    <div className="flex justify-between gap-2">
                      <span
                        className="select-none text-base/6 text-foreground group-disabled:opacity-50 sm:text-sm/6">
                        {file.name}
                      </span>
                      <span className="text-muted-foreground text-sm tabular-nums">
                        {file.progress}%
                      </span>
                    </div>
                    <Progress value={file.progress} className="mt-1 h-2 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
