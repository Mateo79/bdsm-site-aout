import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnnonceCard({ annonce }) {
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const MAX_DESCRIPTION_LENGTH = 220;

  const date = new Date(annonce.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const description = annonce.description || "";

  const isLongDescription = description.length > MAX_DESCRIPTION_LENGTH;

  const displayedDescription =
    expanded || !isLongDescription
      ? description
      : `${description.slice(0, MAX_DESCRIPTION_LENGTH).trimEnd()}...`;

  function openAnnonce() {
    if (annonce.id) {
      navigate(`/annonces/${annonce.id}`);
    }
  }

  const categoryStyles = {
    Rencontre: "border border-rose-200 bg-rose-50 text-rose-700",
    Texte: "border border-violet-200 bg-violet-50 text-violet-700",
    Conseil: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  };

  const cardStyles = {
    Rencontre: "border-rose-100 hover:border-rose-300",
    Texte: "border-violet-100 hover:border-violet-300",
    Conseil: "border-emerald-100 hover:border-emerald-300",
  };

  const categoryClass =
    categoryStyles[annonce.categorie] ||
    "border border-stone-200 bg-stone-100 text-stone-700";

  const cardClass =
    cardStyles[annonce.categorie] || "border-stone-200 hover:border-stone-300";

  return (
    <article
      onClick={openAnnonce}
      className={`min-w-0 cursor-pointer overflow-hidden rounded-3xl border bg-white/90 p-6 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg ${cardClass}`}
    >
      {/* Badges principaux */}
      <div className="flex flex-wrap gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryClass}`}>
          {annonce.categorie}
        </span>

        <span className="rounded-full border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 text-xs font-semibold text-amber-800">
          {annonce.type}
        </span>

        {annonce.departement && (
          <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            Dép. {annonce.departement}
          </span>
        )}
      </div>

      {/* Infos Genre et Rôle */}
      <div className="mt-3 flex flex-wrap gap-2">
        {annonce.genre && (
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
            {annonce.genre}
          </span>
        )}

        {annonce.role && (
          <span className="rounded-full bg-stone-800 px-3 py-1 text-xs font-semibold text-white">
            {annonce.role}
          </span>
        )}
      </div>

      <h2 className="mt-4 break-words font-serif text-2xl text-stone-900 transition hover:text-rose-700">
        {annonce.titre}
      </h2>

      <p className="mt-3 break-words whitespace-pre-line text-stone-600">
        {displayedDescription}
      </p>

      {isLongDescription && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setExpanded(!expanded);
          }}
          className="mt-3 text-sm font-semibold text-rose-600 transition hover:text-rose-700"
        >
          {expanded ? "Voir moins" : "Voir plus"}
        </button>
      )}

      {/* Tags */}
      {annonce.tags && annonce.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {annonce.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-stone-100 px-2 py-1 text-xs text-stone-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4 text-sm text-stone-500">
        <span className="rounded-full bg-violet-50 px-3 py-1 font-medium text-violet-700">
          Âge : {annonce.age}
        </span>

        <div className="flex items-center gap-3">
          <span>Publié le {date}</span>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openAnnonce();
            }}
            className="rounded-lg bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Voir l'annonce
          </button>
        </div>
      </div>
    </article>
  );
}
