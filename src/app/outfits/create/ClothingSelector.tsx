import React, { useState } from 'react';
import Image from 'next/image';
import { Clothing } from '../../wardrobe/api';

interface ClothingSelectorProps {
    wardrobe: Clothing[];
    selectedItems: Map<number, number>; // clothing_id -> position
    onSelect: (clothing: Clothing, position: number) => void;
    onRemove: (clothing_id: number) => void;
}

export default function ClothingSelector({
    wardrobe,
    selectedItems,
    onSelect,
    onRemove
}: ClothingSelectorProps) {
    const [filter, setFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Extraire toutes les catégories uniques
    const categories = Array.from(new Set(wardrobe.map(item => item.category?.name || 'Non classé')));

    // Filtrer les vêtements
    const filteredWardrobe = wardrobe.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(filter.toLowerCase()) ||
            (item.description || '').toLowerCase().includes(filter.toLowerCase()) ||
            item.color.toLowerCase().includes(filter.toLowerCase());

        const matchesCategory = categoryFilter === 'all' || item.category?.name === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    // Grouper par catégorie pour une meilleure organisation
    const groupedWardrobe: { [key: string]: Clothing[] } = {};

    filteredWardrobe.forEach(item => {
        const categoryName = item.category?.name || 'Non classé';
        if (!groupedWardrobe[categoryName]) {
            groupedWardrobe[categoryName] = [];
        }
        groupedWardrobe[categoryName].push(item);
    });

    // Déterminer le prochain numéro de position disponible
    const nextPosition = selectedItems.size > 0
        ? Math.max(...Array.from(selectedItems.values())) + 1
        : 1;

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sélectionnez vos vêtements</h2>

            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <div className="flex-grow">
                    <input
                        type="text"
                        placeholder="Rechercher un vêtement..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="md:w-1/3">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1rem',
                        }}
                    >
                        <option value="all">Toutes les catégories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {Object.keys(groupedWardrobe).length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Aucun vêtement trouvé.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {Object.entries(groupedWardrobe).map(([categoryName, clothes]) => (
                        <div key={categoryName}>
                            <h3 className="text-md font-medium text-gray-700 mb-2">{categoryName}</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {clothes.map(clothing => {
                                    const isSelected = selectedItems.has(clothing.id);
                                    const position = selectedItems.get(clothing.id);

                                    return (
                                        <div
                                            key={clothing.id}
                                            className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${isSelected
                                                    ? 'border-blue-500 ring-2 ring-blue-300'
                                                    : 'border-gray-200 hover:border-blue-300'
                                                }`}
                                            onClick={() => isSelected ? onRemove(clothing.id) : onSelect(clothing, nextPosition)}
                                        >
                                            <div className="relative h-40 bg-gray-100">
                                                <Image
                                                    src={clothing.image_url}
                                                    alt={clothing.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                                {isSelected && position !== undefined && (
                                                    <div className="absolute top-0 right-0 bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-bl-md font-bold">
                                                        {position}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-2">
                                                <p className="text-sm font-medium truncate">{clothing.name}</p>
                                                <div className="flex items-center mt-1">
                                                    <div
                                                        className="w-3 h-3 rounded-full mr-1"
                                                        style={{ backgroundColor: clothing.color }}
                                                    ></div>
                                                    <p className="text-xs text-gray-500 truncate">{clothing.color}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}