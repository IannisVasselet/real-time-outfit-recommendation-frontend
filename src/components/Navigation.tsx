"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Ma Garde-robe', path: '/wardrobe' },
    { name: 'Mes Tenues', path: '/outfits' },
    { name: 'Recommandations', path: '/recommendations'},
    { name: 'Profil', path: '/profile', disabled: true },
    { name: 'À propos', path: '/about' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2 text-xl font-semibold text-gray-800">StyleSync</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.disabled ? '#' : item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.path)
                    ? 'bg-blue-100 text-blue-600'
                    : item.disabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                onClick={(e) => {
                  if (item.disabled) e.preventDefault();
                }}
              >
                {item.name}
                {item.disabled && (
                  <span className="ml-1 text-xs bg-gray-200 px-1 rounded">Bientôt</span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.disabled ? '#' : item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.path)
                    ? 'bg-blue-100 text-blue-600'
                    : item.disabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                onClick={(e) => {
                  if (item.disabled) e.preventDefault();
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.name}
                {item.disabled && (
                  <span className="ml-1 text-xs bg-gray-200 px-1 rounded">Bientôt</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}