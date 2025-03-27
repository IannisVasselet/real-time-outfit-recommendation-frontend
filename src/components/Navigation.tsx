import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="font-bold text-xl">
          Recommandateur Mode
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>
          <Link href="/about" className="hover:underline">
            À propos
          </Link>
          <Link href="/profile" className="hover:underline">
            Profil
          </Link>
        </div>
      </div>
    </nav>
  );
}
