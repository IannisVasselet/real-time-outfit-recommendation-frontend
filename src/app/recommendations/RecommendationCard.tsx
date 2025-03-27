import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Outfit } from '../outfits/api';

interface RecommendationCardProps {
    outfit: Outfit;
    matchScore?: number; // Score de correspondance en pourcentage
}

export default function RecommendationCard({ outfit, matchScore = 100 }: RecommendationCardProps) {
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
        .filter(item => item && item.clothing)
        .sort((a, b) => a.position - b.position);

    // Trouver des images pour afficher (limité à 3 maximum)
    const displayItems = sortedItems.slice(0, Math.min(3, sortedItems.length));

    // Calculer la couleur du score d'adéquation
    const getMatchScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 75) return 'text-blue-600';
        if (score >= 50) return 'text-yellow-600';
        return 'text-orange-600';
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
            <div
                className={`h-44 relative bg-gradient-to-r ${getStyleGradient(outfit.style)}`}
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

                {/* Score d'adéquation */}
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full shadow-md">
                    <span className={`font-bold ${getMatchScoreColor(matchScore)}`}>
                        {matchScore}%
                    </span>
                    <span className="text-xs text-gray-500 ml-1">adéquation</span>
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

                    <Link
                        href={`/outfits/${outfit.id}`}
                        className="ml-auto text-blue-600 text-xs hover:underline"
                    >
                        Voir détails
                    </Link>
                </div>
            </div>
        </div>
    );
}