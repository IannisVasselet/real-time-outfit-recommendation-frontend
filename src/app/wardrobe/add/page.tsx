'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCategories } from '../api';
import { analyzeImage, AnalysisResult, addClothing, ClothingFormData } from './api';
import ImageUploader from './ImageUploader';
import ClothingForm from './ClothingForm';

interface CategoryOption {
    id: number;
    name: string;
}

export default function AddClothing() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Charger les catégories au chargement de la page
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                setError('Erreur lors du chargement des catégories');
                console.error(err);
            }
        };

        fetchCategories();
    }, []);

    const handleImageUpload = async (uploadedFile: File, previewUrl: string) => {
        setFile(uploadedFile);
        setImagePreview(previewUrl);
        setIsAnalyzing(true);
        setError(null);

        try {
            // Analyse directe de l'image via l'endpoint existant
            const result = await analyzeImage(uploadedFile);
            setAnalysisResult(result);

            // Utiliser le previewUrl comme URL de l'image temporairement
            setImageUrl(previewUrl);

            console.log("Résultat de l'analyse:", result);
        } catch (err) {
            setError('Erreur lors de l\'analyse de l\'image');
            console.error(err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSubmit = async (data: ClothingFormData) => {
        setIsSubmitting(true);
        setError(null);

        // Vérifiez si imageUrl est défini
        if (!imageUrl) {
            setError('L\'URL de l\'image est manquante. Veuillez réessayer de télécharger l\'image.');
            setIsSubmitting(false);
            return;
        }
        try {
            // Ajouter l'URL de l'image aux données
            const clothingData = {
                ...data,
                image_url: imageUrl
            };

            await addClothing(clothingData);
            router.push('/wardrobe');
        } catch (err: any) {
            setError(err.message || 'Erreur lors de l\'ajout du vêtement');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/wardrobe" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Retour à la garde-robe
                    </Link>
                    <h1 className="text-3xl font-bold mt-2">Ajouter un nouveau vêtement</h1>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <ImageUploader
                        onImageUpload={handleImageUpload}
                        imagePreview={imagePreview}
                        isUploading={isAnalyzing}
                    />

                    {file && (
                        <ClothingForm
                            categories={categories}
                            analysisResult={analysisResult}
                            isAnalyzing={isAnalyzing}
                            onSubmit={handleSubmit}
                            imageUrl={imageUrl}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}