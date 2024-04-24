import { cn } from "@/lib/utils";
import { ALLOWED_MIMETYPES } from "@/shared/constants";
import { DownloadIcon } from "lucide-react";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import Compressor from "compressorjs";

export type DropzoneProps = {
  handler: (file: string) => void;
  width: number;
  height: number;
};

export const DropzoneArea = ({ handler, width, height }: DropzoneProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop: React.useCallback(
      <T extends File>(acceptedFiles: T[]) => {
        const file = acceptedFiles[0];
        if (!file || !ALLOWED_MIMETYPES.includes(file.type))
          return toast.error("Error: file type forbidden.");

        new Compressor(file, {
          width,
          height,
          maxHeight: height,
          maxWidth: width,
          strict: true,
          resize: "cover",
          quality: 0.9,
          error: (error) => {
            toast.error(`Error while processing your image: ${error.message}`);
          },
          success: (compressedImage: File | Blob) => {
            const reader = new FileReader();
            reader.LOADING && setIsLoading(true);
            reader.readAsDataURL(compressedImage);
            reader.onloadend = function (e: ProgressEvent<FileReader>) {
              const encodedImage = e.target?.result as string;
              handler(encodedImage);
            };
          }
        });
      },
      [handler, width, height]
    )
  });

  if (isLoading) {
    return (
      <Skeleton className='mx-auto h-[280px] max-h-[280px] w-full max-w-xl  rounded-2xl p-4 py-12' />
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "base-border bg-foreground-default mx-auto grid w-full max-w-xl place-content-center rounded-2xl border-[1px] p-4 py-12",
        { "divide-dashed border-primary/85": isDragActive }
      )}>
      <div className='flex w-full select-none flex-col items-center gap-3'>
        <DownloadIcon />
        <h3 className='max-w-[260px] text-center text-primary'>
          {isDragActive
            ? "Drop your image here"
            : "Click to select or drag and drop an image here"}
        </h3>
        <span className='description'>Extensions: [.JPEG, .JPG, .PNG].</span>

        <Input {...getInputProps()} />
      </div>
    </div>
  );
};
