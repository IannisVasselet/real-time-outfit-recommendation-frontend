import React from 'react';
import { OutfitFilters, getOutfitStyles, getSeasons, getOccasions } from './api';

interface FilterBarProps {
    filters: OutfitFilters;
    onFilterChange: (filters: OutfitFilters) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
    const styles = getOutfitStyles();
    const seasons = getSeasons();
    const occasions = getOccasions();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        onFilterChange({
            ...filters,
            [name]: value === '' ? undefined : value,
        });
    };

    const handleReset = () => {
        onFilterChange({});
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Filtrer les tenues</h2>
                <button
                    onClick={handleReset}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                    Réinitialiser
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
                        Style
                    </label>
                    <select
                        id="style"
                        name="style"
                        value={filters.style || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-300 focus:border-blue-500 
                     focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200 
                     shadow-sm hover:border-gray-400 appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1rem',
                        }}
                    >
                        <option value="">Tous les styles</option>
                        {styles.map((style) => (
                            <option key={style} value={style}>
                                {style.charAt(0).toUpperCase() + style.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-1">
                        Saison
                    </label>
                    <select
                        id="season"
                        name="season"
                        value={filters.season || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-300 focus:border-blue-500 
                     focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200 
                     shadow-sm hover:border-gray-400 appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1rem',
                        }}
                    >
                        <option value="">Toutes les saisons</option>
                        {seasons.map((season) => (
                            <option key={season} value={season}>
                                {season.charAt(0).toUpperCase() + season.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1">
                        Occasion
                    </label>
                    <select
                        id="occasion"
                        name="occasion"
                        value={filters.occasion || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-300 focus:border-blue-500 
                     focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200 
                     shadow-sm hover:border-gray-400 appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1rem',
                        }}
                    >
                        <option value="">Toutes les occasions</option>
                        {occasions.map((occasion) => (
                            <option key={occasion} value={occasion}>
                                {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}