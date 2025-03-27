import React from 'react';
import { getStyles, getSeasons, getOccasions } from './api';

interface OutfitFormProps {
    name: string;
    description: string;
    style: string;
    season: string;
    occasion: string;
    onChange: (name: string, value: string) => void;
    isValid: boolean;
    itemsCount: number;
}

export default function OutfitForm({
    name,
    description,
    style,
    season,
    occasion,
    onChange,
    isValid,
    itemsCount
}: OutfitFormProps) {
    const styles = getStyles();
    const seasons = getSeasons();
    const occasions = getOccasions();

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations sur la tenue</h2>

            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom de la tenue <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => onChange('name', e.target.value)}
                        placeholder="Ex: Tenue de bureau été"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    {name.trim() === '' && (
                        <p className="mt-1 text-sm text-red-500">Le nom de la tenue est requis</p>
                    )}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => onChange('description', e.target.value)}
                        placeholder="Décrivez cette tenue..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
                            Style <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="style"
                            value={style}
                            onChange={(e) => onChange('style', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.75rem center',
                                backgroundSize: '1rem',
                            }}
                            required
                        >
                            <option value="" disabled>Sélectionnez un style</option>
                            {styles.map((s) => (
                                <option key={s} value={s}>
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-1">
                            Saison <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="season"
                            value={season}
                            onChange={(e) => onChange('season', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.75rem center',
                                backgroundSize: '1rem',
                            }}
                            required
                        >
                            <option value="" disabled>Sélectionnez une saison</option>
                            {seasons.map((s) => (
                                <option key={s} value={s}>
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1">
                            Occasion <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="occasion"
                            value={occasion}
                            onChange={(e) => onChange('occasion', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.75rem center',
                                backgroundSize: '1rem',
                            }}
                            required
                        >
                            <option value="" disabled>Sélectionnez une occasion</option>
                            {occasions.map((o) => (
                                <option key={o} value={o}>
                                    {o.charAt(0).toUpperCase() + o.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-2">
                    <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 ${itemsCount > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <p className="text-sm text-gray-700">
                            {itemsCount > 0
                                ? `${itemsCount} vêtement${itemsCount > 1 ? 's' : ''} sélectionné${itemsCount > 1 ? 's' : ''}`
                                : 'Aucun vêtement sélectionné'}
                        </p>
                    </div>
                    {!isValid && itemsCount === 0 && (
                        <p className="mt-1 text-sm text-red-500">Vous devez sélectionner au moins un vêtement</p>
                    )}
                </div>
            </div>
        </div>
    );
}