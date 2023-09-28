import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { FilePond, registerPlugin } from 'react-filepond';
import { FilePondFile, FilePondInitialFile } from 'filepond';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { Input } from '@mantine/core';

// Register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type ImageDropzoneProps = {
  files: FilePondFile[];
  setFiles: (files: FilePondFile[]) => void;
};

export function ImageDropzone({ files, setFiles }: ImageDropzoneProps) {
  return (
    <>
      <Input.Label>Images</Input.Label>
      <FilePond
        allowReorder
        files={files as unknown as (string | FilePondInitialFile | Blob | File)[]}
        onupdatefiles={(fileItems) => {
          // Convert FilePond file items to an array of File objects
          const convertedFiles = fileItems.map(
            (fileItem) => fileItem.file
          ) as unknown as FilePondFile[];
          setFiles(convertedFiles);
        }}
        onreorderfiles={(reorderedItems) => {
          // Convert FilePond reordered items to an array of File objects
          const newFiles = reorderedItems.map((item) => item.file) as unknown as FilePondFile[];
          setFiles(newFiles);
        }}
        allowMultiple
        maxFiles={3}
        name="files"
        labelIdle='Drag & Drop your images or <span class="filepond--label-action">Browse</span>'
      />
    </>
  );
}
