import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTextes, saveTexte } from "../lib/textes";
import EditeurRiche from "../components/EditeurRiche";

const inputClass =
  "w-full rounded-xl border border-rose-100 bg-white/90 px-4 py-3 text-stone-900 shadow-sm outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200";

const labelClass = "mb-2 block text-sm font-semibold text-stone-700";

function texteBrut(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function Textes() {
  const navigate = useNavigate();

  const [onglet, setOnglet] = useState("lire");
  const [textes, setTextes] = useState([]);
  const [chargement, setChargement] = useState(true);

  const [titre, setTitre] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [contenu, setContenu] = useState("");
  const [publication, setPublication] = useState(false);

  useEffect(() => {
    let actif = true;

    async function charger() {
      setChargement(true);
      const data = await getTextes();
      if (actif) {
        setTextes(data);
        setChargement(false);
      }
    }

    charger();

    return () => {
      actif = false;
    };
  }, [onglet]);

  async function publierTexte() {
    if (!titre.trim()) {
      alert("Ajoute un titre à ton texte.");
      return;
    }

    if (texteBrut(contenu).length < 20) {
      alert("Ton texte est trop court (20 caractères minimum).");
      return;
    }

    setPublication(true);

    const nouveauTexte = await saveTexte({
      titre: titre.trim(),
      pseudo: pseudo.trim() || "Anonyme",
      contenu,
    });

    setPublication(false);

    if (nouveauTexte) {
      navigate(`/textes/${nouveauTexte.id}`);
    } else {
      alert("La publication a échoué. Réessaie dans un instant.");
    }
  }

  const ongletClass = (actifTab) =>
    `rounded-xl px-6 py-3 font-semibold transition ${
      actifTab
        ? "bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white shadow-md"
        : "border border-stone-200 bg-white text-stone-600 hover:bg-rose-50 hover:text-rose-700"
    }`;

  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl text-stone-900">Les textes</h1>
            <p className="mt-2 text-stone-600">
              Lis les textes de la communauté ou écris le tien.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setOnglet("lire")}
              className={ongletClass(onglet === "lire")}
            >
              Lire
            </button>
            <button
              type="button"
              onClick={() => setOnglet("ecrire")}
              className={ongletClass(onglet === "ecrire")}
            >
              Écrire
            </button>
          </div>
        </div>
      </div>

      {onglet === "lire" &&
        (chargement ? (
          <div className="rounded-3xl border border-violet-200 bg-white/80 p-10 text-center text-stone-500 shadow-soft">
            Chargement des textes...
          </div>
        ) : textes.length === 0 ? (
          <div className="rounded-3xl border border-violet-200 bg-gradient-to-br from-white via-violet-50 to-rose-50 p-10 text-center text-stone-600 shadow-soft">
            Aucun texte publié pour le moment. Sois la première personne à écrire !
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {textes.map((texte) => {
              const extrait = texteBrut(texte.contenu);

              return (
                <article
                  key={texte.id}
                  onClick={() => navigate(`/textes/${texte.id}`)}
                  className="min-w-0 cursor-pointer overflow-hidden rounded-3xl border border-violet-100 bg-white/90 p-6 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-lg"
                >
                  <h2 className="break-words font-serif text-2xl text-stone-900 transition hover:text-violet-700">
                    {texte.titre}
                  </h2>

                  <p className="mt-3 text-stone-600">
                    {extrait.length > 180 ? `${extrait.slice(0, 180)}...` : extrait}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4 text-sm text-stone-500">
                    <span>Par {texte.pseudo}</span>
                    <span>
                      {new Date(texte.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        ))}

      {onglet === "ecrire" && (
        <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-soft backdrop-blur">
          <h2 className="font-serif text-2xl text-stone-900">Écrire un texte</h2>
          <p className="mt-2 text-sm text-stone-600">
            Utilise la barre d'outils pour mettre en forme : gras, italique,
            souligné, couleurs, surlignage, listes...
          </p>

          <div className="mt-6 grid gap-5">
            <div>
              <label htmlFor="titreTexte" className={labelClass}>
                Titre
              </label>
              <input
                id="titreTexte"
                type="text"
                maxLength={120}
                value={titre}
                onChange={(event) => setTitre(event.target.value)}
                className={inputClass}
                placeholder="Ex : Ma première soirée cuir"
              />
            </div>

            <div>
              <label htmlFor="pseudoTexte" className={labelClass}>
                Pseudo (optionnel)
              </label>
              <input
                id="pseudoTexte"
                type="text"
                maxLength={60}
                value={pseudo}
                onChange={(event) => setPseudo(event.target.value)}
                className={inputClass}
                placeholder="Anonyme"
              />
            </div>

            <div>
              <p className={labelClass}>Ton texte</p>
              <EditeurRiche onChange={setContenu} />
            </div>

            <button
              type="button"
              onClick={publierTexte}
              disabled={publication}
              className="rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-50"
            >
              {publication ? "Publication en cours..." : "Publier le texte"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
