export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Recommandateur de Collections de Mode</h1>
      
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Fonctionnalités</h2>
          <ul className="mt-3 list-disc list-inside">
            <li>Analyse d'images de vêtements</li>
            <li>Extraction de caractéristiques</li>
            <li>Recommandations personnalisées</li>
          </ul>
        </div>
        
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">À venir</h2>
          <ul className="mt-3 list-disc list-inside">
            <li>Upload d'images</li>
            <li>Profil utilisateur</li>
            <li>Historique des recommandations</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
