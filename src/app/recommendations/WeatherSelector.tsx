import React, { useState, useEffect } from 'react';
import { getCurrentWeather, WeatherInfo } from './api';

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
    const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);

                // Demander la permission de géolocalisation lors du premier chargement
                if (locationPermission === 'prompt') {
                    try {
                        await navigator.permissions.query({ name: 'geolocation' as PermissionName })
                            .then((result) => {
                                setLocationPermission(result.state as 'granted' | 'denied' | 'prompt');

                                // Écouter les changements futurs de permission
                                result.onchange = () => {
                                    setLocationPermission(result.state as 'granted' | 'denied' | 'prompt');
                                };
                            });
                    } catch (error) {
                        console.warn("Impossible de vérifier les permissions:", error);
                    }
                }

                // Utiliser la géolocalisation réelle si la permission est accordée
                const data = await getCurrentWeather(locationPermission === 'granted');
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
    }, [onWeatherChange, useCustomWeather, initialLoadDone, locationPermission]);

    const handleRequestLocation = async () => {
        try {
            setLoading(true);
            // Réinitialiser pour forcer une nouvelle demande
            setLocationPermission('prompt');
            const data = await getCurrentWeather(true);
            setWeatherInfo(data);
            onWeatherChange(data.condition, data.temperature);
        } catch (err) {
            setError('Impossible d\'accéder à votre localisation');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCustomWeatherToggle = () => {
        setUseCustomWeather(!useCustomWeather);

        if (useCustomWeather && weatherInfo) {
            // Revenir à la météo réelle/simulée
            onWeatherChange(weatherInfo.condition, weatherInfo.temperature);
        } else {
            // Passer à la météo personnalisée
            onWeatherChange(customCondition, customTemperature);
        }
    };

    const handleCustomConditionChange = (condition: string) => {
        setCustomCondition(condition);
        onWeatherChange(condition, customTemperature);
    };

    const handleCustomTemperatureChange = (temp: number) => {
        setCustomTemperature(temp);
        onWeatherChange(customCondition, temp);
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Météo actuelle</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="py-4 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : weatherInfo && !useCustomWeather ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="text-5xl">{weatherInfo.icon}</div>
                            <div>
                                <div className="text-xl font-medium">{weatherInfo.condition.charAt(0).toUpperCase() + weatherInfo.condition.slice(1)}</div>
                                <div className="text-2xl font-bold">{weatherInfo.temperature}°C</div>
                                <div className="text-sm text-gray-500">{weatherInfo.location}</div>
                            </div>
                        </div>

                        <button
                            onClick={handleRequestLocation}
                            className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
                            disabled={loading}
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Actualiser
                        </button>
                    </div>
                ) : null}

                <div className="mt-4">
                    <div className="flex items-center justify-between mb-4">
                        <label htmlFor="customWeather" className="font-medium text-gray-700">
                            Utiliser une météo personnalisée
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                                id="customWeather"
                                type="checkbox"
                                checked={useCustomWeather}
                                onChange={handleCustomWeatherToggle}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label
                                htmlFor="customWeather"
                                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${useCustomWeather ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                            />
                        </div>
                    </div>

                    {useCustomWeather && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Condition météorologique
                                </label>
                                <select
                                    value={customCondition}
                                    onChange={(e) => handleCustomConditionChange(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="ensoleillé">Ensoleillé ☀️</option>
                                    <option value="nuageux">Nuageux ☁️</option>
                                    <option value="pluvieux">Pluvieux 🌧️</option>
                                    <option value="neigeux">Neigeux ❄️</option>
                                    <option value="venteux">Venteux 💨</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Température ({customTemperature}°C)
                                </label>
                                <input
                                    type="range"
                                    min="-10"
                                    max="40"
                                    value={customTemperature}
                                    onChange={(e) => handleCustomTemperatureChange(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>-10°C</span>
                                    <span>0°C</span>
                                    <span>10°C</span>
                                    <span>20°C</span>
                                    <span>30°C</span>
                                    <span>40°C</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #3b82f6;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #3b82f6;
        }
        .toggle-label {
          transition: background-color 0.2s ease;
        }
      `}</style>
        </div>
    );
}