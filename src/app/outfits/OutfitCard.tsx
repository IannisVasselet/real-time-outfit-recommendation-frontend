import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Outfit } from './api';

interface OutfitCardProps {
    outfit: Outfit;
}

export default function OutfitCard({ outfit }: OutfitCardProps) {
    // Fonction pour obtenir le gradient de couleur en fonction du style
    const getStyleGradient = (style: string) => {
        const gradients = {
            'casual': 'from-blue-500 to-sky-300',
            'formal': 'from-indigo-600 to-purple-400',
            'sport': 'from-green-500 to-emerald-300',
            'vintage': 'from-amber-500 to-yellow-300',
            'business': 'from-gray-700 to-gray-500',
            'soirée': 'from-pink-500 to-rose-300',
        };
        return gradients[style.toLowerCase()] || 'from-gray-500 to-gray-400';
    };

    // Fonction pour obtenir la couleur de badge en fonction de la saison
    const getSeasonColor = (season: string) => {
        const colors = {
            'printemps': 'bg-green-100 text-green-800',
            'été': 'bg-yellow-100 text-yellow-800',
            'automne': 'bg-orange-100 text-orange-800',
            'hiver': 'bg-blue-100 text-blue-800',
            'toutes saisons': 'bg-purple-100 text-purple-800',
        };
        return colors[season.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    // Réorganiser les éléments de tenue par position
    const sortedItems = [...outfit.items]
        .filter(item => item && item.clothing) // Filtrer les éléments null ou sans vêtement
        .sort((a, b) => a.position - b.position);

    // Trouver des images pour afficher (limité à 3 maximum)
    const displayItems = sortedItems.slice(0, Math.min(3, sortedItems.length));

    return (
        <Link href={`/outfits/${outfit.id}`}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                <div
                    className={`h-40 relative bg-gradient-to-r ${getStyleGradient(outfit.style)}`}
                >
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        {displayItems.length > 0 ? (
                            <div className="flex space-x-2 justify-center items-center h-full">
                                {displayItems.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="w-24 h-32 relative rounded-md overflow-hidden bg-white shadow-md"
                                        style={{ transform: `rotate(${index % 2 === 0 ? -5 : 5}deg)` }}
                                    >
                                        {item.clothing && item.clothing.image_url ? (
                                            <Image
                                                src={item.clothing.image_url}
                                                alt={item.clothing.name || 'Vêtement'}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                                                Image non disponible
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-white text-lg font-medium">
                                {outfit.name}
                            </div>
                        )}
                    </div>

                    {/* Badge de saison */}
                    <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeasonColor(outfit.season)}`}>
                            {outfit.season.charAt(0).toUpperCase() + outfit.season.slice(1)}
                        </span>
                    </div>
                </div>

                <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{outfit.name}</h3>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                        {outfit.description || "Aucune description disponible."}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
                            {outfit.style}
                        </span>

                        {outfit.occasion && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
                                {outfit.occasion}
                            </span>
                        )}

                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full ml-auto flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            {outfit.popularity_score.toFixed(1)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}