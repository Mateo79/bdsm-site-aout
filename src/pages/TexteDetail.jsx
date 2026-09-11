import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTexteById } from "../lib/textes";
import BoutonSignalement from "../components/BoutonSignalement";

export default function TexteDetail() {
  const { id } = useParams();

  const [texte, setTexte] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTexte(getTexteById(id));
    setLoaded(true);
  }, [id]);

  if (!loaded) return null;

  if (!texte) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-rose-200 bg-white/80 p-10 text-center shadow-soft">
        <h1 className="font-serif text-3xl text-stone-900">Texte introuvable</h1>
        <p className="mt-4 text-stone-600">Ce texte n'existe pas ou a été supprimé.</p>
        <Link
          to="/textes"
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
        >
          Retour aux textes
        </Link>
      </div>
    );
  }

  const date = new Date(texte.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/textes"
        className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm backdrop-blur transition hover:bg-white"
      >
        ← Retour aux textes
      </Link>

      <div className="mt-5 rounded-3xl border border-white/60 bg-white/85 p-8 shadow-soft backdrop-blur">
        <h1 className="break-words font-serif text-4xl text-stone-900">{texte.titre}</h1>

        <p className="mt-3 text-sm text-stone-500">
          Par {texte.pseudo} — publié le {date}
        </p>

        <div className="mt-2 flex justify-end">
          <BoutonSignalement
            type="texte"
            contenuId={texte.id}
            titre={texte.titre}
          />
        </div>

        <div
          className="contenu-texte mt-6 break-words"
          dangerouslySetInnerHTML={{ __html: texte.contenu }}
        />
      </div>
    </div>
  );
}
