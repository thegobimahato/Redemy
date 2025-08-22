import { IconCloudUpload } from "@tabler/icons-react";
import { AlertCircle, RefreshCw } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const RenderEmptyState = ({ isDragActive }: { isDragActive: boolean }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center transition-colors duration-300 ease-in-out",
        isDragActive
          ? "bg-primary/5 text-primary"
          : "bg-muted/30 text-muted-foreground",
        "rounded-xl p-8 w-full h-full",
      )}
    >
      <div className="flex items-center justify-center size-16 rounded-full bg-background shadow-sm ring-1 ring-inset ring-border mb-4">
        <IconCloudUpload
          className={cn(
            "size-8 text-muted-foreground transition-colors",
            isDragActive && "text-primary",
          )}
        />
      </div>

      <h3 className="text-lg font-semibold text-foreground">
        Upload your file
      </h3>
      <p className="text-sm text-muted-foreground mt-1 mb-5 max-w-xs">
        Drag & drop your file here, or{" "}
        <span className="text-primary font-medium cursor-pointer hover:underline">
          browse to upload
        </span>
      </p>

      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="rounded-xl"
      >
        Select File
      </Button>
    </div>
  );
};

const RenderErrorState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-xl border border-destructive/30 bg-destructive/10 p-6 shadow-sm">
      <div className="flex items-center justify-center size-14 rounded-full bg-destructive/15 mb-4">
        <AlertCircle className="size-7 text-destructive" />
      </div>

      <h3 className="text-lg font-semibold text-destructive">Upload Failed</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Something went wrong while uploading your file. Please try again.
      </p>

      <Button
        type="button"
        variant="destructive"
        className="mt-5 inline-flex items-center gap-2 rounded-xl"
      >
        <RefreshCw className="size-4" />
        Retry Upload
      </Button>
    </div>
  );
};

export { RenderEmptyState, RenderErrorState };
