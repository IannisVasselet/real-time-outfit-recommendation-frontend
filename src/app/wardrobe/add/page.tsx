'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';
import ClothingForm from './ClothingForm';
import { analyzeImage, getCategories, addClothing, CategoryOption, AnalysisResult, ClothingFormData } from './api';

export default function AddClothing() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
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
            // Analyse de l'image
            const result = await analyzeImage(uploadedFile);
            setAnalysisResult(result);
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

        try {
            await addClothing(data);
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
                <h1 className="text-3xl font-bold mb-6">Ajouter un vêtement</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Étape 1: Téléchargez une photo du vêtement</h2>
                    <ImageUploader onImageUpload={handleImageUpload} isLoading={isAnalyzing} />

                    {file && analysisResult && !isAnalyzing && (
                        <>
                            <h2 className="text-xl font-semibold mb-4">Étape 2: Complétez les informations</h2>
                            <ClothingForm
                                analysisResult={analysisResult}
                                categories={categories}
                                onSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                                imageUrl={imagePreview}
                            />
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}