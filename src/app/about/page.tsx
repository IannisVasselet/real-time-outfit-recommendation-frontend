export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-6">À propos</h1>
      <div className="max-w-2xl">
        <p className="mb-4">
          Le Recommandateur de Collections de Mode est une application qui utilise l'intelligence artificielle
          pour analyser vos vêtements et vous suggérer des tenues adaptées à différentes occasions.
        </p>
        <p>
          Notre système utilise des algorithmes d'analyse d'images avancés pour extraire les caractéristiques
          visuelles de vos vêtements et créer des combinaisons harmonieuses.
        </p>
      </div>
    </main>
  );
}
