import { cn } from '@/lib/utils';
import { ALLOWED_MIMETYPES } from '@/shared/constants';
import { DownloadIcon } from 'lucide-react';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';
import { toast } from 'sonner';

export type DropzoneProps = { handler: (file: string) => void };

export const DropzoneArea = ({ handler }: DropzoneProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop: React.useCallback(
      <T extends File>(acceptedFiles: T[]) => {
        const file = acceptedFiles[0];
        if (!file || !ALLOWED_MIMETYPES.includes(String(file.type)))
          return toast.error('Error: file type forbidden.');

        const reader = new FileReader();
        reader.LOADING && setIsLoading(true);
        reader.readAsDataURL(file);
        reader.onloadend = function (e: ProgressEvent<FileReader>) {
          const encodedImage = e.target?.result as string;
          handler(encodedImage);
          setIsLoading(false);
        };
      },
      [handler]
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
        'base-border mx-auto grid w-full max-w-xl place-content-center rounded-2xl border-[2px] bg-foreground-default p-4 py-12',
        { 'divide-dashed border-blue-400/85': isDragActive }
      )}>
      <div className='flex w-full select-none flex-col items-center gap-3'>
        <DownloadIcon />
        <h3 className='max-w-[260px] text-center text-blue-400'>
          {isDragActive
            ? 'Drop your image here'
            : 'Click to select or drag and drop an image here'}
        </h3>
        <span className='description'>Extensions: [.JPEG, .JPG, .PNG].</span>

        <Input {...getInputProps()} />
      </div>
    </div>
  );
};
