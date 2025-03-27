import React from 'react';
import { getStyles, getCommonColors } from './api';

interface StylePreferencesProps {
    selectedStyles: string[];
    selectedColors: string[];
    onStyleChange: (styles: string[]) => void;
    onColorChange: (colors: string[]) => void;
}

export default function StylePreferences({
    selectedStyles,
    selectedColors,
    onStyleChange,
    onColorChange
}: StylePreferencesProps) {
    const styles = getStyles();
    const colors = getCommonColors();

    const toggleStyle = (style: string) => {
        if (selectedStyles.includes(style)) {
            onStyleChange(selectedStyles.filter(s => s !== style));
        } else {
            onStyleChange([...selectedStyles, style]);
        }
    };

    const toggleColor = (color: string) => {
        if (selectedColors.includes(color)) {
            onColorChange(selectedColors.filter(c => c !== color));
        } else {
            onColorChange([...selectedColors, color]);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Préférences</h2>

                <div className="mb-5">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Styles préférés</h3>
                    <div className="flex flex-wrap gap-2">
                        {styles.map((style) => (
                            <button
                                key={style}
                                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedStyles.includes(style)
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                onClick={() => toggleStyle(style)}
                            >
                                {style.charAt(0).toUpperCase() + style.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Couleurs préférées</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {colors.map((color) => {
                            // Convertir les noms de couleur en codes hex approximatifs pour l'affichage
                            const colorCode = getColorCode(color);

                            return (
                                <button
                                    key={color}
                                    className={`h-10 rounded-md transition flex items-center justify-center border ${selectedColors.includes(color)
                                            ? 'border-2 border-blue-500'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    style={{ backgroundColor: colorCode }}
                                    onClick={() => toggleColor(color)}
                                >
                                    <span className={`text-xs font-medium ${textColorForBackground(colorCode)}`}>
                                        {color}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Fonctions utilitaires pour la gestion des couleurs
function getColorCode(colorName: string): string {
    const colorMap: { [key: string]: string } = {
        'noir': '#000000',
        'blanc': '#FFFFFF',
        'gris': '#808080',
        'bleu': '#0000FF',
        'marine': '#000080',
        'bleu clair': '#ADD8E6',
        'rouge': '#FF0000',
        'bordeaux': '#800000',
        'rose': '#FFC0CB',
        'vert': '#008000',
        'olive': '#808000',
        'kaki': '#F0E68C',
        'jaune': '#FFFF00',
        'beige': '#F5F5DC',
        'marron': '#A52A2A',
        'violet': '#800080',
        'lavande': '#E6E6FA',
        'orange': '#FFA500'
    };

    return colorMap[colorName.toLowerCase()] || '#CCCCCC';
}

function textColorForBackground(bgColor: string): string {
    // Convertir hex en RGB
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);

    // Calculer la luminosité (formule approximative)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Texte sombre sur fond clair, texte clair sur fond sombre
    return luminance > 0.5 ? 'text-gray-800' : 'text-white';
}