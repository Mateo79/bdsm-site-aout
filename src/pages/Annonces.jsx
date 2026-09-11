import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAnnonces } from "../lib/annonces";
import AnnonceCard from "../components/AnnonceCard";
import Seo from "../components/Seo";


const PAR_PAGE = 6;

const inputClass =
  "w-full rounded-xl border border-rose-100 bg-white/90 px-4 py-3 text-stone-900 shadow-sm outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200";

const labelClass = "mb-2 block text-sm font-semibold text-stone-700";

const rolesFiltres = [
  "Tous",
  "Dominant(e) / Domina",
  "Soumis(e)",
  "Switch",
  "Maître / Maîtresse",
  "Esclave",
];

const categoriesFiltres = ["Toutes", "Rencontre", "Texte", "Conseil"];
const typesFiltres = ["Tous", "Je recherche", "Je propose"];

export default function Annonces() {
  const [annonces, setAnnonces] = useState([]);

  const [filtreRole, setFiltreRole] = useState("Tous");
  const [filtreCategorie, setFiltreCategorie] = useState("Toutes");
  const [filtreType, setFiltreType] = useState("Tous");
  const [filtreDepartement, setFiltreDepartement] = useState("");

  const [tri, setTri] = useState("recent");
  const [page, setPage] = useState(1);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    let actif = true;

    async function charger() {
      const data = await getAnnonces();
      if (actif) {
        setAnnonces(data);
        setChargement(false);
      }
    }

    charger();

    return () => {
      actif = false;
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filtreRole, filtreCategorie, filtreType, filtreDepartement, tri]);

  const annoncesFiltrees = useMemo(() => {
    const rechercheDepartement = filtreDepartement.trim().toLowerCase();

    <Seo title="Annonces rencontres BDSM – Nexus Kink" description="Consultez et filtrez les annonces de rencontres BDSM entre adultes consentants : rôles, départements, pratiques." />

    return annonces.filter((annonce) => {
      if (filtreRole !== "Tous" && annonce.role !== filtreRole) return false;
      if (filtreCategorie !== "Toutes" && annonce.categorie !== filtreCategorie)
        return false;
      if (filtreType !== "Tous" && annonce.type !== filtreType) return false;
      if (
        rechercheDepartement &&
        !String(annonce.departement || "")
          .toLowerCase()
          .includes(rechercheDepartement)
      )
        return false;
      return true;
    });
  }, [annonces, filtreRole, filtreCategorie, filtreType, filtreDepartement]);

  const annoncesTriees = useMemo(() => {
    const copie = [...annoncesFiltrees];
    if (tri === "recent") {
      copie.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      copie.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return copie;
  }, [annoncesFiltrees, tri]);

  const totalPages = Math.max(1, Math.ceil(annoncesTriees.length / PAR_PAGE));
  const pageCourante = Math.min(page, totalPages);
  const annoncesPage = annoncesTriees.slice(
    (pageCourante - 1) * PAR_PAGE,
    pageCourante * PAR_PAGE
  );

  function resetFiltres() {
    setFiltreRole("Tous");
    setFiltreCategorie("Toutes");
    setFiltreType("Tous");
    setFiltreDepartement("");
  }

  const filtresActifs =
    filtreRole !== "Tous" ||
    filtreCategorie !== "Toutes" ||
    filtreType !== "Tous" ||
    filtreDepartement.trim() !== "";

  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl text-stone-900">Les annonces</h1>
            <p className="mt-2 text-stone-600">
              Filtre les annonces pour ne voir que ce qui t'intéresse.
            </p>
          </div>

          <Link
            to="/deposer-une-annonce"
            className="rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
          >
            Déposer une annonce
          </Link>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold text-stone-700">
            Filtrer par rôle :
          </p>

          <div className="flex flex-wrap gap-2">
            {rolesFiltres.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setFiltreRole(role)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filtreRole === role
                    ? "bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white shadow-md"
                    : "border border-stone-200 bg-white text-stone-600 hover:bg-rose-50 hover:text-rose-700"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="filtreCategorie" className={labelClass}>
              Catégorie
            </label>
            <select
              id="filtreCategorie"
              value={filtreCategorie}
              onChange={(event) => setFiltreCategorie(event.target.value)}
              className={inputClass}
            >
              {categoriesFiltres.map((categorie) => (
                <option key={categorie} value={categorie}>
                  {categorie}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filtreType" className={labelClass}>
              Type
            </label>
            <select
              id="filtreType"
              value={filtreType}
              onChange={(event) => setFiltreType(event.target.value)}
              className={inputClass}
            >
              {typesFiltres.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filtreDepartement" className={labelClass}>
              Département
            </label>
            <input
              id="filtreDepartement"
              type="text"
              value={filtreDepartement}
              onChange={(event) => setFiltreDepartement(event.target.value)}
              className={inputClass}
              placeholder="Ex : 29"
            />
          </div>

          <div>
            <label htmlFor="tri" className={labelClass}>
              Trier par date
            </label>
            <select
              id="tri"
              value={tri}
              onChange={(event) => setTri(event.target.value)}
              className={inputClass}
            >
              <option value="recent">Plus récentes d'abord</option>
              <option value="ancien">Plus anciennes d'abord</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
          <p className="text-sm text-stone-500">
            {annoncesTriees.length} annonce{annoncesTriees.length > 1 ? "s" : ""}{" "}
            trouvée{annoncesTriees.length > 1 ? "s" : ""}
            {totalPages > 1 ? ` · page ${pageCourante} sur ${totalPages}` : ""}
          </p>

          {filtresActifs && (
            <button
              type="button"
              onClick={resetFiltres}
              className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-100"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      </div>

      {chargement ? (
        <div className="rounded-3xl border border-stone-200 bg-white/80 p-10 text-center text-stone-500 shadow-soft">
          Chargement des annonces...
        </div>
      ) : annonces.length === 0 ? (
        <div className="rounded-3xl border border-rose-200 bg-gradient-to-br from-white via-amber-50 to-rose-50 p-10 text-center text-stone-600 shadow-soft">
          Aucune annonce pour le moment.
        </div>
      ) : annoncesPage.length === 0 ? (
        <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-white via-amber-50 to-rose-50 p-10 text-center text-stone-600 shadow-soft">
          Aucune annonce ne correspond à tes filtres.
          <div className="mt-5">
            <button
              type="button"
              onClick={resetFiltres}
              className="rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            {annoncesPage.map((annonce) => (
              <AnnonceCard key={annonce.id} annonce={annonce} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                disabled={pageCourante === 1}
                onClick={() => setPage(pageCourante - 1)}
                className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Précédent
              </button>

              <span className="text-sm font-semibold text-stone-600">
                Page {pageCourante} / {totalPages}
              </span>

              <button
                type="button"
                disabled={pageCourante === totalPages}
                onClick={() => setPage(pageCourante + 1)}
                className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Suivant →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
