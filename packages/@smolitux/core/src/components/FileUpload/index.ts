// packages/@smolitux/core/src/components/FileUpload/index.ts
import { FileUpload as BaseFileUpload } from './FileUpload';
import { FileUploadA11y } from './FileUpload.a11y';

export type { FileUploadProps, FileInfo } from './FileUpload';

// Erweitere FileUpload um die A11y-Komponente
export const FileUpload = Object.assign(BaseFileUpload, {
  A11y: FileUploadA11y
});

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default FileUpload;