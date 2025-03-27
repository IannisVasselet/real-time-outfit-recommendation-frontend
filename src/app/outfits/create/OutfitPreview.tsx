import React from 'react';
import Image from 'next/image';
import { Clothing } from '../../wardrobe/api';

interface PreviewItem {
    clothing: Clothing;
    position: number;
}

interface OutfitPreviewProps {
    items: PreviewItem[];
    onChangePosition: (clothingId: number, newPosition: number) => void;
    onRemove: (clothingId: number) => void;
}

export default function OutfitPreview({ items, onChangePosition, onRemove }: OutfitPreviewProps) {
    // Trier les items par position
    const sortedItems = [...items].sort((a, b) => a.position - b.position);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Aperçu de la tenue</h2>

            {items.length === 0 ? (
                <div className="bg-gray-50 p-10 rounded-lg text-center">
                    <p className="text-gray-500">
                        Sélectionnez des vêtements pour composer votre tenue.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {sortedItems.map(({ clothing, position }) => (
                        <div key={clothing.id} className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition">
                            <div className="relative w-20 h-20 bg-white rounded border border-gray-200 overflow-hidden">
                                <Image
                                    src={clothing.image_url}
                                    alt={clothing.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div className="flex-grow ml-4">
                                <p className="font-medium">{clothing.name}</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {clothing.category && (
                                        <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
                                            {clothing.category.name}
                                        </span>
                                    )}
                                    <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full flex items-center">
                                        <div
                                            className="w-2 h-2 rounded-full mr-1"
                                            style={{ backgroundColor: clothing.color }}
                                        ></div>
                                        {clothing.color}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 ml-2">
                                <div className="flex items-center">
                                    <button
                                        onClick={() => onChangePosition(clothing.id, position - 1)}
                                        disabled={position === 1}
                                        className="p-1.5 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </button>
                                    <span className="mx-2 font-medium">{position}</span>
                                    <button
                                        onClick={() => onChangePosition(clothing.id, position + 1)}
                                        disabled={position === items.length}
                                        className="p-1.5 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                <button
                                    onClick={() => onRemove(clothing.id)}
                                    className="p-1.5 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}