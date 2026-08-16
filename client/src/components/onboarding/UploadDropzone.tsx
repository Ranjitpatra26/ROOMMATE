import React, { useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';

export interface UploadDropzoneProps {
  label: string;
  currentImage?: string;
  onImageChange: (imageUri: string | null) => void;
  helperText?: string;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  label,
  currentImage,
  onImageChange,
  helperText = 'JPG, PNG or WEBP up to 5MB. Clear, editorial headshots work best.',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageChange(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block font-sans text-label-caps text-secondary uppercase font-bold tracking-wider">
        {label}
      </label>

      {currentImage ? (
        <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-earth-indigo shadow-md group">
          <img src={currentImage} alt="Uploaded profile" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onImageChange(null)}
            className="absolute top-2 right-2 bg-earth-indigo text-clay p-1.5 rounded-full opacity-80 hover:opacity-100 transition-opacity shadow"
            title="Remove photo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-vitality-coral bg-vitality-fixed/10'
              : 'border-outline-variant hover:border-earth-indigo bg-surface-low hover:bg-clay-container'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="w-12 h-12 rounded-full bg-clay flex items-center justify-center mb-3 shadow-sm border border-surface-dim">
            <Camera className="w-6 h-6 text-earth-indigo" />
          </div>
          <p className="font-sans text-ui-medium text-earth-indigo font-semibold mb-1">
            Click to upload or drag & drop
          </p>
          <p className="font-sans text-xs text-secondary max-w-xs">{helperText}</p>
        </div>
      )}
    </div>
  );
};
