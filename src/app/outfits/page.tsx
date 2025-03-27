'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getOutfits, Outfit, OutfitFilters } from './api';
import OutfitCard from './OutfitCard';
import FilterBar from './FilterBar';

export default function OutfitsPage() {
    const [outfits, setOutfits] = useState<Outfit[]>([]);
    const [filters, setFilters] = useState<OutfitFilters>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;

    // Chargement des tenues avec filtres
    useEffect(() => {
        const fetchOutfits = async () => {
            setLoading(true);
            try {
                const data = await getOutfits(currentPage * itemsPerPage, itemsPerPage, filters);
                setOutfits(data);
                setError(null);
            } catch (err) {
                setError('Erreur lors du chargement des tenues');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOutfits();
    }, [filters, currentPage]);

    // Gestion du changement de filtres
    const handleFilterChange = (newFilters: OutfitFilters) => {
        setFilters(newFilters);
        setCurrentPage(0); // Réinitialiser la pagination lors du changement de filtres
    };

    // Navigation entre les pages
    const handleNextPage = () => {
        if (outfits.length === itemsPerPage) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Exploration de tenues</h1>
                <Link
                    href="/outfits/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Créer une tenue
                </Link>
            </div>

            <FilterBar filters={filters} onFilterChange={handleFilterChange} />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    {outfits.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">Aucune tenue trouvée</h3>
                            <p className="text-gray-500 mb-4">
                                Il n'y a pas de tenues correspondant à vos critères de recherche.
                            </p>
                            <Link
                                href="/outfits/create"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Créer une tenue
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                {outfits.map((outfit) => (
                                    <OutfitCard key={outfit.id} outfit={outfit} />
                                ))}
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 0}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Page précédente
                                </button>
                                <span className="text-gray-700">
                                    Page {currentPage + 1}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={outfits.length < itemsPerPage}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Page suivante
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </main>
    );
}