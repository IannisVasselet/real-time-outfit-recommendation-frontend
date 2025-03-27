import React, { useState, useEffect } from 'react';
import { WeatherInfo, getCurrentWeather } from './api';

interface WeatherSelectorProps {
    onWeatherChange: (weather: string, temperature: number) => void;
}

export default function WeatherSelector({ onWeatherChange }: WeatherSelectorProps) {
    const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [useCustomWeather, setUseCustomWeather] = useState(false);
    const [customCondition, setCustomCondition] = useState('ensoleillé');
    const [customTemperature, setCustomTemperature] = useState(22);
    const [initialLoadDone, setInitialLoadDone] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const data = await getCurrentWeather();
                setWeatherInfo(data);

                // Notifier le parent du changement de météo SEULEMENT après le premier chargement
                if (!useCustomWeather && !initialLoadDone) {
                    onWeatherChange(data.condition, data.temperature);
                    setInitialLoadDone(true);
                }
            } catch (err) {
                setError('Impossible de récupérer les informations météorologiques');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [onWeatherChange, useCustomWeather, initialLoadDone]);


    const handleCustomToggle = () => {
        setUseCustomWeather(!useCustomWeather);

        if (!useCustomWeather) {
            // Passer à la météo personnalisée
            onWeatherChange(customCondition, customTemperature);
        } else if (weatherInfo) {
            // Revenir à la météo actuelle
            onWeatherChange(weatherInfo.condition, weatherInfo.temperature);
        }
    };

    const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCustomCondition(e.target.value);
        onWeatherChange(e.target.value, customTemperature);
    };

    const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setCustomTemperature(value);
        onWeatherChange(customCondition, value);
    };

    const getWeatherBackground = (condition: string): string => {
        switch (condition) {
            case 'ensoleillé':
                return 'from-yellow-400 to-orange-300';
            case 'nuageux':
                return 'from-gray-300 to-gray-200';
            case 'pluvieux':
                return 'from-blue-400 to-blue-300';
            case 'neigeux':
                return 'from-blue-100 to-gray-100';
            case 'venteux':
                return 'from-gray-300 to-blue-200';
            default:
                return 'from-blue-100 to-blue-50';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Météo</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 p-3 rounded-md text-red-700 mb-4">
                        {error}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {!useCustomWeather && weatherInfo && (
                            <div className={`bg-gradient-to-r ${getWeatherBackground(weatherInfo.condition)} p-4 rounded-lg flex items-center justify-between`}>
                                <div>
                                    <div className="text-4xl mb-1">{weatherInfo.icon}</div>
                                    <div className="font-medium capitalize">{weatherInfo.condition}</div>
                                    <div className="text-sm opacity-80">{weatherInfo.location}</div>
                                </div>
                                <div className="text-3xl font-bold">{weatherInfo.temperature}°C</div>
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <label htmlFor="custom-weather" className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        id="custom-weather"
                                        type="checkbox"
                                        className="sr-only"
                                        checked={useCustomWeather}
                                        onChange={handleCustomToggle}
                                    />
                                    <div className={`block w-10 h-6 rounded-full ${useCustomWeather ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${useCustomWeather ? 'transform translate-x-4' : ''}`}></div>
                                </div>
                                <div className="ml-3 text-sm font-medium text-gray-700">
                                    Personnaliser la météo
                                </div>
                            </label>
                        </div>

                        {useCustomWeather && (
                            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                <div>
                                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                                        Condition météorologique
                                    </label>
                                    <select
                                        id="condition"
                                        value={customCondition}
                                        onChange={handleConditionChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="ensoleillé">Ensoleillé</option>
                                        <option value="nuageux">Nuageux</option>
                                        <option value="pluvieux">Pluvieux</option>
                                        <option value="neigeux">Neigeux</option>
                                        <option value="venteux">Venteux</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1">
                                        Température: {customTemperature}°C
                                    </label>
                                    <input
                                        id="temperature"
                                        type="range"
                                        min="-10"
                                        max="40"
                                        value={customTemperature}
                                        onChange={handleTemperatureChange}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>-10°C</span>
                                        <span>0°C</span>
                                        <span>20°C</span>
                                        <span>40°C</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}