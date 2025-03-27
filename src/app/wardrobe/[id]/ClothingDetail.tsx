import React from 'react';
import Image from 'next/image';
import { Clothing } from '../api';

interface ClothingDetailProps {
    clothing: Clothing;
    onEdit: () => void;
    onDelete: () => void;
}

export default function ClothingDetail({ clothing, onEdit, onDelete }: ClothingDetailProps) {
    // Helper function pour obtenir la couleur de fond en fonction de la saison
    const getSeasonColor = (season: string) => {
        const colors = {
            'printemps': 'bg-green-100 text-green-800',
            'été': 'bg-yellow-100 text-yellow-800',
            'automne': 'bg-orange-100 text-orange-800',
            'hiver': 'bg-blue-100 text-blue-800',
            'toutes saisons': 'bg-purple-100 text-purple-800'
        };
        return colors[season.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    // Helper function pour obtenir la couleur de fond en fonction du style
    const getStyleColor = (style: string) => {
        const colors = {
            'casual': 'bg-blue-50 text-blue-600',
            'formal': 'bg-gray-100 text-gray-800',
            'sport': 'bg-red-50 text-red-600',
            'vintage': 'bg-amber-50 text-amber-600',
            'business': 'bg-indigo-50 text-indigo-600',
            'soirée': 'bg-pink-50 text-pink-600'
        };
        return colors[style.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="relative h-96 w-full bg-gray-50">
                <Image
                    src={clothing.image_url}
                    alt={clothing.name}
                    fill
                    priority
                    className="object-contain"
                />

                {/* Badge de saison */}
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeasonColor(clothing.season)}`}>
                        {clothing.season.charAt(0).toUpperCase() + clothing.season.slice(1)}
                    </span>
                </div>
            </div>

            <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{clothing.name}</h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStyleColor(clothing.style)}`}>
                                {clothing.style.charAt(0).toUpperCase() + clothing.style.slice(1)}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {clothing.category?.name}
                            </span>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={onEdit}
                            className="px-4 py-2 rounded-md bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 transition duration-200 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Modifier
                        </button>
                        <button
                            onClick={onDelete}
                            className="px-4 py-2 rounded-md bg-white border border-red-500 text-red-500 hover:bg-red-50 transition duration-200 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Supprimer
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-6">
                    <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500">Couleur</p>
                            <div className="flex items-center mt-1">
                                <div
                                    className="w-5 h-5 rounded-full mr-2 border border-gray-300"
                                    style={{ backgroundColor: clothing.color }}
                                ></div>
                                <p className="text-gray-800 capitalize">{clothing.color}</p>
                            </div>
                        </div>
                    </div>

                    {clothing.pattern && (
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-50 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500">Motif</p>
                                <p className="text-gray-800 capitalize mt-1">{clothing.pattern}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500">Ajouté le</p>
                            <p className="text-gray-800 mt-1">{new Date(clothing.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-50 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500">Dernière mise à jour</p>
                            <p className="text-gray-800 mt-1">{new Date(clothing.updated_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {clothing.description && (
                    <div className="mt-6 border-t border-gray-100 pt-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Description</h3>
                        <p className="text-gray-700 leading-relaxed">{clothing.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}