import React from 'react';
import Image from 'next/image';
import { Clothing } from '../api';

interface ClothingDetailProps {
    clothing: Clothing;
    onEdit: () => void;
    onDelete: () => void;
}

export default function ClothingDetail({ clothing, onEdit, onDelete }: ClothingDetailProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
                <div className="md:w-1/2 relative h-80 md:h-auto">
                    <Image
                        src={clothing.image_url}
                        alt={clothing.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="p-6 md:w-1/2">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-2xl font-bold">{clothing.name}</h1>
                        <div className="flex space-x-2">
                            <button
                                onClick={onEdit}
                                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={onDelete}
                                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Catégorie</h3>
                            <p>{clothing.category?.name}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Couleur</h3>
                            <div className="flex items-center">
                                <div
                                    className="w-4 h-4 rounded-full mr-2"
                                    style={{ backgroundColor: clothing.color }}
                                ></div>
                                <p>{clothing.color}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Style</h3>
                            <p className="capitalize">{clothing.style}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Saison</h3>
                            <p className="capitalize">{clothing.season}</p>
                        </div>

                        {clothing.pattern && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Motif</h3>
                                <p>{clothing.pattern}</p>
                            </div>
                        )}
                    </div>

                    {clothing.description && (
                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Description</h3>
                            <p className="text-gray-700">{clothing.description}</p>
                        </div>
                    )}

                    <div className="text-xs text-gray-500">
                        <p>Ajouté le: {new Date(clothing.created_at).toLocaleDateString()}</p>
                        <p>Dernière mise à jour: {new Date(clothing.updated_at).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}