'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Clothing } from '../../wardrobe/api';
import { createOutfit, fetchWardrobe, OutfitCreate } from './api';
import OutfitForm from './OutfitForm';
import ClothingSelector from './ClothingSelector';
import OutfitPreview from './OutfitPreview';

export default function CreateOutfitPage() {
    const router = useRouter();
    const [wardrobe, setWardrobe] = useState<Clothing[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Informations de la tenue
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [style, setStyle] = useState('');
    const [season, setSeason] = useState('');
    const [occasion, setOccasion] = useState('');

    // Vêtements sélectionnés: Map de clothing_id -> position
    const [selectedItems, setSelectedItems] = useState<Map<number, number>>(new Map());

    // Chargement de la garde-robe
    useEffect(() => {
        const getWardrobe = async () => {
            try {
                const data = await fetchWardrobe();
                setWardrobe(data);
                setError(null);
            } catch (err) {
                setError('Erreur lors du chargement de la garde-robe');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getWardrobe();
    }, []);

    // Gestionnaire de changement pour les champs du formulaire
    const handleFormChange = (fieldName: string, value: string) => {
        switch (fieldName) {
            case 'name':
                setName(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'style':
                setStyle(value);
                break;
            case 'season':
                setSeason(value);
                break;
            case 'occasion':
                setOccasion(value);
                break;
        }
    };

    // Fonction pour ajouter un vêtement à la tenue
    const handleSelectClothing = (clothing: Clothing, position: number) => {
        const newItems = new Map(selectedItems);
        newItems.set(clothing.id, position);
        setSelectedItems(newItems);
    };

    // Fonction pour retirer un vêtement de la tenue
    const handleRemoveClothing = (clothingId: number) => {
        const newItems = new Map(selectedItems);
        const position = newItems.get(clothingId);
        newItems.delete(clothingId);

        // Réajuster les positions des autres vêtements
        if (position) {
            newItems.forEach((pos, id) => {
                if (pos > position) {
                    newItems.set(id, pos - 1);
                }
            });
        }

        setSelectedItems(newItems);
    };

    // Fonction pour changer la position d'un vêtement
    const handleChangePosition = (clothingId: number, newPosition: number) => {
        if (newPosition < 1 || newPosition > selectedItems.size) return;

        const oldPosition = selectedItems.get(clothingId);
        if (!oldPosition || oldPosition === newPosition) return;

        const newItems = new Map();

        // Réorganiser toutes les positions
        selectedItems.forEach((pos, id) => {
            if (id === clothingId) {
                newItems.set(id, newPosition);
            } else if (oldPosition < newPosition) {
                // Si le vêtement monte dans la liste
                if (pos > oldPosition && pos <= newPosition) {
                    newItems.set(id, pos - 1); // Décaler vers le haut
                } else {
                    newItems.set(id, pos);
                }
            } else {
                // Si le vêtement descend dans la liste
                if (pos >= newPosition && pos < oldPosition) {
                    newItems.set(id, pos + 1); // Décaler vers le bas
                } else {
                    newItems.set(id, pos);
                }
            }
        });

        setSelectedItems(newItems);
    };

    // Préparer les données de prévisualisation
    const previewItems = Array.from(selectedItems.entries()).map(([clothingId, position]) => {
        const clothing = wardrobe.find(item => item.id === clothingId);
        return {
            clothing: clothing!,
            position
        };
    });

    // Vérifier si le formulaire est valide
    const isFormValid = () => {
        return (
            name.trim() !== '' &&
            style !== '' &&
            season !== '' &&
            occasion !== '' &&
            selectedItems.size > 0
        );
    };

    // Soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid()) {
            setError('Veuillez remplir tous les champs obligatoires et sélectionner au moins un vêtement');
            return;
        }

        setSubmitting(true);
        setError(null);

        // Préparer les données de la tenue
        const outfitItems = Array.from(selectedItems.entries()).map(([clothingId, position]) => ({
            clothing_id: clothingId,
            position
        }));

        const outfitData: OutfitCreate = {
            name,
            description: description || undefined,
            style,
            season,
            occasion,
            items: outfitItems
        };

        try {
            const result = await createOutfit(outfitData);
            setSuccess(true);
            // Rediriger vers la page de détail de la tenue après un court délai
            setTimeout(() => {
                router.push(`/outfits/${result.id}`);
            }, 1500);
        } catch (err: any) {
            setError(err.message || 'Erreur lors de la création de la tenue');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <Link href="/outfits" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Retour aux tenues
                    </Link>
                    <h1 className="text-3xl font-bold mt-2">Créer une nouvelle tenue</h1>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Tenue créée avec succès! Redirection en cours...
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <OutfitForm
                        name={name}
                        description={description}
                        style={style}
                        season={season}
                        occasion={occasion}
                        onChange={handleFormChange}
                        isValid={isFormValid()}
                        itemsCount={selectedItems.size}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ClothingSelector
                            wardrobe={wardrobe}
                            selectedItems={selectedItems}
                            onSelect={handleSelectClothing}
                            onRemove={handleRemoveClothing}
                        />

                        <OutfitPreview
                            items={previewItems}
                            onChangePosition={handleChangePosition}
                            onRemove={handleRemoveClothing}
                        />
                    </div>

                    <div className="flex justify-end space-x-3 mt-8">
                        <Link
                            href="/outfits"
                            className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                        >
                            Annuler
                        </Link>
                        <button
                            type="submit"
                            disabled={submitting || !isFormValid()}
                            className={`px-6 py-2.5 rounded-md text-white transition ${submitting || !isFormValid()
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {submitting ? (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                                    <span>Création...</span>
                                </div>
                            ) : (
                                'Créer la tenue'
                            )}
                        </button>
                    </div>
                </form>
            )}
        </main>
    );
}