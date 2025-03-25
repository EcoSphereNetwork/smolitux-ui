# FileUpload

Die FileUpload-Komponente ermöglicht es Benutzern, Dateien hochzuladen, entweder durch Auswahl über einen Datei-Dialog oder per Drag & Drop.

## Import

```jsx
import { FileUpload } from '@smolitux/core';
```

## Verwendung

### Einfacher FileUpload

```jsx
<FileUpload />
```

### FileUpload mit Label und Hilfetext

```jsx
<FileUpload 
  label="Dokumente hochladen" 
  helperText="Unterstützte Formate: PDF, DOC, DOCX (max. 5MB)" 
/>
```

### FileUpload mit benutzerdefiniertem Dropzone-Text

```jsx
<FileUpload 
  label="Bilder hochladen" 
  dropzoneText="Ziehen Sie Ihre Bilder hierher oder klicken Sie, um Dateien auszuwählen" 
/>
```

### FileUpload mit Dateityp-Beschränkung

```jsx
<FileUpload 
  label="Bilder hochladen" 
  accept="image/*" 
  helperText="Nur Bilddateien sind erlaubt" 
/>
```

### FileUpload mit Größenbeschränkung

```jsx
<FileUpload 
  label="Dokumente hochladen" 
  maxSize={5 * 1024 * 1024} // 5MB
  helperText="Maximale Dateigröße: 5MB" 
/>
```

### FileUpload mit Mehrfachauswahl

```jsx
<FileUpload 
  label="Mehrere Dateien hochladen" 
  multiple 
/>
```

### FileUpload mit Vorschau

```jsx
<FileUpload 
  label="Bilder mit Vorschau" 
  accept="image/*" 
  showPreview 
/>
```

### FileUpload mit Fortschrittsanzeige

```jsx
<FileUpload 
  label="Dateien mit Fortschrittsanzeige" 
  showProgress 
/>
```

### FileUpload mit automatischem Upload

```jsx
<FileUpload 
  label="Automatischer Upload" 
  autoUpload 
  uploadUrl="/api/upload" 
/>
```

### FileUpload mit benutzerdefiniertem Upload-Handler

```jsx
function CustomUploadExample() {
  const handleUpload = async (files) => {
    // Simuliere einen Upload-Prozess
    for (const file of files) {
      // Aktualisiere den Fortschritt
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        file.progress = progress;
        // Hier würde man normalerweise den State aktualisieren
      }
      
      file.status = 'success';
    }
    
    console.log('Upload abgeschlossen:', files);
  };
  
  return (
    <FileUpload 
      label="Benutzerdefinierter Upload" 
      onUpload={handleUpload} 
      showProgress 
    />
  );
}
```

### Kontrollierter FileUpload

```jsx
function ControlledFileUploadExample() {
  const [files, setFiles] = useState([]);
  
  const handleChange = (newFiles) => {
    setFiles(newFiles);
  };
  
  return (
    <div>
      <FileUpload 
        label="Kontrollierter FileUpload" 
        value={files} 
        onChange={handleChange} 
        showPreview 
      />
      
      <div className="mt-4">
        <h3 className="text-lg font-medium">Ausgewählte Dateien:</h3>
        <ul className="list-disc pl-5 mt-2">
          {files.map(file => (
            <li key={file.id}>
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### FileUpload mit Validierung

```jsx
function ValidatedFileUploadExample() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  
  const validateFiles = (newFiles) => {
    // Prüfe, ob alle Dateien Bilder sind
    const invalidFiles = newFiles.filter(file => !file.type.startsWith('image/'));
    
    if (invalidFiles.length > 0) {
      setError(`Folgende Dateien sind keine Bilder: ${invalidFiles.map(f => f.name).join(', ')}`);
      return false;
    }
    
    // Prüfe, ob alle Dateien kleiner als 2MB sind
    const largeFiles = newFiles.filter(file => file.size > 2 * 1024 * 1024);
    
    if (largeFiles.length > 0) {
      setError(`Folgende Dateien sind größer als 2MB: ${largeFiles.map(f => f.name).join(', ')}`);
      return false;
    }
    
    setError('');
    return true;
  };
  
  const handleChange = (newFiles) => {
    if (validateFiles(newFiles)) {
      setFiles(newFiles);
    }
  };
  
  return (
    <FileUpload 
      label="Bilder hochladen (max. 2MB)" 
      accept="image/*" 
      value={files} 
      onChange={handleChange} 
      error={error} 
      showPreview 
    />
  );
}
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `label` | `string` | - | Label für die Dateiauswahl |
| `dropzoneText` | `string` | `'Dateien hierher ziehen oder klicken, um auszuwählen'` | Text im Dropbereich |
| `helperText` | `ReactNode` | - | Hilfetext |
| `error` | `ReactNode` | - | Fehlermeldung |
| `value` | `FileInfo[]` | - | Aktuelle Dateien |
| `onChange` | `(files: FileInfo[]) => void` | - | Callback bei Datei-Änderungen |
| `onUploadStart` | `(files: FileInfo[]) => void` | - | Callback bei Upload-Start |
| `onUploadProgress` | `(file: FileInfo, progress: number) => void` | - | Callback bei Upload-Fortschritt |
| `onUploadComplete` | `(file: FileInfo) => void` | - | Callback bei Upload-Abschluss |
| `onUploadError` | `(file: FileInfo, error: any) => void` | - | Callback bei Upload-Fehler |
| `autoUpload` | `boolean` | `false` | Automatischer Upload |
| `maxSize` | `number` | - | Maximale Dateigröße in Bytes |
| `accept` | `string` | - | Akzeptierte Dateitypen (z.B. "image/*,.pdf") |
| `multiple` | `boolean` | `false` | Mehrfachauswahl erlauben |
| `disabled` | `boolean` | `false` | Komponente deaktivieren |
| `showPreview` | `boolean` | `false` | Vorschau anzeigen |
| `showProgress` | `boolean` | `false` | Fortschrittsanzeige anzeigen |
| `uploadUrl` | `string` | - | URL für automatischen Upload |
| `uploadMethod` | `'POST' \| 'PUT'` | `'POST'` | HTTP-Methode für Upload |
| `uploadHeaders` | `Record<string, string>` | - | HTTP-Header für Upload |
| `uploadFieldName` | `string` | `'file'` | Feldname für Upload |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### FileInfo Interface

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|-------------|
| `id` | `string` | Eindeutige ID des Files |
| `name` | `string` | Original-Dateiname |
| `type` | `string` | MIME-Typ |
| `size` | `number` | Dateigröße in Bytes |
| `file` | `File` | Datei-Objekt |
| `progress` | `number` | Fortschritt (0-100) |
| `error` | `string` | Fehler |
| `status` | `'idle' \| 'uploading' \| 'success' \| 'error'` | Status |
| `previewUrl` | `string` | Vorschau-URL |

## Barrierefreiheit

Die FileUpload-Komponente ist für Barrierefreiheit optimiert:

- Verwendet native `<input type="file">` Elemente für korrekte Semantik
- Labels sind korrekt mit den Eingabefeldern verknüpft
- Unterstützt Tastaturnavigation
- Bietet visuelle und textuelle Rückmeldung zum Upload-Status
- Fehlermeldungen werden klar kommuniziert

## Beispiele

### Profilbild-Upload

```jsx
function ProfileImageUpload() {
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleImageChange = (files) => {
    if (files.length > 0) {
      setImage(files[0]);
      setIsUploading(true);
      
      // Simuliere einen Upload
      setTimeout(() => {
        setIsUploading(false);
        files[0].status = 'success';
        files[0].progress = 100;
      }, 2000);
    } else {
      setImage(null);
    }
  };
  
  const handleRemoveImage = () => {
    setImage(null);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Profilbild ändern</h2>
      
      <div className="flex items-center mb-6">
        <div className="relative mr-4">
          {image && image.previewUrl ? (
            <img 
              src={image.previewUrl} 
              alt="Profilbild" 
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </div>
        
        <div>
          <FileUpload 
            accept="image/*"
            onChange={handleImageChange}
            showPreview
            dropzoneText="Bild auswählen"
            helperText="JPG, PNG oder GIF (max. 2MB)"
            maxSize={2 * 1024 * 1024}
            className="mb-2"
          />
          
          {image && (
            <button 
              className="text-sm text-red-600 hover:text-red-800"
              onClick={handleRemoveImage}
            >
              Bild entfernen
            </button>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          Speichern
        </button>
      </div>
    </div>
  );
}
```

### Dokumenten-Upload mit Fortschrittsanzeige

```jsx
function DocumentUpload() {
  const [documents, setDocuments] = useState([]);
  
  const handleDocumentsChange = (files) => {
    setDocuments(files);
  };
  
  const handleUpload = async () => {
    // Simuliere einen Upload-Prozess für jede Datei
    const updatedDocuments = [...documents];
    
    for (let i = 0; i < updatedDocuments.length; i++) {
      const doc = updatedDocuments[i];
      
      if (doc.status !== 'idle') continue;
      
      doc.status = 'uploading';
      setDocuments([...updatedDocuments]);
      
      // Simuliere Fortschritt
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        doc.progress = progress;
        setDocuments([...updatedDocuments]);
      }
      
      // Simuliere Erfolg oder Fehler (zufällig)
      if (Math.random() > 0.2) {
        doc.status = 'success';
      } else {
        doc.status = 'error';
        doc.error = 'Upload fehlgeschlagen. Bitte versuchen Sie es erneut.';
      }
      
      setDocuments([...updatedDocuments]);
    }
  };
  
  const handleRemove = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };
  
  const handleRetry = async (id) => {
    const doc = documents.find(d => d.id === id);
    if (!doc) return;
    
    doc.status = 'uploading';
    doc.error = undefined;
    doc.progress = 0;
    setDocuments([...documents]);
    
    // Simuliere Fortschritt
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      doc.progress = progress;
      setDocuments([...documents]);
    }
    
    doc.status = 'success';
    setDocuments([...documents]);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Dokumente hochladen</h2>
      
      <FileUpload 
        label="Dokumente auswählen"
        accept=".pdf,.doc,.docx,.txt"
        multiple
        value={documents}
        onChange={handleDocumentsChange}
        helperText="Unterstützte Formate: PDF, DOC, DOCX, TXT (max. 10MB pro Datei)"
        maxSize={10 * 1024 * 1024}
        className="mb-6"
      />
      
      {documents.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Ausgewählte Dokumente</h3>
            <button 
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              onClick={handleUpload}
              disabled={documents.every(doc => doc.status !== 'idle')}
            >
              Alle hochladen
            </button>
          </div>
          
          <div className="border rounded-md divide-y">
            {documents.map(doc => (
              <div key={doc.id} className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium">{doc.name}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">
                      {(doc.size / 1024).toFixed(2)} KB
                    </span>
                    
                    {doc.status === 'idle' && (
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleRemove(doc.id)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    
                    {doc.status === 'error' && (
                      <button 
                        className="text-yellow-500 hover:text-yellow-700"
                        onClick={() => handleRetry(doc.id)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    )}
                    
                    {doc.status === 'success' && (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                
                {(doc.status === 'uploading' || doc.status === 'success') && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${doc.status === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${doc.progress}%` }}
                    ></div>
                  </div>
                )}
                
                {doc.status === 'error' && (
                  <p className="text-sm text-red-500 mt-1">{doc.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Bild-Galerie-Upload

```jsx
function ImageGalleryUpload() {
  const [images, setImages] = useState([]);
  
  const handleImagesChange = (files) => {
    // Filtere nur Bilder
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setImages(imageFiles);
  };
  
  const handleRemoveImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Bilder-Galerie</h2>
      
      <FileUpload 
        label="Bilder hochladen"
        accept="image/*"
        multiple
        value={images}
        onChange={handleImagesChange}
        showPreview
        helperText="Ziehen Sie Ihre Bilder hierher oder klicken Sie, um Dateien auszuwählen"
        className="mb-6"
      />
      
      {images.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Vorschau ({images.length} Bilder)</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map(img => (
              <div key={img.id} className="relative group">
                <img 
                  src={img.previewUrl} 
                  alt={img.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button 
                    className="p-1 bg-white rounded-full text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveImage(img.id)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-1 text-sm truncate">{img.name}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              Alle hochladen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```