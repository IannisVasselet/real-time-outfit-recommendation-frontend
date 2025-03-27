'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getClothes, getCategories, Clothing, CategoryFilter } from './api';
import ClothingCard from './ClothingCard';
import FilterBar from './FilterBar';

export default function Wardrobe() {
    const [clothes, setClothes] = useState<Clothing[]>([]);
    const [categories, setCategories] = useState<CategoryFilter[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Charger les catégories
        getCategories()
            .then(data => setCategories(data))
            .catch(err => setError('Erreur lors du chargement des catégories'));

        // Charger les vêtements
        fetchClothes();
    }, []);

    // Rafraîchir les vêtements quand la catégorie change
    useEffect(() => {
        fetchClothes();
    }, [selectedCategory]);

    const fetchClothes = async () => {
        setLoading(true);
        try {
            const data = await getClothes(0, 100, selectedCategory || undefined);
            setClothes(data);
            setError(null);
        } catch (err) {
            setError('Erreur lors du chargement des vêtements');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (categoryId: number | null) => {
        setSelectedCategory(categoryId);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    // Filtrer les vêtements par terme de recherche
    const filteredClothes = clothes.filter(clothing =>
        clothing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clothing.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Ma Garde-robe</h1>
                <Link
                    href="/wardrobe/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Ajouter un vêtement
                </Link>
            </div>

            <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                onSearch={handleSearch}
            />

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
                    {filteredClothes.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">
                                Aucun vêtement trouvé. Ajoutez-en un pour commencer.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredClothes.map(clothing => (
                                <ClothingCard key={clothing.id} clothing={clothing} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </main>
    );
}