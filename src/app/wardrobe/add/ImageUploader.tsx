import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
    onImageUpload: (file: File, previewUrl: string, serverUrl?: string) => void;
    imagePreview: string;
    isUploading: boolean;
}

export default function ImageUploader({ onImageUpload, isUploading: isLoading }: ImageUploaderProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreview(base64String);
                onImageUpload(file, base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreview(base64String);
                onImageUpload(file, base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="mb-6">
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${isLoading ? 'bg-gray-100 border-gray-300' : 'border-blue-300 hover:bg-blue-50 hover:border-blue-500'
                    } transition-colors cursor-pointer`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {preview ? (
                    <div className="relative h-64 mx-auto max-w-sm">
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-contain"
                        />
                    </div>
                ) : (
                    <div className="py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                            Cliquez ou glissez-déposez pour télécharger une image
                        </p>
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    disabled={isLoading}
                />

                {isLoading && (
                    <div className="mt-4 flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
                        <span className="ml-2 text-gray-600">Analyse en cours...</span>
                    </div>
                )}
            </div>
        </div>
    );
}