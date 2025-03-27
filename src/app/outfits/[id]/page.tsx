'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getOutfit, deleteOutfit } from './api';
import OutfitDetail from './OutfitDetail';

export default function OutfitDetailPage() {
    const router = useRouter();
    const params = useParams();
    const outfitId = Number(params.id);

    const [outfit, setOutfit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchOutfit = async () => {
            try {
                const data = await getOutfit(outfitId);
                setOutfit(data);
                setError(null);
            } catch (err) {
                setError('Erreur lors du chargement de la tenue');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOutfit();
    }, [outfitId]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteOutfit(outfitId);
            router.push('/outfits');
        } catch (err) {
            setError('Erreur lors de la suppression de la tenue');
            console.error(err);
            setIsDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    const openDeleteConfirm = () => {
        setShowDeleteConfirm(true);
    };

    const closeDeleteConfirm = () => {
        setShowDeleteConfirm(false);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <Link href="/outfits" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour aux tenues
            </Link>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : outfit ? (
                <OutfitDetail
                    outfit={outfit}
                    onDelete={openDeleteConfirm}
                />
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">
                        Tenue non trouvée.
                    </p>
                </div>
            )}

            {/* Modal de confirmation de suppression */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
                        <p className="mb-6">
                            Êtes-vous sûr de vouloir supprimer cette tenue ? Cette action est irréversible.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeDeleteConfirm}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                disabled={isDeleting}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                                        <span>Suppression...</span>
                                    </div>
                                ) : 'Supprimer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}