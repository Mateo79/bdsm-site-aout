import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnnonceById } from "../lib/annonces";
import BoutonSignalement from "../components/BoutonSignalement";

function buildSocialUrl(value, domain, pathPrefix = "") {
  if (!value) return null;

  const v = value.trim();

  if (/^https?:\/\//i.test(v)) {
    return v;
  }

  const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/^www\./, "");

  if (v.includes(cleanDomain)) {
    return `https://${v}`;
  }

  const username = v.replace(/^@/, "").replace(/^\/+/, "").trim();

  return `https://www.${cleanDomain}/${pathPrefix}${username}`;
}

export default function AnnonceDetail() {
  const { id } = useParams();

  const [annonce, setAnnonce] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setAnnonce(getAnnonceById(id));
    setLoaded(true);
  }, [id]);

  if (!loaded) {
    return null;
  }

  if (!annonce) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-rose-200 bg-white/80 p-10 text-center shadow-soft">
        <h1 className="font-serif text-3xl text-stone-900">
          Annonce introuvable
        </h1>

        <p className="mt-4 text-stone-600">
          Cette annonce n'existe pas ou a été supprimée.
        </p>

        <Link
          to="/annonces"
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
        >
          Retour aux annonces
        </Link>
      </div>
    );
  }

  const date = new Date(annonce.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const emailHref = annonce.email
    ? `mailto:${annonce.email}?subject=${encodeURIComponent(
        `Réponse à ton annonce : ${annonce.titre}`
      )}`
    : null;

  const instagramUrl = annonce.instagram
    ? buildSocialUrl(annonce.instagram, "instagram.com")
    : null;

  const snapchatUrl = annonce.snapchat
    ? buildSocialUrl(annonce.snapchat, "snapchat.com", "add/")
    : null;

  const facebookUrl = annonce.facebook
    ? buildSocialUrl(annonce.facebook, "facebook.com")
    : null;

  const hasContact = emailHref || instagramUrl || snapchatUrl || facebookUrl;

  const contactButtonClass =
    "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition";

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/annonces"
        className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm backdrop-blur transition hover:bg-white"
      >
        ← Retour aux annonces
      </Link>

      <div className="mt-5 rounded-3xl border border-white/60 bg-white/85 p-8 shadow-soft backdrop-blur">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
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

        <div className="mt-4 flex flex-wrap gap-2">
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

        <h1 className="mt-5 break-words font-serif text-4xl text-stone-900">
          {annonce.titre}
        </h1>

        <p className="mt-4 break-words whitespace-pre-line text-stone-700">
          {annonce.description}
        </p>

        {annonce.tags && annonce.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
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

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4 text-sm text-stone-500">
          <span className="rounded-full bg-violet-50 px-3 py-1 font-medium text-violet-700">
            Âge : {annonce.age}
          </span>
          <span>Publié le {date}</span>
        </div>

        <div className="mt-4 flex justify-end">
          <BoutonSignalement
            type="annonce"
            contenuId={annonce.id}
            titre={annonce.titre}
          />
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 p-6">
          <h2 className="font-serif text-2xl text-stone-900">
            Répondre à cette annonce
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            Choisis un moyen de contact pour répondre à la personne.
          </p>

          {hasContact ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {emailHref && (
                <a
                  href={emailHref}
                  className={`${contactButtonClass} bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white hover:opacity-95`}
                >
                  Répondre par email
                </a>
              )}

              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${contactButtonClass} bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white hover:opacity-95`}
                >
                  Instagram
                </a>
              )}

              {snapchatUrl && (
                <a
                  href={snapchatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${contactButtonClass} bg-yellow-300 text-stone-900 hover:bg-yellow-200`}
                >
                  Snapchat
                </a>
              )}

              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${contactButtonClass} bg-blue-600 text-white hover:bg-blue-500`}
                >
                  Facebook
                </a>
              )}
            </div>
          ) : (
            <p className="mt-5 rounded-xl border border-stone-200 bg-white/80 p-4 text-sm text-stone-500">
              Aucun moyen de contact n'a été fourni pour cette annonce.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
