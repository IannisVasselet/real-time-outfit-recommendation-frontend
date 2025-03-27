import React from 'react';
import { getOccasions } from './api';

interface OccasionSelectorProps {
    selectedOccasion: string;
    onChange: (occasion: string) => void;
}

export default function OccasionSelector({ selectedOccasion, onChange }: OccasionSelectorProps) {
    const occasions = getOccasions();

    const getOccasionEmoji = (occasion: string): string => {
        switch (occasion) {
            case 'quotidien':
                return '🏠';
            case 'travail':
                return '💼';
            case 'soirée':
                return '🎉';
            case 'sport':
                return '🏃';
            case 'cérémonie':
                return '🎭';
            case 'vacances':
                return '🏖️';
            default:
                return '👔';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Occasion</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {occasions.map((occasion) => (
                        <button
                            key={occasion}
                            className={`p-3 rounded-lg transition-colors flex flex-col items-center justify-center ${selectedOccasion === occasion
                                    ? 'bg-blue-100 border-2 border-blue-400 text-blue-700'
                                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                }`}
                            onClick={() => onChange(occasion)}
                        >
                            <span className="text-2xl mb-1">{getOccasionEmoji(occasion)}</span>
                            <span className="text-sm font-medium capitalize">{occasion}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}