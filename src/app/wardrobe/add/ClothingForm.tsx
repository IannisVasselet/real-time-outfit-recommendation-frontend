import React, { useEffect, useState } from 'react';
import { CategoryOption, ClothingFormData, AnalysisResult } from './api';

interface ClothingFormProps {
    analysisResult: AnalysisResult | null;
    categories: CategoryOption[];
    onSubmit: (data: ClothingFormData) => void;
    isSubmitting: boolean;
    imageUrl: string;
}

export default function ClothingForm({
    analysisResult,
    categories,
    onSubmit,
    isSubmitting,
    imageUrl
}: ClothingFormProps) {
    const [formData, setFormData] = useState<ClothingFormData>({
        name: '',
        description: '',
        image_url: imageUrl || '',
        category_id: 0,
        color: '',
        pattern: '',
        style: '',
        season: 'toutes saisons',
    });

    // Code existant pour mettre à jour le formulaire avec les résultats de l'analyse...

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'category_id' ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const seasons = ['printemps', 'été', 'automne', 'hiver', 'toutes saisons'];
    const styles = ['casual', 'formal', 'sport', 'vintage', 'business', 'soirée'];

    // Component pour les labels avec indicateur obligatoire
    const Label = ({ htmlFor, required = false, children }: { htmlFor: string; required?: boolean; children: React.ReactNode }) => (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name" required>Nom du vêtement</Label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Ex: Jean bleu slim"
                        className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-300 focus:border-blue-500 
                       focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200 
                       shadow-sm hover:border-gray-400"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category_id" required>Catégorie</Label>
                    <select
                        id="category_id"
                        name="category_id"
                        value={formData.category_id || ''}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-300 focus:border-blue-500 
                       focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200 
                       shadow-sm hover:border-gray-400 appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1rem'
                        }}
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="color" required>Couleur</Label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            id="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            required
                            placeholder="Ex: bleu marine"
                            className="flex-grow px-4 py-2.5 bg-white rounded-lg border border-gray-300 focus:border-blue-500 
                         focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200 
                         shadow-sm hover:border-gray-400"
                        />
                        <div
                            className="w-10 h-10 ml-2 border border-gray-300 rounded-lg shadow-inner"
                            style={{ backgroundColor: formData.color || '#ffffff' }}
                        ></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="pattern">Motif</Label>
                    <input
                        type="text"
                        id="pattern"
                        name="pattern"
                        value={formData.pattern || ''}
                        onChange={handleChange}
                        placeholder="Ex: uni, rayé, à carreaux..."
                        className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-300 focus:border-blue-500 
                       focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200 
                       shadow-sm hover:border-gray-400"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="style" required>Style</Label>
                    <select
                        id="style"
                        name="style"
                        value={formData.style}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-300 focus:border-blue-500 
                       focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200 
                       shadow-sm hover:border-gray-400 appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1rem'
                        }}
                    >
                        <option value="">Sélectionnez un style</option>
                        {styles.map(style => (
                            <option key={style} value={style}>
                                {style.charAt(0).toUpperCase() + style.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="season" required>Saison</Label>
                    <select
                        id="season"
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-300 focus:border-blue-500 
                       focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200 
                       shadow-sm hover:border-gray-400 appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1rem'
                        }}
                    >
                        <option value="">Sélectionnez une saison</option>
                        {seasons.map(season => (
                            <option key={season} value={season}>
                                {season.charAt(0).toUpperCase() + season.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Décrivez ce vêtement (matière, particularités, etc.)"
                    className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-300 focus:border-blue-500 
                     focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200 
                     shadow-sm hover:border-gray-400 resize-none"
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:ring-offset-2 transition-all duration-200 
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="flex items-center">
                            <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                            <span>Enregistrement...</span>
                        </div>
                    ) : 'Ajouter à ma garde-robe'}
                </button>
            </div>
        </form>
    );
}