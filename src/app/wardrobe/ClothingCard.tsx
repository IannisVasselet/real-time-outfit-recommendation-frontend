import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clothing } from './api';

interface ClothingCardProps {
    clothing: Clothing;
}

export default function ClothingCard({ clothing }: ClothingCardProps) {
    return (
        <Link href={`/wardrobe/${clothing.id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="relative h-64 w-full">
                    <Image
                        src={clothing.image_url}
                        alt={clothing.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-lg">{clothing.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">{clothing.style}</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">{clothing.season}</span>
                        <span className="px-2 py-1 text-xs rounded-full"
                            style={{ backgroundColor: `${clothing.color}25` }}>
                            {clothing.color}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}