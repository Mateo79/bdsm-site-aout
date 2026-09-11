import { useMemo, useState } from "react";
import { fetichismes } from "./fetichismes";

function getLettresDisponibles(liste) {
  const set = new Set(
    liste.map((f) => {
      const c = f.nom.trim()[0].toUpperCase();
      return /[A-Z]/.test(c) ? c : "#";
    })
  );
  return ["Tous", ...Array.from(set).sort()];
}

export default function Fetichisme() {
  const [vue, setVue] = useState("liste"); // "liste" | "detail"
  const [slugSelectionne, setSlugSelectionne] = useState(null);
  const [lettreActive, setLettreActive] = useState("Tous");
  const [recherche, setRecherche] = useState("");

  const lettres = useMemo(() => getLettresDisponibles(fetichismes), []);

  const listeFiltree = useMemo(() => {
    return fetichismes.filter((f) => {
      const premiereLettre = /[A-Za-z]/.test(f.nom[0])
        ? f.nom[0].toUpperCase()
        : "#";
      const matchLettre = lettreActive === "Tous" || premiereLettre === lettreActive;
      const matchRecherche = f.nom.toLowerCase().includes(recherche.toLowerCase());
      return matchLettre && matchRecherche;
    });
  }, [lettreActive, recherche]);

  const pratiqueActive = useMemo(
    () => fetichismes.find((f) => f.slug === slugSelectionne) || null,
    [slugSelectionne]
  );

  function ouvrirDetail(slug) {
  setSlugSelectionne(slug);
  setVue("detail");
}

  function retourListe() {
    setVue("liste");
    setSlugSelectionne(null);
  }

  if (vue === "detail" && pratiqueActive) {
    return <FetichismeDetail pratique={pratiqueActive} onRetour={retourListe} />;
  }

  return (
    <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-white to-violet-50 p-6 shadow-soft">
      <h2 className="font-serif text-2xl text-stone-900">Fétichisme</h2>
      <p className="mt-2 text-sm text-stone-600">
        Explore la liste des pratiques et fétiches. Clique sur une entrée pour
        ouvrir sa fiche détaillée.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher une pratique..."
          className="w-full max-w-xs rounded-full border border-violet-200 bg-white px-4 py-2 text-sm outline-none focus:border-violet-400 sm:w-auto"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {lettres.map((lettre) => (
          <button
            key={lettre}
            onClick={() => setLettreActive(lettre)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              lettreActive === lettre
                ? "border-violet-400 bg-violet-500 text-white"
                : "border-violet-200 bg-white text-violet-700 hover:border-violet-400"
            }`}
          >
            {lettre}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {listeFiltree.map((f) => (
          <button
            key={f.slug}
            onClick={() => ouvrirDetail(f.slug)}
            className="rounded-xl border border-violet-100 bg-white/80 px-4 py-2.5 text-left text-sm font-medium text-stone-800 transition hover:border-violet-300 hover:bg-white hover:shadow-md"
          >
            {f.nom}
          </button>
        ))}
      </div>

      {listeFiltree.length === 0 && (
        <p className="mt-6 text-sm text-stone-500">Aucune pratique ne correspond à ta recherche.</p>
      )}
    </div>
  );
}

function FetichismeDetail({ pratique, onRetour }) {
  const [photo, setPhoto] = useState(null);

  function handlePhotoChange(e) {
    const fichier = e.target.files?.[0];
    if (fichier) {
      setPhoto(URL.createObjectURL(fichier));
    }
  }

  return (
    <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-white to-violet-50 p-6 shadow-soft sm:p-8">
      <button
        onClick={onRetour}
        className="text-sm font-semibold text-violet-600 hover:text-violet-800"
      >
        ← Retour à la liste
      </button>

      <h1 className="mt-4 font-serif text-3xl text-stone-900">{pratique.nom}</h1>

      {/*
        ==========================================================
        DESCRIPTION DÉTAILLÉE DE LA PRATIQUE
        Va dans le fichier fetichismes.js, trouve la ligne
        correspondant à "{pratique.nom}", et colle ton texte dans
        le champ description: "...".
        Ce texte s'affichera automatiquement ici.
        ==========================================================
      */}
      <div className="mt-6 whitespace-pre-line text-base leading-relaxed text-stone-700">
        {pratique.description ? (
          pratique.description
        ) : (
          <span className="italic text-stone-400">
            Aucune description pour le moment — ajoute-la dans fetichismes.js
            (champ "description" de "{pratique.nom}").
          </span>
        )}
      </div>

      {/* Zone photo : upload + aperçu */}
      <div className="mt-8 rounded-2xl border border-dashed border-violet-300 bg-white/70 p-6 text-center">
        {photo ? (
          <div className="flex flex-col items-center gap-3">
            <img
              src={photo}
              alt={pratique.nom}
              className="max-h-80 rounded-xl object-cover shadow-md"
            />
            <label className="cursor-pointer text-sm font-semibold text-violet-600 hover:text-violet-800">
              Changer la photo
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center gap-2 py-6 text-violet-500">
            <span className="text-3xl">+</span>
            <span className="text-sm font-semibold">Ajouter une photo pour "{pratique.nom}"</span>
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </label>
        )}
      </div>
    </div>
  );
}
