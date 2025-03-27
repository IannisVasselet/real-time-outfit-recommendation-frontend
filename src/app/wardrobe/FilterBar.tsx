import React from 'react';
import { CategoryFilter } from './api';

interface FilterBarProps {
    categories: CategoryFilter[];
    selectedCategory: number | null;
    onCategoryChange: (categoryId: number | null) => void;
    onSearch: (searchTerm: string) => void;
}

export default function FilterBar({ categories, selectedCategory, onCategoryChange, onSearch }: FilterBarProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label htmlFor="search" className="block mb-2 text-sm font-medium">Rechercher</label>
                    <input
                        type="text"
                        id="search"
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Rechercher un vêtement..."
                    />
                </div>

                <div className="md:w-64">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium">Catégorie</label>
                    <select
                        id="category"
                        value={selectedCategory === null ? '' : selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : null)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        {categories.map((category) => (
                            <option key={category.id ?? 'all'} value={category.id ?? ''}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}