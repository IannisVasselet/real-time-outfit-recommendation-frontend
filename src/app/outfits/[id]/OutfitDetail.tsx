import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Outfit } from '../api';

interface OutfitDetailProps {
    outfit: Outfit;
    onDelete: () => void;
}

export default function OutfitDetail({ outfit, onDelete }: OutfitDetailProps) {
    // Helper pour obtenir la couleur de badge en fonction du style
    const getStyleColor = (style: string) => {
        const colors = {
            'casual': 'bg-blue-100 text-blue-800 border-blue-200',
            'formal': 'bg-indigo-100 text-indigo-800 border-indigo-200',
            'sport': 'bg-green-100 text-green-800 border-green-200',
            'vintage': 'bg-amber-100 text-amber-800 border-amber-200',
            'business': 'bg-gray-100 text-gray-800 border-gray-200',
            'soirée': 'bg-pink-100 text-pink-800 border-pink-200',
        };
        return colors[style.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    // Helper pour obtenir la couleur de badge en fonction de la saison
    const getSeasonColor = (season: string) => {
        const colors = {
            'printemps': 'bg-green-100 text-green-800 border-green-200',
            'été': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'automne': 'bg-orange-100 text-orange-800 border-orange-200',
            'hiver': 'bg-blue-100 text-blue-800 border-blue-200',
            'toutes saisons': 'bg-purple-100 text-purple-800 border-purple-200',
        };
        return colors[season.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    // Helper pour obtenir la couleur de badge en fonction de l'occasion
    const getOccasionColor = (occasion: string) => {
        const colors = {
            'quotidien': 'bg-sky-100 text-sky-800 border-sky-200',
            'travail': 'bg-slate-100 text-slate-800 border-slate-200',
            'soirée': 'bg-violet-100 text-violet-800 border-violet-200',
            'sport': 'bg-emerald-100 text-emerald-800 border-emerald-200',
            'cérémonie': 'bg-rose-100 text-rose-800 border-rose-200',
            'vacances': 'bg-cyan-100 text-cyan-800 border-cyan-200',
        };
        return colors[occasion.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    // Réorganiser les éléments de tenue par position
    const sortedItems = [...outfit.items]
        .filter(item => item && item.clothing)
        .sort((a, b) => a.position - b.position);

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{outfit.name}</h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStyleColor(outfit.style)}`}>
                                Style: {outfit.style.charAt(0).toUpperCase() + outfit.style.slice(1)}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeasonColor(outfit.season)}`}>
                                Saison: {outfit.season.charAt(0).toUpperCase() + outfit.season.slice(1)}
                            </span>
                            {outfit.occasion && (
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getOccasionColor(outfit.occasion)}`}>
                                    Occasion: {outfit.occasion.charAt(0).toUpperCase() + outfit.occasion.slice(1)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <Link
                            href={`/outfits/${outfit.id}/edit`}
                            className="px-4 py-2 rounded-md bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 transition duration-200 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Modifier
                        </Link>
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

                {outfit.description && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                        <p className="text-gray-700">{outfit.description}</p>
                    </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Score de popularité: {outfit.popularity_score.toFixed(1)}
                    </div>
                    <div>
                        Ajouté le: {new Date(outfit.created_at).toLocaleDateString()}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Vêtements de la tenue</h2>

                {sortedItems.length === 0 ? (
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                        <p className="text-gray-500">Cette tenue ne contient aucun vêtement.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedItems.map((item, index) => (
                            <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="relative h-64 bg-gray-100">
                                    {item.clothing && item.clothing.image_url ? (
                                        <Image
                                            src={item.clothing.image_url}
                                            alt={item.clothing.name || `Vêtement ${index + 1}`}
                                            fill
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                                            Image non disponible
                                        </div>
                                    )}
                                    <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-md text-xs font-semibold text-gray-600 shadow-sm">
                                        Position {item.position}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <Link href={`/wardrobe/${item.clothing_id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                                        {item.clothing ? item.clothing.name : `Vêtement ID: ${item.clothing_id}`}
                                    </Link>
                                    {item.clothing && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {item.clothing.category && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                    {item.clothing.category.name}
                                                </span>
                                            )}
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center">
                                                <div
                                                    className="w-3 h-3 rounded-full mr-1"
                                                    style={{ backgroundColor: item.clothing.color }}
                                                ></div>
                                                {item.clothing.color}
                                            </span>
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                {item.clothing.style}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}