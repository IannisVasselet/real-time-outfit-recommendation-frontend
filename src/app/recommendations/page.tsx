'use client';

import React, { useState, useEffect } from 'react';
import { Outfit } from '../outfits/api';
import { getRecommendations, RecommendationRequest } from './api';
import WeatherSelector from './WeatherSelector';
import OccasionSelector from './OccasionSelector';
import StylePreferences from './StylePreferences';
import RecommendationCard from './RecommendationCard';

export default function RecommendationsPage() {
    // États pour les filtres et les résultats
    const [weather, setWeather] = useState('');
    const [temperature, setTemperature] = useState(20);
    const [occasion, setOccasion] = useState('quotidien');
    const [preferredStyles, setPreferredStyles] = useState<string[]>([]);
    const [preferredColors, setPreferredColors] = useState<string[]>([]);

    const [recommendations, setRecommendations] = useState<Outfit[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [autoFetchEnabled, setAutoFetchEnabled] = useState(false);

    // Effet pour charger les recommandations lors des changements de filtres
    useEffect(() => {
        // Ne pas charger automatiquement avant que l'utilisateur ne demande explicitement
        if (isInitialLoad || !autoFetchEnabled) {
            return;
        }

        const fetchRecommendations = async () => {
            setLoading(true);

            try {
                const requestParams: RecommendationRequest = {
                    weather,
                    temperature,
                    occasion,
                    preferred_styles: preferredStyles.length > 0 ? preferredStyles : undefined,
                    preferred_colors: preferredColors.length > 0 ? preferredColors : undefined
                };

                const data = await getRecommendations(requestParams);
                setRecommendations(data);
                setError(null);
            } catch (err) {
                setError('Erreur lors de la récupération des recommandations');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        // Utiliser un debounce pour limiter les appels API
        const timeoutId = setTimeout(() => {
            fetchRecommendations();
        }, 500); // Augmenter le délai pour réduire le nombre d'appels

        return () => clearTimeout(timeoutId);
    }, [weather, temperature, occasion, preferredStyles, preferredColors, isInitialLoad, autoFetchEnabled]);

    // Gestionnaires de changement des filtres
    const handleWeatherChange = (newWeather: string, newTemperature: number) => {
        setWeather(newWeather);
        setTemperature(newTemperature);
        // Ne pas activer la recherche automatique lors du premier chargement
        if (isInitialLoad) {
            setIsInitialLoad(false);
        }
    };

    const handleOccasionChange = (newOccasion: string) => {
        setOccasion(newOccasion);
    };

    const handleStyleChange = (styles: string[]) => {
        setPreferredStyles(styles);
    };

    const handleColorChange = (colors: string[]) => {
        setPreferredColors(colors);
    };

    // Fonction pour générer un score d'adéquation aléatoire mais plausible
    const generateMatchScore = (outfit: Outfit): number => {
        // Créer un score basé sur la correspondance du style et de l'occasion
        let baseScore = 75; // Score de base

        // Bonus si le style correspond
        if (preferredStyles.includes(outfit.style)) {
            baseScore += 15;
        }

        // Bonus si l'occasion correspond
        if (outfit.occasion === occasion) {
            baseScore += 10;
        }

        // Ajout d'un facteur aléatoire pour la variété
        const randomFactor = Math.floor(Math.random() * 10) - 5;
        let finalScore = baseScore + randomFactor;

        // Borner le score entre 50 et 100
        return Math.min(100, Math.max(50, finalScore));
    };

    // Fonction manuelle pour déclencher la recherche
    const handleSearchClick = async () => {
        setAutoFetchEnabled(true); // Activer la recherche auto après le premier clic
        setLoading(true);
        // Ne pas activer la recherche automatique lors du premier chargement
        if (isInitialLoad) {
            setIsInitialLoad(false);
        }

        try {
            const requestParams: RecommendationRequest = {
                weather,
                temperature,
                occasion,
                preferred_styles: preferredStyles.length > 0 ? preferredStyles : undefined,
                preferred_colors: preferredColors.length > 0 ? preferredColors : undefined
            };

            const data = await getRecommendations(requestParams);
            setRecommendations(data);
            setError(null);
        } catch (err) {
            setError('Erreur lors de la récupération des recommandations');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour éliminer les doublons dans les recommandations
    const uniqueRecommendations = Array.from(
        new Map(recommendations.map(outfit => [outfit.id, outfit])).values()
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Recommandations de tenues</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <WeatherSelector onWeatherChange={handleWeatherChange} />
                <OccasionSelector selectedOccasion={occasion} onChange={handleOccasionChange} />
                <StylePreferences
                    selectedStyles={preferredStyles}
                    selectedColors={preferredColors}
                    onStyleChange={handleStyleChange}
                    onColorChange={handleColorChange}
                />
            </div>

            <div className="flex justify-center mb-8">
                <button
                    onClick={handleSearchClick}
                    disabled={loading}
                    className={`px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                            <span>Recherche en cours...</span>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Trouver des tenues</span>
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {recommendations.length > 0 ? (
                <>
                    <h2 className="text-xl font-semibold mb-4">Tenues recommandées</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {uniqueRecommendations.map((outfit) => (
                            <RecommendationCard
                                key={outfit.id}
                                outfit={outfit}
                                matchScore={generateMatchScore(outfit)}
                            />
                        ))}
                    </div>
                </>
            ) : !loading && !isInitialLoad && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Aucune recommandation trouvée</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Essayez d'ajuster vos préférences ou de changer l'occasion pour obtenir des recommandations.
                    </p>
                </div>
            )}
        </main>
    );
}