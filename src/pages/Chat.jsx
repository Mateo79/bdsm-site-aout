import { useEffect, useRef, useState } from "react";
import {
  changerPseudo,
  envoyerMessage,
  getMessages,
  getPseudo,
  surNouveauMessage,
} from "../lib/chat";
import {
  creerSalon,
  getSalons,
  salonExiste,
  surNouveauSalon,
} from "../lib/salons";
import Charte from "../components/Charte";
import BoutonSignalement from "../components/BoutonSignalement";
import Seo from "../components/Seo";

const inputClass =
  "w-full rounded-xl border border-violet-200 bg-white/90 px-3 py-2 text-sm text-stone-900 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200";

export default function Chat() {
  const [charteAcceptee, setCharteAcceptee] = useState(
    () => sessionStorage.getItem("charte_acceptee") === "true"
  );

  const [pseudo, setPseudo] = useState(() => getPseudo());
  const [salons, setSalons] = useState([]);
  const [salonActifId, setSalonActifId] = useState("accueil");
  const [messages, setMessages] = useState([]);
  const [texte, setTexte] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  const [formulaireOuvert, setFormulaireOuvert] = useState(false);
  const [nomSalon, setNomSalon] = useState("");
  const [descriptionSalon, setDescriptionSalon] = useState("");

  const basDePage = useRef(null);

  useEffect(() => {
    let actif = true;

    async function charger() {
      try {
        setErreur(null);
        const [salonsDonnees, messagesDonnees] = await Promise.all([
          getSalons(),
          getMessages(),
        ]);

        if (actif) {
          if (salonsDonnees.length === 0) {
            setErreur(
              "Aucun salon trouvé dans la base de données. Vérifie que le script SQL a bien été exécuté dans Supabase (table `salons` avec les 6 salons par défaut)."
            );
          } else {
            setSalons(salonsDonnees);
            setMessages(messagesDonnees);
          }
          setChargement(false);
        }
      } catch (err) {
        console.error("Erreur chargement chat :", err);
        if (actif) {
          setErreur(
            "Impossible de charger le chat. Vérifie ta connexion Supabase (URL et clé publishable dans src/lib/supabase.js)."
          );
          setChargement(false);
        }
      }
    }

    charger();

    const desinscriptionMessages = surNouveauMessage((message) => {
      setMessages((prev) =>
        prev.some((m) => m.id === message.id) ? prev : [...prev, message]
      );
    });

    const desinscriptionSalons = surNouveauSalon(() => {
      getSalons().then((donnees) => setSalons(donnees));
    });

    return () => {
      actif = false;
      desinscriptionMessages();
      desinscriptionSalons();
    };
  }, []);

  useEffect(() => {
    basDePage.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, salonActifId]);

  function accepterCharte() {
    sessionStorage.setItem("charte_acceptee", "true");
    setCharteAcceptee(true);
  }

  const salonActif = salons.find((s) => s.id === salonActifId) || salons[0];
  const messagesDuSalon = messages.filter(
    (m) => m.salon_id === salonActif?.id
  );

  async function envoyer(event) {
    event.preventDefault();
    const contenu = texte.trim();
    if (!contenu || !salonActif) return;

    setTexte("");
    const message = await envoyerMessage(salonActif.id, pseudo, contenu);
    if (message) {
      setMessages((prev) =>
        prev.some((m) => m.id === message.id) ? prev : [...prev, message]
      );
    }
  }

  async function creerNouveauSalon(event) {
    event.preventDefault();
    const nom = nomSalon.trim();

    if (!nom) {
      alert("Donne un nom à ton salon.");
      return;
    }

    if (nom.length > 40) {
      alert("Le nom du salon est trop long (40 caractères maximum).");
      return;
    }

    if (await salonExiste(nom)) {
      alert("Un salon porte déjà ce nom.");
      return;
    }

    const nouveauSalon = await creerSalon(nom, descriptionSalon);

    if (nouveauSalon) {
      setSalons(await getSalons());
      setSalonActifId(nouveauSalon.id);
      setFormulaireOuvert(false);
      setNomSalon("");
      setDescriptionSalon("");
    } else {
      alert("La création du salon a échoué. Réessaie.");
    }
  }

  if (!charteAcceptee) {
    return <Charte onAccept={accepterCharte} />;
  }

  if (chargement) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-stone-200 bg-white/80 p-10 text-center text-stone-500 shadow-soft">
        Chargement du chat...
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center shadow-soft">
        <h1 className="font-serif text-2xl text-rose-800">
          ⚠️ Le chat ne peut pas se charger
        </h1>
        <p className="mt-4 text-sm text-rose-700">{erreur}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!salonActif) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-stone-200 bg-white/80 p-10 text-center text-stone-500 shadow-soft">
        Aucun salon disponible.
      </div>
    );
  }

  <Seo title="Chat anonyme BDSM – Nexus Kink" description="Discutez anonymement dans des salons thématiques : débutants, soft, hard, fétichisme. Sans inscription, 18+." />

  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 to-rose-50 p-4 text-sm text-stone-600 shadow-soft">
        <p>
          <span className="font-semibold text-amber-700">Chat anonyme :</span>{" "}
          aucun compte nécessaire, ton pseudo est généré aléatoirement. Tous les
          salons sont publics, et tu peux créer le tien avec le bouton « + Créer
          un salon ».
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-soft backdrop-blur">
          <h2 className="px-2 font-serif text-lg text-stone-900">Les salons</h2>

          <div className="mt-3 grid grid-cols-2 gap-1 lg:grid-cols-1">
            {salons.map((salon) => (
              <button
                key={salon.id}
                type="button"
                onClick={() => setSalonActifId(salon.id)}
                className={`rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                  salonActif.id === salon.id
                    ? "bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white shadow-md"
                    : "text-stone-600 hover:bg-rose-50 hover:text-rose-700"
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="break-words">{salon.nom}</span>
                  {!salon.parDefaut && (
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        salonActif.id === salon.id
                          ? "bg-white/20 text-white"
                          : "bg-violet-100 text-violet-700"
                      }`}
                    >
                      communauté
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 px-1">
            <button
              type="button"
              onClick={() => setFormulaireOuvert((v) => !v)}
              className="w-full rounded-xl border border-dashed border-violet-300 bg-violet-50/50 px-3 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
            >
              {formulaireOuvert ? "− Fermer" : "+ Créer un salon"}
            </button>
          </div>

          {formulaireOuvert && (
            <form
              onSubmit={creerNouveauSalon}
              className="mt-3 grid gap-2 rounded-2xl border border-violet-100 bg-violet-50/60 p-3"
            >
              <input
                type="text"
                value={nomSalon}
                onChange={(event) => setNomSalon(event.target.value)}
                placeholder="Nom du salon"
                maxLength={40}
                className={inputClass}
              />

              <input
                type="text"
                value={descriptionSalon}
                onChange={(event) => setDescriptionSalon(event.target.value)}
                placeholder="Description (optionnel)"
                maxLength={120}
                className={inputClass}
              />

              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
              >
                Créer le salon
              </button>
            </form>
          )}
        </aside>

        <section className="flex h-[70vh] flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-soft backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 p-4">
            <div>
              <h1 className="font-serif text-xl text-stone-900">
                {salonActif.nom}
              </h1>
              <p className="text-xs text-stone-500">{salonActif.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                {pseudo}
              </span>
              <button
                type="button"
                onClick={() => setPseudo(changerPseudo())}
                className="text-xs font-semibold text-stone-500 underline transition hover:text-stone-700"
              >
                Changer
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messagesDuSalon.length === 0 && (
              <p className="text-center text-sm text-stone-400">
                Aucun message dans ce salon pour le moment. Lance la discussion !
              </p>
            )}

            {messagesDuSalon.map((message) => {
              const moi = message.pseudo === pseudo;
              const heure = new Date(message.date).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={message.id}
                  className={`flex ${moi ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${
                      moi
                        ? "bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white"
                        : "border border-stone-200 bg-white text-stone-800"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold ${
                        moi ? "text-white/80" : "text-violet-600"
                      }`}
                    >
                      {message.pseudo} · {heure}
                    </p>
                    <p className="mt-1 break-words text-sm">{message.texte}</p>

                    {!moi && (
                      <div className="mt-1 flex justify-end">
                        <BoutonSignalement
                          type="message"
                          contenuId={message.id}
                          titre={`Message de ${message.pseudo}`}
                          compact
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div ref={basDePage} />
          </div>

          <form
            onSubmit={envoyer}
            className="flex gap-2 border-t border-stone-100 p-4"
          >
            <input
              type="text"
              value={texte}
              onChange={(event) => setTexte(event.target.value)}
              placeholder="Écris ton message..."
              maxLength={500}
              className="flex-1 rounded-xl border border-rose-100 bg-white/90 px-4 py-3 text-stone-900 shadow-sm outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
            />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
            >
              Envoyer
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
